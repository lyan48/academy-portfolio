import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Footer } from '../../../shared/components/footer/footer';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CartProduct } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';

type MenSection = 'featured' | 'new' | 'recommended';

type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a';

interface MenProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  section: MenSection;
  isFavorite: boolean;
}

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './men.html',
  styleUrl: './men.scss',
})
export class Men {
  private readonly favoritesService = inject(FavoritesService);
  private readonly cartService = inject(CartService);

  searchText = '';
  selectedCategory = 'All';
  sortOption: SortOption = 'default';

  subcategories: string[] = [
    'Shirts',
    'T-Shirts',
    'Jackets',
    'Pants',
    'Suits',
    'Shoes',
    'Bags',
    'Accessories',
  ];

  products: MenProduct[] = [
    {
      id: 1,
      name: 'Classic White Shirt',
      category: 'Shirts',
      price: 39.99,
      image: '/images/men/product-1.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Black Essential T-Shirt',
      category: 'T-Shirts',
      price: 24.99,
      image: '/images/men/product-2.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Modern Bomber Jacket',
      category: 'Jackets',
      price: 74.99,
      oldPrice: 89.99,
      image: '/images/men/product-3.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Tailored Beige Trousers',
      category: 'Pants',
      price: 49.99,
      image: '/images/men/product-4.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Relaxed Fit Overshirt',
      category: 'Shirts',
      price: 46.99,
      image: '/images/men/product-5.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Straight Leg Jeans',
      category: 'Pants',
      price: 54.99,
      image: '/images/men/product-6.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Lightweight Denim Jacket',
      category: 'Jackets',
      price: 69.99,
      image: '/images/men/product-7.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 8,
      name: 'Minimal Everyday Sneakers',
      category: 'Shoes',
      price: 64.99,
      image: '/images/men/product-8.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 9,
      name: 'Structured Black Blazer',
      category: 'Suits',
      price: 89.99,
      image: '/images/men/product-9.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 10,
      name: 'Leather Weekend Bag',
      category: 'Bags',
      price: 78.99,
      image: '/images/men/product-10.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 11,
      name: 'Classic Leather Shoes',
      category: 'Shoes',
      price: 72.99,
      image: '/images/men/product-11.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 12,
      name: 'Minimal Steel Watch',
      category: 'Accessories',
      price: 58.99,
      image: '/images/men/product-12.jpg',
      section: 'recommended',
      isFavorite: false,
    },
  ];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private router: Router) {
    this.synchronizeFavoriteStates();
  }

  get featuredProducts(): MenProduct[] {
    return this.filterProducts('featured');
  }

  get newProducts(): MenProduct[] {
    return this.filterProducts('new');
  }

  get recommendedProducts(): MenProduct[] {
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

  toggleFavorite(product: MenProduct): void {
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

  addToCart(product: MenProduct): void {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      source: 'men',
    };

    this.cartService.addToCart(cartProduct);
  }

  openProduct(product: MenProduct): void {
    this.router.navigate(['/product', 'men', product.id]);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private filterProducts(section: MenSection): MenProduct[] {
    const filteredProducts = this.products.filter((product) => {
      const matchesSection = product.section === section;

      const matchesCategory =
        this.selectedCategory === 'All' || product.category === this.selectedCategory;

      const matchesSearch =
        !this.searchText ||
        product.name.toLowerCase().includes(this.searchText) ||
        product.category.toLowerCase().includes(this.searchText);

      return matchesSection && matchesCategory && matchesSearch;
    });

    return this.sortProducts(filteredProducts);
  }

  private sortProducts(products: MenProduct[]): MenProduct[] {
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

  private createFavoriteProduct(product: MenProduct): Product {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      section: product.section,
      source: 'men',
    };
  }

  private synchronizeFavoriteStates(): void {
    this.products.forEach((product) => {
      product.isFavorite = this.favoritesService.isFavorite(this.createFavoriteProduct(product));
    });
  }
}
