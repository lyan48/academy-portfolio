import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CartProduct } from '../../core/models/cart-item.model';
import { DetailedProduct, ProductSource } from '../../core/models/product-details.model';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

type ProductTab = 'description' | 'details' | 'delivery' | 'reviews';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [Navbar, Footer, RouterLink, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly productDetailsService = inject(ProductDetailsService);

  private readonly cartService = inject(CartService);

  private readonly favoritesService = inject(FavoritesService);

  readonly product = signal<DetailedProduct | undefined>(undefined);

  readonly selectedOption = signal('');
  readonly quantity = signal(1);
  readonly activeTab = signal<ProductTab>('description');

  readonly relatedProducts = computed(() => {
    const currentProduct = this.product();

    if (!currentProduct) {
      return [];
    }

    return this.productDetailsService.getRelatedProducts(currentProduct);
  });

  readonly isFavorite = computed(() => {
    const currentProduct = this.product();

    if (!currentProduct) {
      return false;
    }

    return this.favoritesService.isFavorite(this.createFavoriteProduct(currentProduct));
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((parameters) => {
      const source = parameters.get('source');
      const id = Number(parameters.get('id'));

      this.loadProduct(source, id);
    });
  }

  selectOption(option: string): void {
    this.selectedOption.set(option);
  }

  increaseQuantity(): void {
    this.quantity.update((currentQuantity) => currentQuantity + 1);
  }

  decreaseQuantity(): void {
    this.quantity.update((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  setActiveTab(tab: ProductTab): void {
    this.activeTab.set(tab);
  }

  addToCart(): void {
    const currentProduct = this.product();

    if (!currentProduct) {
      return;
    }

    const cartProduct: CartProduct = {
      id: currentProduct.id,
      name: currentProduct.name,
      category: currentProduct.category,
      price: currentProduct.price,
      image: currentProduct.image,
      source: currentProduct.source,
    };

    for (let count = 0; count < this.quantity(); count += 1) {
      this.cartService.addToCart(cartProduct);
    }
  }

  toggleFavorite(): void {
    const currentProduct = this.product();

    if (!currentProduct) {
      return;
    }

    this.favoritesService.toggleFavorite(this.createFavoriteProduct(currentProduct));
  }

  openRelatedProduct(relatedProduct: DetailedProduct): void {
    this.router.navigate(['/product', relatedProduct.source, relatedProduct.id]);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  returnToCollection(): void {
    const currentProduct = this.product();

    if (!currentProduct) {
      this.router.navigate(['/shop']);
      return;
    }

    this.router.navigate(['/shop', currentProduct.source]);
  }

  private loadProduct(source: string | null, id: number): void {
    if (!this.isValidSource(source) || !Number.isInteger(id)) {
      this.router.navigate(['/not-found']);
      return;
    }

    const foundProduct = this.productDetailsService.getProduct(source, id);

    if (!foundProduct) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.product.set(foundProduct);
    this.selectedOption.set(foundProduct.sizes[0] ?? '');
    this.quantity.set(1);
    this.activeTab.set('description');
  }

  private isValidSource(source: string | null): source is ProductSource {
    return (
      source === 'women' || source === 'men' || source === 'jewelry' || source === 'electronics'
    );
  }

  private createFavoriteProduct(product: DetailedProduct): Product {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      section: 'details',
      source: product.source,
    };
  }
}
