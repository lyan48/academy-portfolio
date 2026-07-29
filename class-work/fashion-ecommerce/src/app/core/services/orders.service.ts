import { Injectable, signal } from '@angular/core';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly storageKey = 'trendify_orders';

  readonly orders = signal<Order[]>(this.loadOrders());

  addOrder(order: Order): void {
    this.orders.update((currentOrders) => [order, ...currentOrders]);

    this.saveOrders();
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orders().find((order) => order.id === orderId);
  }

  clearOrders(): void {
    this.orders.set([]);
    this.saveOrders();
  }

  private saveOrders(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.orders()));
  }

  private loadOrders(): Order[] {
    const savedOrders = localStorage.getItem(this.storageKey);

    if (!savedOrders) {
      return [];
    }

    try {
      return JSON.parse(savedOrders) as Order[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }
}
