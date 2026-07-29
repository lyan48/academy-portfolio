import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../core/services/auth';
import { CartService } from '../../../core/services/cart.service';
import { GuestSessionService } from '../../../core/services/guest-session';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly guestSessionService = inject(GuestSessionService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly currentUser = this.authService.currentUser;
  readonly cartCount = this.cartService.totalQuantity;

  searchValue = '';

  @Output() searchChanged = new EventEmitter<string>();

  searchProducts(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchValue = input.value;
    this.searchChanged.emit(input.value);
  }

  submitSearch(): void {
    const normalizedSearch = this.searchValue.trim();

    this.router.navigate(['/search'], {
      queryParams: normalizedSearch
        ? {
            q: normalizedSearch,
          }
        : {},
    });
  }

  logout(): void {
    this.authService.logout();
    this.guestSessionService.endGuestSession();
    this.router.navigate(['/login']);
  }
}
