import { Routes } from '@angular/router';

import { browseGuard } from './core/guards/browse.guard';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { NotFound } from './features/errors/not-found/not-found';
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
    component: Home,
    canActivate: [browseGuard]
  },
  {
    path: 'shop',
    component: Shop,
    canActivate: [browseGuard]
  },
  {
    path: 'shop/women',
    component: Women,
    canActivate: [browseGuard]
  },
  {
    path: 'shop/men',
    component: Men,
    canActivate: [browseGuard]
  },
  {
    path: 'unauthorized',
    component: Unauthorized
  },

  // This route must always stay last.
  {
    path: '**',
    component: NotFound
  }
];