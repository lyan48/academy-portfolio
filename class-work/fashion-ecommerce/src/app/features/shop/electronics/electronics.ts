import { Component, inject } from '@angular/core';

import { Product } from '../../../core/models/product.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Footer } from '../../../shared/components/footer/footer';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CartProduct } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';

type ElectronicsSection = 'featured' | 'new' | 'recommended';

type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a';

interface ElectronicsProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  section: ElectronicsSection;
  isFavorite: boolean;
}

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './electronics.html',
  styleUrl: './electronics.scss',
})
export class Electronics {
  private readonly favoritesService = inject(FavoritesService);

  private readonly cartService = inject(CartService);

  searchText = '';
  selectedCategory = 'All';
  sortOption: SortOption = 'default';

  subcategories: string[] = [
    'Headphones',
    'Smartphones',
    'Laptops',
    'Smartwatches',
    'Cameras',
    'Speakers',
    'Accessories',
  ];

  products: ElectronicsProduct[] = [
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      category: 'Headphones',
      price: 129.99,
      oldPrice: 159.99,
      image: '/images/electronics/product-1.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Modern Smartphone Pro',
      category: 'Smartphones',
      price: 749.99,
      image: '/images/electronics/product-2.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Slim Everyday Laptop',
      category: 'Laptops',
      price: 899.99,
      image: '/images/electronics/product-3.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Fitness Smartwatch',
      category: 'Smartwatches',
      price: 179.99,
      image: '/images/electronics/product-4.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Compact Mirrorless Camera',
      category: 'Cameras',
      price: 649.99,
      image: '/images/electronics/product-5.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Portable Bluetooth Speaker',
      category: 'Speakers',
      price: 84.99,
      image: '/images/electronics/product-6.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Premium Wireless Earbuds',
      category: 'Headphones',
      price: 99.99,
      oldPrice: 119.99,
      image: '/images/electronics/product-7.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 8,
      name: 'Fast Wireless Charger',
      category: 'Accessories',
      price: 39.99,
      image: '/images/electronics/product-8.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 9,
      name: 'Professional Laptop Pro',
      category: 'Laptops',
      price: 1199.99,
      image: '/images/electronics/product-9.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 10,
      name: 'Smart Home Speaker',
      category: 'Speakers',
      price: 119.99,
      image: '/images/electronics/product-10.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 11,
      name: 'Classic Smartwatch',
      category: 'Smartwatches',
      price: 149.99,
      image: '/images/electronics/product-11.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 12,
      name: 'Travel Technology Organizer',
      category: 'Accessories',
      price: 44.99,
      image: '/images/electronics/product-12.jpg',
      section: 'recommended',
      isFavorite: false,
    },
  ];

  constructor() {
    this.synchronizeFavoriteStates();
  }

  get featuredProducts(): ElectronicsProduct[] {
    return this.filterProducts('featured');
  }

  get newProducts(): ElectronicsProduct[] {
    return this.filterProducts('new');
  }

  get recommendedProducts(): ElectronicsProduct[] {
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

  toggleFavorite(product: ElectronicsProduct): void {
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

  addToCart(product: ElectronicsProduct): void {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      source: 'electronics',
    };

    this.cartService.addToCart(cartProduct);
  }

  private filterProducts(section: ElectronicsSection): ElectronicsProduct[] {
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

  private sortProducts(products: ElectronicsProduct[]): ElectronicsProduct[] {
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

  private createFavoriteProduct(product: ElectronicsProduct): Product {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      section: product.section,
      source: 'electronics',
    };
  }

  private synchronizeFavoriteStates(): void {
    this.products.forEach((product) => {
      product.isFavorite = this.favoritesService.isFavorite(this.createFavoriteProduct(product));
    });
  }
}
