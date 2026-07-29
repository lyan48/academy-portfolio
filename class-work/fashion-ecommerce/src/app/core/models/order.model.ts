import { CartItem } from './cart-item.model';

export type DeliveryMethod = 'standard' | 'express';

export type PaymentMethod = 'card' | 'cash';

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  id: string;
  customer: CheckoutCustomer;
  items: CartItem[];
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}
