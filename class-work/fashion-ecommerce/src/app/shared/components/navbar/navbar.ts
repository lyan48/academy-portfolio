import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

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
  @Output() searchChanged = new EventEmitter<string>();
  @Output() logoutClicked = new EventEmitter<void>();

  searchProducts(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchChanged.emit(input.value);
  }

  logout(): void {
    this.logoutClicked.emit();
  }
}