import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(
  private formBuilder: FormBuilder,
  private router: Router
) {
  this.loginForm = this.formBuilder.group({
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
}

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
  this.submitted = true;

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  console.log(
    'Login information:',
    this.loginForm.value
  );

  this.router.navigate(['/home']);
 }
}