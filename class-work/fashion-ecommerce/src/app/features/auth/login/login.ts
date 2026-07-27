import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { finalize } from 'rxjs';

import {
  AuthService,
  LoginResponse
} from '../../../core/services/auth';
import { GuestSessionService } from '../../../core/services/guest-session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly guestSessionService =
    inject(GuestSessionService);

  submitted = false;
  showPassword = false;
  isLoading = false;
  loginError = '';

  readonly loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
    rememberMe: [false]
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  continueAsGuest(): void {
    this.authService.logout();
    this.guestSessionService.startGuestSession();
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    this.submitted = true;
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    const rememberMe =
      this.loginForm.controls.rememberMe.value ?? false;

    if (!email || !password) {
      return;
    }

    this.isLoading = true;

    this.authService
      .login(
        {
          email,
          password
        },
        rememberMe
      )
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: LoginResponse) => {
          console.log('Logged-in user:', response.user);

          this.guestSessionService.endGuestSession();

          const returnUrl =
            this.activatedRoute.snapshot.queryParamMap.get(
              'returnUrl'
            );

          const destination =
            returnUrl?.startsWith('/')
              ? returnUrl
              : '/home';

          this.router.navigateByUrl(destination);
        },

        error: (error: unknown) => {
          console.error('Login failed:', error);

          this.loginError =
            'The email or password is incorrect. Please try again.';
        }
      });
  }
}