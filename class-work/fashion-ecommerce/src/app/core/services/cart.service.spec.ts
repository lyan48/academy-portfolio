import { TestBed } from '@angular/core/testing';

import { CartProduct } from '../models/cart-item.model';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const womenProduct: CartProduct = {
    id: 1,
    name: 'Classic White Shirt',
    category: 'Women',
    price: 34.99,
    image: '/images/home/product-1.jpg',
    source: 'women',
  };

  const menProductWithSameId: CartProduct = {
    id: 1,
    name: 'Classic Black Shirt',
    category: 'Men',
    price: 44.99,
    image: '/images/men/product-1.jpg',
    source: 'men',
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [CartService],
    });

    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new product with quantity 1', () => {
    service.addToCart(womenProduct);

    const cartItems = service.cartItems();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toEqual(womenProduct);
    expect(cartItems[0].quantity).toBe(1);
  });

  it('should increase the quantity when the same product is added again', () => {
    service.addToCart(womenProduct);
    service.addToCart(womenProduct);

    const cartItems = service.cartItems();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(2);
  });

  it('should keep products with the same id but different sources separate', () => {
    service.addToCart(womenProduct);
    service.addToCart(menProductWithSameId);

    const cartItems = service.cartItems();

    expect(cartItems.length).toBe(2);

    expect(cartItems[0].product.source).toBe('women');
    expect(cartItems[1].product.source).toBe('men');
  });

  it('should calculate the total quantity correctly', () => {
    service.addToCart(womenProduct);
    service.addToCart(womenProduct);
    service.addToCart(menProductWithSameId);

    expect(service.totalQuantity()).toBe(3);
  });

  it('should calculate the subtotal correctly', () => {
    service.addToCart(womenProduct);
    service.addToCart(womenProduct);
    service.addToCart(menProductWithSameId);

    const expectedSubtotal = womenProduct.price * 2 + menProductWithSameId.price;

    expect(service.subtotal()).toBeCloseTo(expectedSubtotal, 2);
  });

  it('should save cart items in localStorage', () => {
    service.addToCart(womenProduct);

    const storedCart = localStorage.getItem('trendify_cart');

    expect(storedCart).not.toBeNull();

    const parsedCart = JSON.parse(storedCart ?? '[]');

    expect(parsedCart.length).toBe(1);
    expect(parsedCart[0].product.name).toBe('Classic White Shirt');
    expect(parsedCart[0].quantity).toBe(1);
  });

  it('should increase an item quantity', () => {
    service.addToCart(womenProduct);

    const cartItem = service.cartItems()[0];

    service.increaseQuantity(cartItem);

    expect(service.cartItems()[0].quantity).toBe(2);
  });

  it('should decrease an item quantity', () => {
    service.addToCart(womenProduct);
    service.addToCart(womenProduct);

    const cartItem = service.cartItems()[0];

    service.decreaseQuantity(cartItem);

    expect(service.cartItems()[0].quantity).toBe(1);
  });

  it('should remove an item when its quantity is decreased from 1', () => {
    service.addToCart(womenProduct);

    const cartItem = service.cartItems()[0];

    service.decreaseQuantity(cartItem);

    expect(service.cartItems().length).toBe(0);
  });

  it('should remove a product from the cart', () => {
    service.addToCart(womenProduct);
    service.addToCart(menProductWithSameId);

    const womenCartItem = service.cartItems()[0];

    service.removeFromCart(womenCartItem);

    const cartItems = service.cartItems();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product.source).toBe('men');
  });

  it('should clear all cart items', () => {
    service.addToCart(womenProduct);
    service.addToCart(menProductWithSameId);

    service.clearCart();

    expect(service.cartItems().length).toBe(0);
    expect(service.totalQuantity()).toBe(0);
    expect(service.subtotal()).toBe(0);

    expect(localStorage.getItem('trendify_cart')).toBeNull();
  });
});
