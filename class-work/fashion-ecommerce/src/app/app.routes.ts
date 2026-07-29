import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { browseGuard } from './core/guards/browse.guard';
import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { NotFound } from './features/errors/not-found/not-found';
import { Unauthorized } from './features/errors/unauthorized/unauthorized';
import { Favorites } from './features/favorites/favorites';
import { Home } from './features/home/home';
import { Orders } from './features/orders/orders';
import { ProductDetails } from './features/product-details/product-details';
import { Electronics } from './features/shop/electronics/electronics';
import { Jewelry } from './features/shop/jewelry/jewelry';
import { Men } from './features/shop/men/men';
import { Shop } from './features/shop/shop';
import { Women } from './features/shop/women/women';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Profile } from './features/profile/profile';
import { adminGuard } from './core/guards/admin.guard';
import { Admin } from './features/admin/admin';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'home',
    component: Home,
    canActivate: [browseGuard],
  },
  {
    path: 'shop',
    component: Shop,
    canActivate: [browseGuard],
  },
  {
    path: 'shop/women',
    component: Women,
    canActivate: [browseGuard],
  },
  {
    path: 'shop/men',
    component: Men,
    canActivate: [browseGuard],
  },
  {
    path: 'shop/jewelry',
    component: Jewelry,
    canActivate: [browseGuard],
  },
  {
    path: 'shop/electronics',
    component: Electronics,
    canActivate: [browseGuard],
  },
  {
    path: 'favorites',
    component: Favorites,
    canActivate: [browseGuard],
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [browseGuard],
  },
  {
    path: 'product/:source/:id',
    component: ProductDetails,
    canActivate: [browseGuard],
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: Orders,
    canActivate: [authGuard],
  },
  {
    path: 'unauthorized',
    component: Unauthorized,
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard],
  },

  // This route must always stay last.
  {
    path: '**',
    component: NotFound,
  },
];
