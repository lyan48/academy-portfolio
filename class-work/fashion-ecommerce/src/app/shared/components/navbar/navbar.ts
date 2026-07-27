import {
  Component,
  EventEmitter,
  inject,
  Output
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../../core/services/auth';
import { GuestSessionService } from '../../../core/services/guest-session';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly guestSessionService =
    inject(GuestSessionService);
  private readonly router = inject(Router);

  @Output() searchChanged = new EventEmitter<string>();

  searchProducts(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchChanged.emit(input.value);
  }

  logout(): void {
    this.authService.logout();
    this.guestSessionService.endGuestSession();
    this.router.navigate(['/login']);
  }
}