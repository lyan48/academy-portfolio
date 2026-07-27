import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth';
import { GuestSessionService } from '../services/guest-session';

export const browseGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const guestSessionService = inject(GuestSessionService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const isGuest = guestSessionService.isGuest();

  if (isLoggedIn || isGuest) {
    return true;
  }

  return router.createUrlTree(['/login']);
};