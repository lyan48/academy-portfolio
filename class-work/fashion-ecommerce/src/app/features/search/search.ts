import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { CartProduct } from '../../core/models/cart-item.model';
import { DetailedProduct } from '../../core/models/product-details.model';
import { CartService } from '../../core/services/cart.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [Navbar, Footer, CurrencyPipe],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);

  readonly searchText = signal('');
  readonly selectedSource = signal('all');
  readonly sortOption = signal('default');

  readonly searchResults = computed(() => {
    const searchText = this.searchText();
    const selectedSource = this.selectedSource();

    let products = this.productDetailsService.searchProducts(searchText);

    if (selectedSource !== 'all') {
      products = products.filter((product) => product.source === selectedSource);
    }

    return this.sortProducts(products);
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((parameters) => {
      this.searchText.set(parameters.get('q')?.trim() ?? '');
    });
  }

  updateSearch(searchValue: string): void {
    const trimmedSearch = searchValue.trim();

    this.searchText.set(trimmedSearch);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: trimmedSearch || null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  updateSource(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.selectedSource.set(select.value);
  }

  updateSort(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.sortOption.set(select.value);
  }

  openProduct(product: DetailedProduct): void {
    this.router.navigate(['/product', product.source, product.id]);
  }

  addToCart(product: DetailedProduct, event: Event): void {
    event.stopPropagation();

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

  toggleFavorite(product: DetailedProduct, event: Event): void {
    event.stopPropagation();

    this.favoritesService.toggleFavorite({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      section: 'search',
      source: product.source,
    });
  }

  isFavorite(product: DetailedProduct): boolean {
    return this.favoritesService.isFavorite({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      section: 'search',
      source: product.source,
    });
  }

  clearSearch(): void {
    this.searchText.set('');

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  private sortProducts(products: DetailedProduct[]): DetailedProduct[] {
    const sortedProducts = [...products];

    switch (this.sortOption()) {
      case 'price-low-high':
        return sortedProducts.sort(
          (firstProduct, secondProduct) => firstProduct.price - secondProduct.price,
        );

      case 'price-high-low':
        return sortedProducts.sort(
          (firstProduct, secondProduct) => secondProduct.price - firstProduct.price,
        );

      case 'name-a-z':
        return sortedProducts.sort((firstProduct, secondProduct) =>
          firstProduct.name.localeCompare(secondProduct.name),
        );

      case 'name-z-a':
        return sortedProducts.sort((firstProduct, secondProduct) =>
          secondProduct.name.localeCompare(firstProduct.name),
        );

      default:
        return sortedProducts;
    }
  }
}
