export interface CartProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  source: 'home' | 'women' | 'men' | 'jewelry' | 'electronics';
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}
