import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';

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
    path: 'shop',
    component: Shop
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];