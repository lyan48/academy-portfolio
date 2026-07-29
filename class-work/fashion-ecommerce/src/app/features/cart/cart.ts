import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CartItem } from '../../core/models/cart-item.model';
import { CartService } from '../../core/services/cart.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [Navbar, Footer, RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly cartItems = this.cartService.cartItems;
  readonly totalQuantity = this.cartService.totalQuantity;
  readonly subtotal = this.cartService.subtotal;

  readonly shippingCost = 0;

  get total(): number {
    return this.subtotal() + this.shippingCost;
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
