import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Unauthorized } from './features/errors/unauthorized/unauthorized';
import { Home } from './features/home/home';
import { Men } from './features/shop/men/men';
import { Shop } from './features/shop/shop';
import { Women } from './features/shop/women/women';

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
    path: 'shop/women',
    component: Women
  },
  {
    path: 'shop/men',
    component: Men
  },
  {
    path: 'unauthorized',
    component: Unauthorized
  },

  // This must always remain last.
  {
    path: '**',
    redirectTo: 'login'
  }
];