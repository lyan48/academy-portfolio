import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/models/product.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

import { CartProduct } from '../../core/models/cart-item.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  private readonly favoritesService = inject(FavoritesService);
  private readonly cartService = inject(CartService);

  readonly favoriteProducts = this.favoritesService.favoriteProducts;

  removeFavorite(product: Product): void {
    this.favoritesService.removeFavorite(product);
  }

  clearFavorites(): void {
    this.favoritesService.clearFavorites();
  }

  addToCart(product: Product): void {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      source: product.source,
    };

    this.cartService.addToCart(cartProduct);
  }
}
