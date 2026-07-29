import { Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly storageKey = 'trendify_favorites';

  private readonly favoriteProductsSignal = signal<Product[]>(this.loadFavorites());

  readonly favoriteProducts = this.favoriteProductsSignal.asReadonly();

  readonly favoriteCount = () => this.favoriteProductsSignal().length;

  addFavorite(product: Product): void {
    const currentFavorites = this.favoriteProductsSignal();

    const alreadyExists = currentFavorites.some(
      (favoriteProduct) =>
        favoriteProduct.id === product.id && favoriteProduct.source === product.source,
    );

    if (alreadyExists) {
      return;
    }

    const updatedFavorites = [...currentFavorites, product];

    this.favoriteProductsSignal.set(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  removeFavorite(product: Product): void {
    const updatedFavorites = this.favoriteProductsSignal().filter(
      (favoriteProduct) =>
        !(favoriteProduct.id === product.id && favoriteProduct.source === product.source),
    );

    this.favoriteProductsSignal.set(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  toggleFavorite(product: Product): void {
    if (this.isFavorite(product)) {
      this.removeFavorite(product);
      return;
    }

    this.addFavorite(product);
  }

  isFavorite(product: Product): boolean {
    return this.favoriteProductsSignal().some(
      (favoriteProduct) =>
        favoriteProduct.id === product.id && favoriteProduct.source === product.source,
    );
  }

  clearFavorites(): void {
    this.favoriteProductsSignal.set([]);
    localStorage.removeItem(this.storageKey);
  }

  private saveFavorites(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  private loadFavorites(): Product[] {
    const storedFavorites = localStorage.getItem(this.storageKey);

    if (!storedFavorites) {
      return [];
    }

    try {
      return JSON.parse(storedFavorites) as Product[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }
}
