import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

interface Category {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  route: string;
}

interface HomeProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly router = inject(Router);

  searchText = '';
  showSaleOnly = false;

  categories: Category[] = [
    {
      id: 1,
      name: 'Women',
      subtitle: 'Modern everyday style',
      image: '/images/home/women.jpg',
      route: '/shop/women',
    },
    {
      id: 2,
      name: 'Men',
      subtitle: 'Timeless essentials',
      image: '/images/home/men.jpg',
      route: '/shop/men',
    },
    {
      id: 3,
      name: 'Jewelry',
      subtitle: 'Complete every look',
      image: '/images/home/jewelry.jpg',
      route: '/shop/jewelry',
    },
    {
      id: 4,
      name: 'Electronics',
      subtitle: 'Technology and lifestyle',
      image: '/images/home/electronics.jpg',
      route: '/shop/electronics',
    },
  ];

  products: HomeProduct[] = [
    {
      id: 1,
      name: 'Classic White Shirt',
      category: 'Women',
      price: 34.99,
      image: '/images/home/product-1.jpg',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Modern Black Jacket',
      category: 'Men',
      price: 74.99,
      oldPrice: 89.99,
      image: '/images/home/product-2.jpg',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Minimal Gold Necklace',
      category: 'Jewelry',
      price: 29.99,
      image: '/images/home/product-3.jpg',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 59.99,
      image: '/images/home/product-4.jpg',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Oversized Red T-Shirt',
      category: 'Women',
      price: 27.99,
      oldPrice: 34.99,
      image: '/images/home/product-5.jpg',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Casual Beige Outfit',
      category: 'Women',
      price: 48.99,
      image: '/images/home/product-6.jpg',
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Everyday Denim Jacket',
      category: 'Men',
      price: 64.99,
      oldPrice: 79.99,
      image: '/images/home/product-7.jpg',
      isFavorite: false,
    },
    {
      id: 8,
      name: 'Black Mini Bag',
      category: 'Accessories',
      price: 39.99,
      image: '/images/home/product-8.jpg',
      isFavorite: false,
    },
  ];

  get filteredProducts(): HomeProduct[] {
    const searchValue = this.searchText.trim().toLowerCase();

    return this.products.filter((product) => {
      const matchesSearch =
        !searchValue ||
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue);

      const matchesSale = !this.showSaleOnly || product.oldPrice !== undefined;

      return matchesSearch && matchesSale;
    });
  }

  updateSearch(searchValue: string): void {
    this.searchText = searchValue;
  }

  openCategory(route: string): void {
    this.router.navigate([route]);
  }

  showSaleProducts(): void {
    this.showSaleOnly = true;

    const productsSection = document.getElementById('products');

    productsSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  showAllProducts(): void {
    this.showSaleOnly = false;
  }

  toggleFavorite(product: HomeProduct): void {
    product.isFavorite = !product.isFavorite;
  }

  addToCart(product: HomeProduct): void {
    console.log('Product selected for cart:', product);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
