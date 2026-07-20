import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

interface Category {
  id: number;
  name: string;
  subtitle: string;
  image: string;
}

interface Product {
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
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  searchText = '';

  categories: Category[] = [
    {
      id: 1,
      name: 'Women',
      subtitle: 'Modern everyday style',
      image: '/images/home/women.jpg'
    },
    {
      id: 2,
      name: 'Men',
      subtitle: 'Timeless essentials',
      image: '/images/home/men.jpg'
    },
    {
      id: 3,
      name: 'Jewelry',
      subtitle: 'Complete every look',
      image: '/images/home/jewelry.jpg'
    },
    {
      id: 4,
      name: 'Electronics',
      subtitle: 'Technology and lifestyle',
      image: '/images/home/electronics.jpg'
    }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Classic White Shirt',
      category: 'Women',
      price: 34.99,
      image: '/images/home/product-1.jpg',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Modern Black Jacket',
      category: 'Men',
      price: 74.99,
      oldPrice: 89.99,
      image: '/images/home/product-2.jpg',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Minimal Gold Necklace',
      category: 'Jewelry',
      price: 29.99,
      image: '/images/home/product-3.jpg',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 59.99,
      image: '/images/home/product-4.jpg',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Oversized Red T-Shirt',
      category: 'Women',
      price: 27.99,
      image: '/images/home/product-5.jpg',
      isFavorite: false
    },
    {
      id: 6,
      name: 'Casual Beige Outfit',
      category: 'Women',
      price: 48.99,
      image: '/images/home/product-6.jpg',
      isFavorite: false
    },
    {
      id: 7,
      name: 'Everyday Denim Jacket',
      category: 'Men',
      price: 64.99,
      image: '/images/home/product-7.jpg',
      isFavorite: false
    },
    {
      id: 8,
      name: 'Black Mini Bag',
      category: 'Accessories',
      price: 39.99,
      image: '/images/home/product-8.jpg',
      isFavorite: false
    }
  ];

  constructor(private router: Router) {}

  get filteredProducts(): Product[] {
    const searchValue = this.searchText
      .trim()
      .toLowerCase();

    if (!searchValue) {
      return this.products;
    }

    return this.products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.toLowerCase();

      return (
        productName.includes(searchValue) ||
        productCategory.includes(searchValue)
      );
    });
  }

  updateSearch(searchValue: string): void {
    this.searchText = searchValue;
  }

  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}