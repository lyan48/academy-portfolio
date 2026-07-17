import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private auth = inject(Auth);
  private router = inject(Router);

  isProfileOpen = false;
  isCategoriesOpen = false;

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
    this.isCategoriesOpen = false;
  }

  toggleCategories(): void {
    this.isCategoriesOpen = !this.isCategoriesOpen;
    this.isProfileOpen = false;
  }

  logout(): void {
    this.auth.logout();
  }
}