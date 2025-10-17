import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders: any = [
    {
    id: 'ORD-1001',
    productName: 'Apple MacBook Air M3',
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    amount: 1249.99,
    status: 'DELIVERED',
    dateOrdered: '2025-09-20T10:45:00Z',
    expectedDelivery: '2025-09-25T18:00:00Z',
    timeline: [
      { stage: 'PENDING',    time: '2025-09-20T10:45:00Z' },
      { stage: 'PAID',       time: '2025-09-20T10:46:30Z' },
      { stage: 'ACCEPTED',   time: '2025-09-20T11:15:00Z' },
      { stage: 'SHIPPED',    time: '2025-09-21T08:00:00Z' },
      { stage: 'DELIVERED',  time: '2025-09-25T15:10:00Z' }
    ]
  },
  {
    id: 'ORD-1002',
    productName: 'Samsung Galaxy S24 Ultra',
    productImage: 'https://images.unsplash.com/photo-1610394052941-4b8d1c6e9c5f',
    amount: 999.00,
    status: 'SHIPPED',
    dateOrdered: '2025-10-10T09:20:00Z',
    expectedDelivery: '2025-10-18T18:00:00Z',
    timeline: [
      { stage: 'PENDING',  time: '2025-10-10T09:20:00Z' },
      { stage: 'PAID',     time: '2025-10-10T09:22:00Z' },
      { stage: 'ACCEPTED', time: '2025-10-10T09:30:00Z' },
      { stage: 'SHIPPED',  time: '2025-10-11T14:00:00Z' }
    ]
  },
  {
    id: 'ORD-1003',
    productName: 'Sony WH-1000XM5 Headphones',
    productImage: 'https://images.unsplash.com/photo-1585386959984-a41552231693',
    amount: 349.99,
    status: 'ACCEPTED',
    dateOrdered: '2025-10-15T14:40:00Z',
    expectedDelivery: '2025-10-21T18:00:00Z',
    timeline: [
      { stage: 'PENDING',  time: '2025-10-15T14:40:00Z' },
      { stage: 'PAID',     time: '2025-10-15T14:41:00Z' },
      { stage: 'ACCEPTED', time: '2025-10-15T15:10:00Z' }
    ]
  },
  {
    id: 'ORD-1004',
    productName: 'Nike Air Zoom Pegasus 41',
    productImage: 'https://images.unsplash.com/photo-1606813902935-9b60a0b43b93',
    amount: 159.49,
    status: 'PAID',
    dateOrdered: '2025-10-16T11:00:00Z',
    expectedDelivery: '2025-10-23T18:00:00Z',
    timeline: [
      { stage: 'PENDING',  time: '2025-10-16T11:00:00Z' },
      { stage: 'PAID',     time: '2025-10-16T11:02:30Z' }
    ]
  },
  {
    id: 'ORD-1005',
    productName: 'Logitech MX Master 4 Mouse',
    productImage: 'https://images.unsplash.com/photo-1622467249824-87ad1b57a981',
    amount: 129.00,
    status: 'PENDING',
    dateOrdered: '2025-10-17T09:00:00Z',
    expectedDelivery: '2025-10-24T18:00:00Z',
    timeline: [
      { stage: 'PENDING',  time: '2025-10-17T09:00:00Z' }
    ]
  }
  ];

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  async loadOrders() {
    this.orders = await this.customerService.getOrderHistory();
  }

  viewOrder(orderId: string) {
    this.router.navigate(['/orders', orderId]);
  }

  trackOrder(orderId: string) {
    // this.router.navigate(['/orders-tracker', orderId, 'tracker']);
    this.router.navigate(['/order-tracker']);
  }
}
