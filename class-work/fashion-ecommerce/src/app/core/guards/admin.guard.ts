import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login'], {
      queryParams: {
        returnUrl: '/admin',
      },
    });
  }

  const currentUser = authService.currentUser();

  if (currentUser?.role === 'admin') {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
