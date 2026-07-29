import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Footer } from '../../../shared/components/footer/footer';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CartProduct } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';

type WomenSection = 'featured' | 'new' | 'recommended';

type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a';

interface WomenProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  section: WomenSection;
  isFavorite: boolean;
}

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './women.html',
  styleUrl: './women.scss',
})
export class Women {
  private readonly favoritesService = inject(FavoritesService);
  private readonly cartService = inject(CartService);

  searchText = '';
  selectedCategory = 'All';
  sortOption: SortOption = 'default';

  subcategories: string[] = [
    'Tops',
    'T-Shirts',
    'Jackets',
    'Dresses',
    'Pants',
    'Shoes',
    'Bags',
    'Accessories',
  ];

  products: WomenProduct[] = [
    {
      id: 1,
      name: 'Classic White Top',
      category: 'Tops',
      price: 34.99,
      image: '/images/women/product-1.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Oversized Red T-Shirt',
      category: 'T-Shirts',
      price: 27.99,
      image: '/images/women/product-2.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Casual Beige Jacket',
      category: 'Jackets',
      price: 59.99,
      oldPrice: 74.99,
      image: '/images/women/product-3.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Black Evening Dress',
      category: 'Dresses',
      price: 79.99,
      image: '/images/women/product-4.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Soft Knit Sweater',
      category: 'Tops',
      price: 42.99,
      image: '/images/women/product-5.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Wide Leg Trousers',
      category: 'Pants',
      price: 46.99,
      image: '/images/women/product-6.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Denim Everyday Jacket',
      category: 'Jackets',
      price: 64.99,
      image: '/images/women/product-7.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 8,
      name: 'Minimal Shoulder Bag',
      category: 'Bags',
      price: 38.99,
      image: '/images/women/product-8.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 9,
      name: 'Elegant Neutral Dress',
      category: 'Dresses',
      price: 69.99,
      image: '/images/women/product-9.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 10,
      name: 'Classic Black Heels',
      category: 'Shoes',
      price: 54.99,
      image: '/images/women/product-10.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 11,
      name: 'Gold Detail Handbag',
      category: 'Bags',
      price: 48.99,
      image: '/images/women/product-11.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 12,
      name: 'Lightweight Summer Blazer',
      category: 'Jackets',
      price: 72.99,
      image: '/images/women/product-12.jpg',
      section: 'recommended',
      isFavorite: false,
    },
  ];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private router: Router) {
    this.synchronizeFavoriteStates();
  }

  get featuredProducts(): WomenProduct[] {
    return this.filterProducts('featured');
  }

  get newProducts(): WomenProduct[] {
    return this.filterProducts('new');
  }

  get recommendedProducts(): WomenProduct[] {
    return this.filterProducts('recommended');
  }

  updateSearch(searchValue: string): void {
    this.searchText = searchValue.trim().toLowerCase();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  updateSort(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    this.sortOption = selectElement.value as SortOption;
  }

  toggleFavorite(product: WomenProduct): void {
    const favoriteProduct = this.createFavoriteProduct(product);

    this.favoritesService.toggleFavorite(favoriteProduct);

    product.isFavorite = this.favoritesService.isFavorite(favoriteProduct);
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);

    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  addToCart(product: WomenProduct): void {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      source: 'women',
    };

    this.cartService.addToCart(cartProduct);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private filterProducts(section: WomenSection): WomenProduct[] {
    const filteredProducts = this.products.filter((product) => {
      const matchesSection = product.section === section;

      const matchesSearch =
        !this.searchText ||
        product.name.toLowerCase().includes(this.searchText) ||
        product.category.toLowerCase().includes(this.searchText);

      const matchesCategory =
        this.selectedCategory === 'All' || product.category === this.selectedCategory;

      return matchesSection && matchesSearch && matchesCategory;
    });

    return this.sortProducts(filteredProducts);
  }

  private sortProducts(products: WomenProduct[]): WomenProduct[] {
    const sortedProducts = [...products];

    switch (this.sortOption) {
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

  private createFavoriteProduct(product: WomenProduct): Product {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      section: product.section,
      source: 'women',
    };
  }

  private synchronizeFavoriteStates(): void {
    this.products.forEach((product) => {
      product.isFavorite = this.favoritesService.isFavorite(this.createFavoriteProduct(product));
    });
  }
}
