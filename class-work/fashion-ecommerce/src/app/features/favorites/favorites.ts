import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/models/product.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  private readonly favoritesService = inject(FavoritesService);

  readonly favoriteProducts = this.favoritesService.favoriteProducts;

  removeFavorite(product: Product): void {
    this.favoritesService.removeFavorite(product);
  }

  clearFavorites(): void {
    this.favoritesService.clearFavorites();
  }
}
