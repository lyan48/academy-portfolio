import { Component, inject } from '@angular/core';

import { Product } from '../../../core/models/product.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Footer } from '../../../shared/components/footer/footer';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CartProduct } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';

type JewelrySection = 'featured' | 'new' | 'recommended';

type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a';

interface JewelryProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  section: JewelrySection;
  isFavorite: boolean;
}

@Component({
  selector: 'app-jewelry',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './jewelry.html',
  styleUrl: './jewelry.scss',
})
export class Jewelry {
  private readonly favoritesService = inject(FavoritesService);
  private readonly cartService = inject(CartService);

  searchText = '';
  selectedCategory = 'All';
  sortOption: SortOption = 'default';

  subcategories: string[] = [
    'Necklaces',
    'Rings',
    'Bracelets',
    'Earrings',
    'Watches',
    'Brooches',
    'Hair Accessories',
  ];

  products: JewelryProduct[] = [
    {
      id: 1,
      name: 'Minimal Gold Necklace',
      category: 'Necklaces',
      price: 39.99,
      image: '/images/jewelry/product-1.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Pearl Drop Earrings',
      category: 'Earrings',
      price: 29.99,
      image: '/images/jewelry/product-2.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Classic Silver Ring',
      category: 'Rings',
      price: 34.99,
      image: '/images/jewelry/product-3.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Elegant Chain Bracelet',
      category: 'Bracelets',
      price: 44.99,
      oldPrice: 54.99,
      image: '/images/jewelry/product-4.jpg',
      section: 'featured',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Layered Pendant Necklace',
      category: 'Necklaces',
      price: 49.99,
      image: '/images/jewelry/product-5.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Modern Hoop Earrings',
      category: 'Earrings',
      price: 27.99,
      image: '/images/jewelry/product-6.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Textured Gold Ring',
      category: 'Rings',
      price: 38.99,
      image: '/images/jewelry/product-7.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 8,
      name: 'Delicate Charm Bracelet',
      category: 'Bracelets',
      price: 41.99,
      image: '/images/jewelry/product-8.jpg',
      section: 'new',
      isFavorite: false,
    },
    {
      id: 9,
      name: 'Classic Leather Watch',
      category: 'Watches',
      price: 79.99,
      image: '/images/jewelry/product-9.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 10,
      name: 'Crystal Floral Brooch',
      category: 'Brooches',
      price: 32.99,
      image: '/images/jewelry/product-10.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 11,
      name: 'Pearl Hair Clip',
      category: 'Hair Accessories',
      price: 19.99,
      image: '/images/jewelry/product-11.jpg',
      section: 'recommended',
      isFavorite: false,
    },
    {
      id: 12,
      name: 'Rose Gold Bracelet',
      category: 'Bracelets',
      price: 46.99,
      image: '/images/jewelry/product-12.jpg',
      section: 'recommended',
      isFavorite: false,
    },
  ];

  constructor() {
    this.synchronizeFavoriteStates();
  }

  get featuredProducts(): JewelryProduct[] {
    return this.filterProducts('featured');
  }

  get newProducts(): JewelryProduct[] {
    return this.filterProducts('new');
  }

  get recommendedProducts(): JewelryProduct[] {
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

  toggleFavorite(product: JewelryProduct): void {
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

  addToCart(product: JewelryProduct): void {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      source: 'jewelry',
    };

    this.cartService.addToCart(cartProduct);
  }

  private filterProducts(section: JewelrySection): JewelryProduct[] {
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

  private sortProducts(products: JewelryProduct[]): JewelryProduct[] {
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

  private createFavoriteProduct(product: JewelryProduct): Product {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      section: product.section,
      source: 'jewelry',
    };
  }

  private synchronizeFavoriteStates(): void {
    this.products.forEach((product) => {
      product.isFavorite = this.favoritesService.isFavorite(this.createFavoriteProduct(product));
    });
  }
}
