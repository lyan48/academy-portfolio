export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  section: string;
  source: 'women' | 'men' | 'jewelry' | 'electronics';
}
