import { Injectable } from '@angular/core';

import { DetailedProduct, ProductReview, ProductSource } from '../models/product-details.model';

interface ProductRecord {
  id: number;
  source: ProductSource;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly productRecords: ProductRecord[] = [
    // Women
    {
      id: 1,
      source: 'women',
      name: 'Classic White Top',
      category: 'Tops',
      price: 34.99,
      image: '/images/women/product-1.jpg',
    },
    {
      id: 2,
      source: 'women',
      name: 'Oversized Red T-Shirt',
      category: 'T-Shirts',
      price: 27.99,
      image: '/images/women/product-2.jpg',
    },
    {
      id: 3,
      source: 'women',
      name: 'Casual Beige Jacket',
      category: 'Jackets',
      price: 59.99,
      oldPrice: 74.99,
      image: '/images/women/product-3.jpg',
    },
    {
      id: 4,
      source: 'women',
      name: 'Black Evening Dress',
      category: 'Dresses',
      price: 79.99,
      image: '/images/women/product-4.jpg',
    },
    {
      id: 5,
      source: 'women',
      name: 'Soft Knit Sweater',
      category: 'Tops',
      price: 42.99,
      image: '/images/women/product-5.jpg',
    },
    {
      id: 6,
      source: 'women',
      name: 'Wide Leg Trousers',
      category: 'Pants',
      price: 46.99,
      image: '/images/women/product-6.jpg',
    },
    {
      id: 7,
      source: 'women',
      name: 'Denim Everyday Jacket',
      category: 'Jackets',
      price: 64.99,
      image: '/images/women/product-7.jpg',
    },
    {
      id: 8,
      source: 'women',
      name: 'Minimal Shoulder Bag',
      category: 'Bags',
      price: 38.99,
      image: '/images/women/product-8.jpg',
    },
    {
      id: 9,
      source: 'women',
      name: 'Elegant Neutral Dress',
      category: 'Dresses',
      price: 69.99,
      image: '/images/women/product-9.jpg',
    },
    {
      id: 10,
      source: 'women',
      name: 'Classic Black Heels',
      category: 'Shoes',
      price: 54.99,
      image: '/images/women/product-10.jpg',
    },
    {
      id: 11,
      source: 'women',
      name: 'Gold Detail Handbag',
      category: 'Bags',
      price: 48.99,
      image: '/images/women/product-11.jpg',
    },
    {
      id: 12,
      source: 'women',
      name: 'Lightweight Summer Blazer',
      category: 'Jackets',
      price: 72.99,
      image: '/images/women/product-12.jpg',
    },

    // Men
    {
      id: 1,
      source: 'men',
      name: 'Classic White Shirt',
      category: 'Shirts',
      price: 39.99,
      image: '/images/men/product-1.jpg',
    },
    {
      id: 2,
      source: 'men',
      name: 'Black Essential T-Shirt',
      category: 'T-Shirts',
      price: 24.99,
      image: '/images/men/product-2.jpg',
    },
    {
      id: 3,
      source: 'men',
      name: 'Modern Bomber Jacket',
      category: 'Jackets',
      price: 74.99,
      oldPrice: 89.99,
      image: '/images/men/product-3.jpg',
    },
    {
      id: 4,
      source: 'men',
      name: 'Tailored Beige Trousers',
      category: 'Pants',
      price: 49.99,
      image: '/images/men/product-4.jpg',
    },
    {
      id: 5,
      source: 'men',
      name: 'Relaxed Fit Overshirt',
      category: 'Shirts',
      price: 46.99,
      image: '/images/men/product-5.jpg',
    },
    {
      id: 6,
      source: 'men',
      name: 'Straight Leg Jeans',
      category: 'Pants',
      price: 54.99,
      image: '/images/men/product-6.jpg',
    },
    {
      id: 7,
      source: 'men',
      name: 'Lightweight Denim Jacket',
      category: 'Jackets',
      price: 69.99,
      image: '/images/men/product-7.jpg',
    },
    {
      id: 8,
      source: 'men',
      name: 'Minimal Everyday Sneakers',
      category: 'Shoes',
      price: 64.99,
      image: '/images/men/product-8.jpg',
    },
    {
      id: 9,
      source: 'men',
      name: 'Structured Black Blazer',
      category: 'Suits',
      price: 89.99,
      image: '/images/men/product-9.jpg',
    },
    {
      id: 10,
      source: 'men',
      name: 'Leather Weekend Bag',
      category: 'Bags',
      price: 78.99,
      image: '/images/men/product-10.jpg',
    },
    {
      id: 11,
      source: 'men',
      name: 'Classic Leather Shoes',
      category: 'Shoes',
      price: 72.99,
      image: '/images/men/product-11.jpg',
    },
    {
      id: 12,
      source: 'men',
      name: 'Minimal Steel Watch',
      category: 'Accessories',
      price: 58.99,
      image: '/images/men/product-12.jpg',
    },

    // Jewelry
    {
      id: 1,
      source: 'jewelry',
      name: 'Minimal Gold Necklace',
      category: 'Necklaces',
      price: 39.99,
      image: '/images/jewelry/product-1.jpg',
    },
    {
      id: 2,
      source: 'jewelry',
      name: 'Pearl Drop Earrings',
      category: 'Earrings',
      price: 29.99,
      image: '/images/jewelry/product-2.jpg',
    },
    {
      id: 3,
      source: 'jewelry',
      name: 'Classic Silver Ring',
      category: 'Rings',
      price: 34.99,
      image: '/images/jewelry/product-3.jpg',
    },
    {
      id: 4,
      source: 'jewelry',
      name: 'Elegant Chain Bracelet',
      category: 'Bracelets',
      price: 44.99,
      oldPrice: 54.99,
      image: '/images/jewelry/product-4.jpg',
    },
    {
      id: 5,
      source: 'jewelry',
      name: 'Layered Pendant Necklace',
      category: 'Necklaces',
      price: 49.99,
      image: '/images/jewelry/product-5.jpg',
    },
    {
      id: 6,
      source: 'jewelry',
      name: 'Modern Hoop Earrings',
      category: 'Earrings',
      price: 27.99,
      image: '/images/jewelry/product-6.jpg',
    },
    {
      id: 7,
      source: 'jewelry',
      name: 'Textured Gold Ring',
      category: 'Rings',
      price: 38.99,
      image: '/images/jewelry/product-7.jpg',
    },
    {
      id: 8,
      source: 'jewelry',
      name: 'Delicate Charm Bracelet',
      category: 'Bracelets',
      price: 41.99,
      image: '/images/jewelry/product-8.jpg',
    },
    {
      id: 9,
      source: 'jewelry',
      name: 'Classic Leather Watch',
      category: 'Watches',
      price: 79.99,
      image: '/images/jewelry/product-9.jpg',
    },
    {
      id: 10,
      source: 'jewelry',
      name: 'Crystal Floral Brooch',
      category: 'Brooches',
      price: 32.99,
      image: '/images/jewelry/product-10.jpg',
    },
    {
      id: 11,
      source: 'jewelry',
      name: 'Pearl Hair Clip',
      category: 'Hair Accessories',
      price: 19.99,
      image: '/images/jewelry/product-11.jpg',
    },
    {
      id: 12,
      source: 'jewelry',
      name: 'Rose Gold Bracelet',
      category: 'Bracelets',
      price: 46.99,
      image: '/images/jewelry/product-12.jpg',
    },

    // Electronics
    {
      id: 1,
      source: 'electronics',
      name: 'Wireless Noise-Cancelling Headphones',
      category: 'Headphones',
      price: 129.99,
      oldPrice: 159.99,
      image: '/images/electronics/product-1.jpg',
    },
    {
      id: 2,
      source: 'electronics',
      name: 'Modern Smartphone Pro',
      category: 'Smartphones',
      price: 749.99,
      image: '/images/electronics/product-2.jpg',
    },
    {
      id: 3,
      source: 'electronics',
      name: 'Slim Everyday Laptop',
      category: 'Laptops',
      price: 899.99,
      image: '/images/electronics/product-3.jpg',
    },
    {
      id: 4,
      source: 'electronics',
      name: 'Fitness Smartwatch',
      category: 'Smartwatches',
      price: 179.99,
      image: '/images/electronics/product-4.jpg',
    },
    {
      id: 5,
      source: 'electronics',
      name: 'Compact Mirrorless Camera',
      category: 'Cameras',
      price: 649.99,
      image: '/images/electronics/product-5.jpg',
    },
    {
      id: 6,
      source: 'electronics',
      name: 'Portable Bluetooth Speaker',
      category: 'Speakers',
      price: 84.99,
      image: '/images/electronics/product-6.jpg',
    },
    {
      id: 7,
      source: 'electronics',
      name: 'Premium Wireless Earbuds',
      category: 'Headphones',
      price: 99.99,
      oldPrice: 119.99,
      image: '/images/electronics/product-7.jpg',
    },
    {
      id: 8,
      source: 'electronics',
      name: 'Fast Wireless Charger',
      category: 'Accessories',
      price: 39.99,
      image: '/images/electronics/product-8.jpg',
    },
    {
      id: 9,
      source: 'electronics',
      name: 'Professional Laptop Pro',
      category: 'Laptops',
      price: 1199.99,
      image: '/images/electronics/product-9.jpg',
    },
    {
      id: 10,
      source: 'electronics',
      name: 'Smart Home Speaker',
      category: 'Speakers',
      price: 119.99,
      image: '/images/electronics/product-10.jpg',
    },
    {
      id: 11,
      source: 'electronics',
      name: 'Classic Smartwatch',
      category: 'Smartwatches',
      price: 149.99,
      image: '/images/electronics/product-11.jpg',
    },
    {
      id: 12,
      source: 'electronics',
      name: 'Travel Technology Organizer',
      category: 'Accessories',
      price: 44.99,
      image: '/images/electronics/product-12.jpg',
    },
  ];

  private readonly products: DetailedProduct[] = this.productRecords.map((product) =>
    this.createDetailedProduct(product),
  );

  getProduct(source: ProductSource, id: number): DetailedProduct | undefined {
    return this.products.find((product) => product.source === source && product.id === id);
  }

  getRelatedProducts(product: DetailedProduct): DetailedProduct[] {
    return this.products.filter(
      (candidate) =>
        candidate.source === product.source && product.relatedProductIds.includes(candidate.id),
    );
  }

  private createDetailedProduct(product: ProductRecord): DetailedProduct {
    const rating = this.createRating(product.id);
    const reviews = this.createReviews(product);

    return {
      ...product,
      description: this.createDescription(product),
      details: this.createDetails(product),
      sizes: this.createOptions(product),
      rating,
      reviewCount: reviews.length,
      reviews,
      relatedProductIds: this.createRelatedIds(product.id),
    };
  }

  private createDescription(product: ProductRecord): string {
    switch (product.source) {
      case 'women':
        return `${product.name} is selected for modern everyday styling. It combines a comfortable fit, versatile design and an easy-to-style finish suitable for different occasions.`;

      case 'men':
        return `${product.name} offers a clean and practical design for everyday wardrobes. It is selected for comfort, versatility and modern styling.`;

      case 'jewelry':
        return `${product.name} adds a refined detail to everyday and occasion outfits. Its polished design can be worn alone or combined with other jewelry pieces.`;

      case 'electronics':
        return `${product.name} is designed to make everyday work, travel and entertainment more convenient through reliable performance and modern functionality.`;
    }
  }

  private createDetails(product: ProductRecord): string[] {
    switch (product.source) {
      case 'women':
        return [
          'Comfortable everyday fit',
          'Easy-to-style design',
          'Selected for modern wardrobes',
          `Part of the ${product.category} collection`,
        ];

      case 'men':
        return [
          'Comfortable regular fit',
          'Practical everyday design',
          'Versatile styling',
          `Part of the ${product.category} collection`,
        ];

      case 'jewelry':
        return [
          'Lightweight design',
          'Polished finish',
          'Suitable for layering',
          `Part of the ${product.category} collection`,
        ];

      case 'electronics':
        return [
          'Modern functional design',
          'Designed for everyday use',
          'Reliable performance',
          `Part of the ${product.category} collection`,
        ];
    }
  }

  private createOptions(product: ProductRecord): string[] {
    if (product.source === 'women' || product.source === 'men') {
      if (product.category === 'Bags' || product.category === 'Accessories') {
        return ['One Size'];
      }

      if (product.category === 'Shoes') {
        return ['38', '39', '40', '41', '42', '43'];
      }

      return ['S', 'M', 'L', 'XL'];
    }

    if (product.source === 'jewelry') {
      if (product.category === 'Rings') {
        return ['S', 'M', 'L'];
      }

      return ['One Size'];
    }

    if (product.category === 'Smartphones') {
      return ['128 GB', '256 GB', '512 GB'];
    }

    if (product.category === 'Laptops') {
      return ['256 GB', '512 GB', '1 TB'];
    }

    if (product.category === 'Headphones' || product.category === 'Speakers') {
      return ['Black', 'White', 'Beige'];
    }

    return ['Standard'];
  }

  private createRating(id: number): number {
    const ratings = [4.6, 4.7, 4.8, 4.9];

    return ratings[(id - 1) % ratings.length];
  }

  private createReviews(product: ProductRecord): ProductReview[] {
    return [
      {
        id: 1,
        author: 'Maya R.',
        rating: 5,
        comment: `The ${product.name} looks exactly as expected and feels like a very good-quality product.`,
        date: 'July 18, 2026',
      },
      {
        id: 2,
        author: 'Sarah M.',
        rating: 4,
        comment:
          'The product arrived in good condition and matches the description. I would recommend it.',
        date: 'July 11, 2026',
      },
      {
        id: 3,
        author: 'Nour A.',
        rating: 5,
        comment:
          'Very happy with my purchase. The design is beautiful and it is easy to use or style.',
        date: 'June 29, 2026',
      },
    ];
  }

  private createRelatedIds(id: number): number[] {
    const ids: number[] = [];

    for (let offset = 1; ids.length < 3; offset += 1) {
      const relatedId = ((id - 1 + offset) % 12) + 1;

      if (relatedId !== id) {
        ids.push(relatedId);
      }
    }

    return ids;
  }
}
