import { Component, OnInit } from '@angular/core';
import { MOCK_ORDERS, Order } from '../../product.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  activeOrders: Order[] = [];
  orderHistory: Order[] = [];

  // In your component.ts
events = [
  { date: '2025-10-20', status: 'PENDING' },
  { date: '2025-10-21', status: 'PAID' },
  { date: '2025-10-22', status: 'ACCEPTED' },
  { date: '2025-10-23', status: 'SHIPPED' },
  // { date: '2025-10-24', status: 'DELIVERED' }
];

  showtrack = false;

  ngOnInit(): void {
    const allOrders = MOCK_ORDERS;

    this.activeOrders = allOrders.filter(
      (order) => order.status !== 'DELIVERED'
    );

    this.orderHistory = allOrders.filter(
      (order) => order.status === 'DELIVERED'
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'PAID': return 'bg-blue-100 text-blue-700';
      case 'ACCEPTED': return 'bg-indigo-100 text-indigo-700';
      case 'SHIPPED': return 'bg-teal-100 text-teal-700';
      case 'DELIVERED': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  showTrack(){
    this.showtrack = !this.showtrack;
  }
}
