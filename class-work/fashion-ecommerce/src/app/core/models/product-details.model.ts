export type ProductSource = 'women' | 'men' | 'jewelry' | 'electronics';

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DetailedProduct {
  id: number;
  source: ProductSource;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  details: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  relatedProductIds: number[];
}
