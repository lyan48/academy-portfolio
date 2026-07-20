import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

interface ShopCategory {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    Navbar,
    Footer,
    RouterLink
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop {
  categories: ShopCategory[] = [
    {
      id: 1,
      name: "Women's Wear",
      subtitle: 'Modern and timeless',
      description:
        'Discover dresses, tops, jackets and everyday essentials.',
      image: '/images/shop/women.jpg',
      route: '/shop/women'
    },
    {
      id: 2,
      name: "Men's Wear",
      subtitle: 'Everyday essentials',
      description:
        'Explore shirts, jackets, casual pieces and modern basics.',
      image: '/images/shop/men.jpg',
      route: '/shop/men'
    },
    {
      id: 3,
      name: 'Jewelry',
      subtitle: 'The finishing touch',
      description:
        'Complete every outfit with carefully selected accessories.',
      image: '/images/shop/jewelry.jpg',
      route: '/shop/jewelry'
    },
    {
      id: 4,
      name: 'Electronics',
      subtitle: 'Technology and lifestyle',
      description:
        'Shop practical and stylish electronics for everyday use.',
      image: '/images/shop/electronics.jpg',
      route: '/shop/electronics'
    }
  ];

  constructor(private router: Router) {}

  searchProducts(searchValue: string): void {
    const trimmedSearch = searchValue.trim();

    if (!trimmedSearch) {
      return;
    }

    console.log('Search value:', trimmedSearch);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}