import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];