import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';

interface WomenProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  section: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [
    Navbar,
    Footer
  ],
  templateUrl: './women.html',
  styleUrl: './women.scss'
})
export class Women {
  searchText = '';

  subcategories = [
    'Tops',
    'T-Shirts',
    'Jackets',
    'Dresses',
    'Pants',
    'Shoes',
    'Bags',
    'Accessories'
  ];

  products: WomenProduct[] = [
    {
      id: 1,
      name: 'Classic White Top',
      category: 'Tops',
      price: 34.99,
      image: '/images/women/product-1.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Oversized Red T-Shirt',
      category: 'T-Shirts',
      price: 27.99,
      image: '/images/women/product-2.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Casual Beige Jacket',
      category: 'Jackets',
      price: 59.99,
      oldPrice: 74.99,
      image: '/images/women/product-3.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Black Evening Dress',
      category: 'Dresses',
      price: 79.99,
      image: '/images/women/product-4.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Soft Knit Sweater',
      category: 'Tops',
      price: 42.99,
      image: '/images/women/product-5.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 6,
      name: 'Wide Leg Trousers',
      category: 'Pants',
      price: 46.99,
      image: '/images/women/product-6.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 7,
      name: 'Denim Everyday Jacket',
      category: 'Jackets',
      price: 64.99,
      image: '/images/women/product-7.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 8,
      name: 'Minimal Shoulder Bag',
      category: 'Bags',
      price: 38.99,
      image: '/images/women/product-8.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 9,
      name: 'Elegant Neutral Dress',
      category: 'Dresses',
      price: 69.99,
      image: '/images/women/product-9.jpg',
      section: 'recommended',
      isFavorite: false
    },
    {
      id: 10,
      name: 'Classic Black Heels',
      category: 'Shoes',
      price: 54.99,
      image: '/images/women/product-10.jpg',
      section: 'recommended',
      isFavorite: false
    },
    {
      id: 11,
      name: 'Gold Detail Handbag',
      category: 'Bags',
      price: 48.99,
      image: '/images/women/product-11.jpg',
      section: 'recommended',
      isFavorite: false
    },
    {
      id: 12,
      name: 'Lightweight Summer Blazer',
      category: 'Jackets',
      price: 72.99,
      image: '/images/women/product-12.jpg',
      section: 'recommended',
      isFavorite: false
    }
  ];

  selectedCategory = 'All';

  constructor(private router: Router) {}

  get featuredProducts(): WomenProduct[] {
    return this.filterProductsBySection('featured');
  }

  get newProducts(): WomenProduct[] {
    return this.filterProductsBySection('new');
  }

  get recommendedProducts(): WomenProduct[] {
    return this.filterProductsBySection('recommended');
  }

  updateSearch(searchValue: string): void {
    this.searchText = searchValue.trim().toLowerCase();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  toggleFavorite(product: WomenProduct): void {
    product.isFavorite = !product.isFavorite;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private filterProductsBySection(
    section: string
  ): WomenProduct[] {
    return this.products.filter((product) => {
      const matchesSection = product.section === section;

      const matchesSearch =
        !this.searchText ||
        product.name.toLowerCase().includes(this.searchText) ||
        product.category.toLowerCase().includes(this.searchText);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      return (
        matchesSection &&
        matchesSearch &&
        matchesCategory
      );
    });
  }
}