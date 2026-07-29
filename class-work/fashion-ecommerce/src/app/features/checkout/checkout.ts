import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { DeliveryMethod, Order, PaymentMethod } from '../../core/models/order.model';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [Navbar, Footer, ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly ordersService = inject(OrdersService);

  readonly cartItems = this.cartService.cartItems;
  readonly subtotal = this.cartService.subtotal;

  readonly deliveryMethod = signal<DeliveryMethod>('standard');
  readonly paymentMethod = signal<PaymentMethod>('card');
  readonly orderPlaced = signal(false);
  readonly submitted = signal(false);
  readonly createdOrderId = signal('');

  readonly shippingCost = computed(() => {
    if (this.subtotal() >= 70) {
      return 0;
    }

    return this.deliveryMethod() === 'express' ? 12 : 5;
  });

  readonly total = computed(() => this.subtotal() + this.shippingCost());

  readonly checkoutForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    country: ['', Validators.required],
    postalCode: ['', Validators.required],

    cardName: [''],
    cardNumber: [''],
    expiryDate: [''],
    cvv: [''],
  });

  selectDelivery(method: DeliveryMethod): void {
    this.deliveryMethod.set(method);
  }

  selectPayment(method: PaymentMethod): void {
    this.paymentMethod.set(method);

    this.updateCardValidators(method);
  }

  placeOrder(): void {
    this.submitted.set(true);

    if (this.cartItems().length === 0) {
      return;
    }

    this.updateCardValidators(this.paymentMethod());

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formValue = this.checkoutForm.getRawValue();

    const order: Order = {
      id: this.createOrderId(),

      customer: {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        address: formValue.address,
        city: formValue.city,
        country: formValue.country,
        postalCode: formValue.postalCode,
      },

      items: this.cartItems().map((item) => ({
        product: { ...item.product },
        quantity: item.quantity,
      })),

      deliveryMethod: this.deliveryMethod(),
      paymentMethod: this.paymentMethod(),
      subtotal: this.subtotal(),
      shippingCost: this.shippingCost(),
      total: this.total(),
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };

    this.ordersService.addOrder(order);
    this.createdOrderId.set(order.id);

    this.cartService.clearCart();

    this.orderPlaced.set(true);
    this.submitted.set(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  returnToShop(): void {
    this.router.navigate(['/shop']);
  }

  private updateCardValidators(method: PaymentMethod): void {
    const cardNameControl = this.checkoutForm.controls.cardName;
    const cardNumberControl = this.checkoutForm.controls.cardNumber;
    const expiryDateControl = this.checkoutForm.controls.expiryDate;
    const cvvControl = this.checkoutForm.controls.cvv;

    if (method === 'card') {
      cardNameControl.setValidators([Validators.required, Validators.minLength(2)]);

      cardNumberControl.setValidators([Validators.required, Validators.pattern(/^[0-9]{16}$/)]);

      expiryDateControl.setValidators([
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/),
      ]);

      cvvControl.setValidators([Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]);
    } else {
      cardNameControl.clearValidators();
      cardNumberControl.clearValidators();
      expiryDateControl.clearValidators();
      cvvControl.clearValidators();
    }

    cardNameControl.updateValueAndValidity();
    cardNumberControl.updateValueAndValidity();
    expiryDateControl.updateValueAndValidity();
    cvvControl.updateValueAndValidity();
  }

  private createOrderId(): string {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return `TR-${randomNumber}`;
  }
}
