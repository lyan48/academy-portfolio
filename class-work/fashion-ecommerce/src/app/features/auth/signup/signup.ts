import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  signupForm: FormGroup;

  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],

        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],

        birthDate: [
          '',
          Validators.required
        ],

        gender: [
          '',
          Validators.required
        ],

        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9+\-\s]{8,15}$/)
          ]
        ],

        country: [
          '',
          Validators.required
        ],

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
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
            )
          ]
        ],

        confirmPassword: [
          '',
          Validators.required
        ],

        acceptTerms: [
          false,
          Validators.requiredTrue
        ]
      },
      {
        validators: this.passwordsMatch
      }
    );
  }

  get firstNameControl() {
    return this.signupForm.get('firstName');
  }

  get lastNameControl() {
    return this.signupForm.get('lastName');
  }

  get birthDateControl() {
    return this.signupForm.get('birthDate');
  }

  get genderControl() {
    return this.signupForm.get('gender');
  }

  get phoneNumberControl() {
    return this.signupForm.get('phoneNumber');
  }

  get countryControl() {
    return this.signupForm.get('country');
  }

  get emailControl() {
    return this.signupForm.get('email');
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }

  get acceptTermsControl() {
    return this.signupForm.get('acceptTerms');
  }

  passwordsMatch(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordsDoNotMatch: true };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log(
      'Account information:',
      this.signupForm.value
    );
  }
}