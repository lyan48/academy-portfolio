import { computed, Injectable, signal } from '@angular/core';

import { CartItem, CartProduct } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'trendify_cart';

  private readonly cartItemsSignal = signal<CartItem[]>(this.loadCart());

  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly totalQuantity = computed(() =>
    this.cartItemsSignal().reduce((total, item) => total + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.cartItemsSignal().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  addToCart(product: CartProduct): void {
    const currentItems = this.cartItemsSignal();

    const existingItem = currentItems.find(
      (item) => item.product.id === product.id && item.product.source === product.source,
    );

    if (existingItem) {
      const updatedItems = currentItems.map((item) => {
        const isSameProduct =
          item.product.id === product.id && item.product.source === product.source;

        if (!isSameProduct) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });

      this.updateCart(updatedItems);
      return;
    }

    const newItem: CartItem = {
      product,
      quantity: 1,
    };

    this.updateCart([...currentItems, newItem]);
  }

  increaseQuantity(item: CartItem): void {
    const updatedItems = this.cartItemsSignal().map((cartItem) => {
      const isSameProduct =
        cartItem.product.id === item.product.id && cartItem.product.source === item.product.source;

      if (!isSameProduct) {
        return cartItem;
      }

      return {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      };
    });

    this.updateCart(updatedItems);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity <= 1) {
      this.removeFromCart(item);
      return;
    }

    const updatedItems = this.cartItemsSignal().map((cartItem) => {
      const isSameProduct =
        cartItem.product.id === item.product.id && cartItem.product.source === item.product.source;

      if (!isSameProduct) {
        return cartItem;
      }

      return {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };
    });

    this.updateCart(updatedItems);
  }

  removeFromCart(item: CartItem): void {
    const updatedItems = this.cartItemsSignal().filter(
      (cartItem) =>
        !(
          cartItem.product.id === item.product.id && cartItem.product.source === item.product.source
        ),
    );

    this.updateCart(updatedItems);
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
    localStorage.removeItem(this.storageKey);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSignal.set(items);

    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadCart(): CartItem[] {
    const storedCart = localStorage.getItem(this.storageKey);

    if (!storedCart) {
      return [];
    }

    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }
}
