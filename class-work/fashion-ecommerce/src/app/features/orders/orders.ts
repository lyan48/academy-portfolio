import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Order } from '../../core/models/order.model';
import { OrdersService } from '../../core/services/orders.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [Navbar, Footer, RouterLink, CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  private readonly ordersService = inject(OrdersService);

  readonly selectedOrderId = signal<string | null>(null);

  readonly orders = computed(() => this.ordersService.orders());

  readonly selectedOrder = computed(() => {
    const orderId = this.selectedOrderId();

    if (!orderId) {
      return undefined;
    }

    return this.ordersService.getOrderById(orderId);
  });

  toggleOrderDetails(orderId: string): void {
    if (this.selectedOrderId() === orderId) {
      this.selectedOrderId.set(null);
      return;
    }

    this.selectedOrderId.set(orderId);
  }

  isSelected(order: Order): boolean {
    return this.selectedOrderId() === order.id;
  }

  getStatusClass(status: Order['status']): string {
    return status.toLowerCase();
  }

  getDeliveryLabel(order: Order): string {
    return order.deliveryMethod === 'express' ? 'Express delivery' : 'Standard delivery';
  }

  getPaymentLabel(order: Order): string {
    return order.paymentMethod === 'cash' ? 'Cash on delivery' : 'Credit or debit card';
  }
}
