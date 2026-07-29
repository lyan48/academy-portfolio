import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  CellClickedEvent,
  CellValueChangedEvent,
  ColDef,
  ModuleRegistry,
  themeQuartz,
  ValueFormatterParams,
} from 'ag-grid-community';

import { Order } from '../../core/models/order.model';
import { AuthService, AuthUser } from '../../core/services/auth';
import { OrdersService } from '../../core/services/orders.service';

ModuleRegistry.registerModules([AllCommunityModule]);

type AdminSection = 'dashboard' | 'products' | 'users' | 'orders' | 'activity';

type ProductStatus = 'Active' | 'Low stock' | 'Out of stock';

interface AdminProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: ProductStatus;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  joinedAt: string;
}

interface AdminOrderRow {
  id: string;
  customer: string;
  email: string;
  createdAt: string;
  items: number;
  total: number;
  status: Order['status'];
}

interface RecentActivity {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
}

interface ChartPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AgGridAngular, CurrencyPipe, DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly activeSection = signal<AdminSection>('dashboard');

  readonly searchText = signal('');

  readonly selectedProductCategory = signal('All');

  readonly selectedOrderStatus = signal('All');

  readonly currentUser = computed<AuthUser | null>(() => this.authService.currentUser());

  readonly orders = computed(() => this.ordersService.orders());

  readonly adminGridTheme = themeQuartz.withParams({
    accentColor: '#735f4e',
    backgroundColor: '#ffffff',
    borderColor: '#e4dfda',
    browserColorScheme: 'light',
    columnBorder: false,
    fontFamily: 'Arial, sans-serif',
    foregroundColor: '#262321',
    headerBackgroundColor: '#f5f1ed',
    headerFontSize: 12,
    headerFontWeight: 700,
    headerTextColor: '#594739',
    oddRowBackgroundColor: '#fbfaf8',
    rowBorder: true,
    rowHoverColor: '#f3eee9',
    spacing: 8,
    wrapperBorderRadius: 8,
  });

  readonly defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 110,
  };

  readonly products = signal<AdminProduct[]>([
    {
      id: 1,
      name: 'Classic White Top',
      category: 'Women',
      price: 34.99,
      stock: 28,
      image: '/images/women/product-1.jpg',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Modern Bomber Jacket',
      category: 'Men',
      price: 74.99,
      stock: 12,
      image: '/images/men/product-3.jpg',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Minimal Gold Necklace',
      category: 'Jewelry',
      price: 39.99,
      stock: 7,
      image: '/images/jewelry/product-1.jpg',
      status: 'Low stock',
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 129.99,
      stock: 18,
      image: '/images/electronics/product-1.jpg',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Classic Black Heels',
      category: 'Women',
      price: 54.99,
      stock: 0,
      image: '/images/women/product-10.jpg',
      status: 'Out of stock',
    },
    {
      id: 6,
      name: 'Classic Leather Shoes',
      category: 'Men',
      price: 72.99,
      stock: 9,
      image: '/images/men/product-11.jpg',
      status: 'Low stock',
    },
  ]);

  readonly users = signal<AdminUser[]>([
    {
      id: 1,
      name: 'Trendify Admin',
      email: 'admin@trendify.com',
      role: 'admin',
      joinedAt: '2026-06-01',
    },
    {
      id: 2,
      name: 'Sarah M.',
      email: 'sarah@example.com',
      role: 'user',
      joinedAt: '2026-06-14',
    },
    {
      id: 3,
      name: 'Maya R.',
      email: 'maya@example.com',
      role: 'user',
      joinedAt: '2026-06-21',
    },
    {
      id: 4,
      name: 'Jad K.',
      email: 'jad@example.com',
      role: 'user',
      joinedAt: '2026-07-02',
    },
    {
      id: 5,
      name: 'Nour A.',
      email: 'nour@example.com',
      role: 'user',
      joinedAt: '2026-07-15',
    },
  ]);

  readonly activities: RecentActivity[] = [
    {
      id: 1,
      icon: '🛒',
      title: 'New order placed',
      description: 'A customer completed a new checkout.',
      time: '10 min ago',
    },
    {
      id: 2,
      icon: '✓',
      title: 'Product updated',
      description: 'A product stock value was updated.',
      time: '25 min ago',
    },
    {
      id: 3,
      icon: '👤',
      title: 'New user registered',
      description: 'A new customer account was created.',
      time: '1 hour ago',
    },
    {
      id: 4,
      icon: '📦',
      title: 'Order status changed',
      description: 'An order was moved to Shipped.',
      time: '2 hours ago',
    },
    {
      id: 5,
      icon: '+',
      title: 'New product added',
      description: 'A product was added to the catalog.',
      time: '3 hours ago',
    },
  ];

  readonly chartData: ChartPoint[] = [
    { label: 'Jul 1', value: 420 },
    { label: 'Jul 5', value: 680 },
    { label: 'Jul 9', value: 510 },
    { label: 'Jul 13', value: 940 },
    { label: 'Jul 17', value: 620 },
    { label: 'Jul 21', value: 1050 },
    { label: 'Jul 25', value: 760 },
    { label: 'Jul 30', value: 1240 },
  ];

  readonly productColumnDefs: ColDef<AdminProduct>[] = [
    {
      field: 'id',
      headerName: 'ID',
      maxWidth: 90,
    },
    {
      field: 'name',
      headerName: 'Product',
      minWidth: 210,
    },
    {
      field: 'category',
      headerName: 'Category',
    },
    {
      field: 'price',
      headerName: 'Price',
      valueFormatter: (parameters: ValueFormatterParams<AdminProduct, number>) =>
        this.formatCurrency(parameters.value),
    },
    {
      field: 'stock',
      headerName: 'Stock',
      editable: true,
      cellDataType: 'number',
      maxWidth: 110,
    },
    {
      field: 'status',
      headerName: 'Status',
      cellClassRules: {
        'grid-status-active': (parameters) => parameters.value === 'Active',

        'grid-status-warning': (parameters) => parameters.value === 'Low stock',

        'grid-status-danger': (parameters) => parameters.value === 'Out of stock',
      },
    },
    {
      headerName: 'Actions',
      colId: 'productActions',
      sortable: false,
      filter: false,
      maxWidth: 120,
      cellRenderer: () => '<button class="grid-delete-button">Delete</button>',
    },
  ];

  readonly userColumnDefs: ColDef<AdminUser>[] = [
    {
      field: 'id',
      headerName: 'ID',
      maxWidth: 90,
    },
    {
      field: 'name',
      headerName: 'User',
      minWidth: 180,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 220,
    },
    {
      field: 'role',
      headerName: 'Role',
      cellClassRules: {
        'grid-role-admin': (parameters) => parameters.value === 'admin',
      },
    },
    {
      field: 'joinedAt',
      headerName: 'Joined',
      valueFormatter: (parameters: ValueFormatterParams<AdminUser, string>) =>
        this.formatDate(parameters.value),
    },
  ];

  readonly orderColumnDefs: ColDef<AdminOrderRow>[] = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 150,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      minWidth: 170,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 210,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      valueFormatter: (parameters: ValueFormatterParams<AdminOrderRow, string>) =>
        this.formatDate(parameters.value),
    },
    {
      field: 'items',
      headerName: 'Items',
      maxWidth: 100,
    },
    {
      field: 'total',
      headerName: 'Total',
      valueFormatter: (parameters: ValueFormatterParams<AdminOrderRow, number>) =>
        this.formatCurrency(parameters.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Processing', 'Shipped', 'Delivered'],
      },
      cellClassRules: {
        'grid-status-processing': (parameters) => parameters.value === 'Processing',

        'grid-status-shipped': (parameters) => parameters.value === 'Shipped',

        'grid-status-delivered': (parameters) => parameters.value === 'Delivered',
      },
    },
  ];

  readonly totalProducts = computed(() => this.products().length);

  readonly totalUsers = computed(() => this.users().length);

  readonly totalOrders = computed(() => this.orders().length);

  readonly totalRevenue = computed(() =>
    this.orders().reduce((total, order) => total + order.total, 0),
  );

  readonly recentOrders = computed(() => this.orders().slice(0, 5));

  readonly filteredProducts = computed(() => {
    const search = this.searchText().trim().toLowerCase();

    const category = this.selectedProductCategory();

    return this.products().filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      const matchesCategory = category === 'All' || product.category === category;

      return matchesSearch && matchesCategory;
    });
  });

  readonly filteredUsers = computed(() => {
    const search = this.searchText().trim().toLowerCase();

    return this.users().filter((user) => {
      return (
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    });
  });

  readonly orderRows = computed<AdminOrderRow[]>(() => {
    const search = this.searchText().trim().toLowerCase();

    const selectedStatus = this.selectedOrderStatus();

    return this.orders()
      .map((order) => ({
        id: order.id,
        customer: `${order.customer.firstName} ${order.customer.lastName}`,
        email: order.customer.email,
        createdAt: order.createdAt,
        items: this.getOrderItemCount(order),
        total: order.total,
        status: order.status,
      }))
      .filter((order) => {
        const matchesSearch =
          !search ||
          order.id.toLowerCase().includes(search) ||
          order.customer.toLowerCase().includes(search) ||
          order.email.toLowerCase().includes(search);

        const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;

        return matchesSearch && matchesStatus;
      });
  });

  selectSection(section: AdminSection): void {
    this.activeSection.set(section);
    this.searchText.set('');
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchText.set(input.value);
  }

  updateProductCategory(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.selectedProductCategory.set(select.value);
  }

  updateOrderFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.selectedOrderStatus.set(select.value);
  }

  addProduct(): void {
    const nextId = Math.max(0, ...this.products().map((product) => product.id)) + 1;

    const newProduct: AdminProduct = {
      id: nextId,
      name: `New Product ${nextId}`,
      category: 'Women',
      price: 49.99,
      stock: 10,
      image: '/images/women/product-1.jpg',
      status: 'Low stock',
    };

    this.products.update((products) => [newProduct, ...products]);
  }

  onProductCellClicked(event: CellClickedEvent<AdminProduct>): void {
    if (event.column.getColId() !== 'productActions' || !event.data) {
      return;
    }

    this.deleteProduct(event.data.id);
  }

  onProductCellValueChanged(): void {
    this.products.update((products) =>
      products.map((product) => {
        const stock = Number(product.stock);

        return {
          ...product,
          stock,
          status: this.getProductStatus(stock),
        };
      }),
    );
  }

  onOrderCellValueChanged(event: CellValueChangedEvent<AdminOrderRow>): void {
    this.ordersService.orders.update((orders) =>
      orders.map((order) =>
        order.id === event.data?.id
          ? {
              ...order,
              status: event.data.status,
            }
          : order,
      ),
    );

    this.saveOrders();
  }

  deleteProduct(productId: number): void {
    this.products.update((products) => products.filter((product) => product.id !== productId));
  }

  getOrderCustomerName(order: Order): string {
    return `${order.customer.firstName} ${order.customer.lastName}`;
  }

  getOrderItemCount(order: Order): number {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  }

  getChartHeight(value: number): number {
    const maximumValue = Math.max(...this.chartData.map((point) => point.value));

    return Math.max(12, (value / maximumValue) * 100);
  }

  goBackToStore(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    this.router.navigate(['/home']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private getProductStatus(stock: number): ProductStatus {
    if (stock <= 0) {
      return 'Out of stock';
    }

    if (stock <= 10) {
      return 'Low stock';
    }

    return 'Active';
  }

  private saveOrders(): void {
    localStorage.setItem('trendify_orders', JSON.stringify(this.ordersService.orders()));
  }

  private formatCurrency(value: number | null | undefined): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value ?? 0);
  }

  private formatDate(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(value));
  }
}
