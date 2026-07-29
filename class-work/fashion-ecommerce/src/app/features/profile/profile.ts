import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService, AuthUser } from '../../core/services/auth';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Navbar, Footer, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly isEditing = signal(false);
  readonly savedSuccessfully = signal(false);

  readonly user = computed(() => this.authService.currentUser());

  readonly initials = computed(() => {
    const currentUser = this.user();

    if (!currentUser) {
      return 'U';
    }

    const firstInitial = currentUser.firstName?.charAt(0) ?? '';

    const lastInitial = currentUser.lastName?.charAt(0) ?? '';

    return (
      `${firstInitial}${lastInitial}`.toUpperCase() || currentUser.email.charAt(0).toUpperCase()
    );
  });

  readonly profileForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],

    lastName: ['', [Validators.required, Validators.minLength(2)]],

    email: ['', [Validators.required, Validators.email]],

    username: [''],

    dateOfBirth: [''],

    phoneNumber: ['', Validators.pattern(/^[0-9+\-\s]{8,15}$/)],

    gender: [''],

    country: [''],
  });

  constructor() {
    this.fillForm();
  }

  startEditing(): void {
    this.savedSuccessfully.set(false);
    this.fillForm();
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.fillForm();
    this.savedSuccessfully.set(false);
    this.isEditing.set(false);
  }

  saveChanges(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const currentUser = this.user();

    if (!currentUser) {
      return;
    }

    const formValue = this.profileForm.getRawValue();

    const updatedUser: AuthUser = {
      ...currentUser,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      username: formValue.username,
      dateOfBirth: formValue.dateOfBirth,
      phoneNumber: formValue.phoneNumber,
      gender: formValue.gender,
      country: formValue.country,
    };

    this.authService.updateStoredUser(updatedUser);

    this.savedSuccessfully.set(true);
    this.isEditing.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private fillForm(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      return;
    }

    this.profileForm.setValue({
      firstName: currentUser.firstName ?? '',
      lastName: currentUser.lastName ?? '',
      email: currentUser.email,
      username: currentUser.username ?? '',
      dateOfBirth: currentUser.dateOfBirth ?? '',
      phoneNumber: currentUser.phoneNumber ?? '',
      gender: currentUser.gender ?? '',
      country: currentUser.country ?? '',
    });
  }
}
