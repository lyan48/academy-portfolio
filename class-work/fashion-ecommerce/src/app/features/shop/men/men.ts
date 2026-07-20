import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';

interface MenProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  section: 'featured' | 'new' | 'recommended';
  isFavorite: boolean;
}

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [
    Navbar,
    Footer
  ],
  templateUrl: './men.html',
  styleUrl: './men.scss'
})
export class Men {
  searchText = '';
  selectedCategory = 'All';

  subcategories: string[] = [
    'Shirts',
    'T-Shirts',
    'Jackets',
    'Pants',
    'Suits',
    'Shoes',
    'Bags',
    'Accessories'
  ];

  products: MenProduct[] = [
    {
      id: 1,
      name: 'Classic White Shirt',
      category: 'Shirts',
      price: 39.99,
      image: '/images/men/product-1.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Black Essential T-Shirt',
      category: 'T-Shirts',
      price: 24.99,
      image: '/images/men/product-2.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Modern Bomber Jacket',
      category: 'Jackets',
      price: 74.99,
      oldPrice: 89.99,
      image: '/images/men/product-3.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Tailored Beige Trousers',
      category: 'Pants',
      price: 49.99,
      image: '/images/men/product-4.jpg',
      section: 'featured',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Relaxed Fit Overshirt',
      category: 'Shirts',
      price: 46.99,
      image: '/images/men/product-5.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 6,
      name: 'Straight Leg Jeans',
      category: 'Pants',
      price: 54.99,
      image: '/images/men/product-6.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 7,
      name: 'Lightweight Denim Jacket',
      category: 'Jackets',
      price: 69.99,
      image: '/images/men/product-7.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 8,
      name: 'Minimal Everyday Sneakers',
      category: 'Shoes',
      price: 64.99,
      image: '/images/men/product-8.jpg',
      section: 'new',
      isFavorite: false
    },
    {
      id: 9,
      name: 'Structured Black Blazer',
      category: 'Suits',
      price: 89.99,
      image: '/images/men/product-9.jpg',
      section: 'recommended',
      isFavorite: false
    },
    {
      id: 10,
      name: 'Leather Weekend Bag',
      category: 'Bags',
      price: 78.99,
      image: '/images/men/product-10.jpg',
      section: 'recommended',
      isFavorite: false
    },
    {
      id: 11,
      name: 'Classic Leather Shoes',
      category: 'Shoes',
      price: 72.99,
      image: '/images/men/product-11.jpg',
      section: 'recommended',
      isFavorite: false
    },
    {
      id: 12,
      name: 'Minimal Steel Watch',
      category: 'Accessories',
      price: 58.99,
      image: '/images/men/product-12.jpg',
      section: 'recommended',
      isFavorite: false
    }
  ];

  constructor(private router: Router) {}

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

  toggleFavorite(product: MenProduct): void {
    product.isFavorite = !product.isFavorite;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private filterProducts(
    section: MenProduct['section']
  ): MenProduct[] {
    return this.products.filter((product) => {
      const matchesSection = product.section === section;

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      const matchesSearch =
        !this.searchText ||
        product.name.toLowerCase().includes(this.searchText) ||
        product.category.toLowerCase().includes(this.searchText);

      return (
        matchesSection &&
        matchesCategory &&
        matchesSearch
      );
    });
  }
}