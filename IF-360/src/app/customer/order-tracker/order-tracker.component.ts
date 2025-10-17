import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { WebSocketService } from '../shared/websocket.service';
// import { OrdersService } from './orders.service';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
})
export class OrderTrackerComponent implements OnInit, OnDestroy {
  orderId!: string;
  currentStatus = 'PENDING';
  currentStepIndex = 0;

  steps = [
    { label: 'Pending', description: 'Order placed, awaiting payment.' },
    { label: 'Paid', description: 'Payment confirmed.' },
    { label: 'Accepted', description: 'Vendor accepted the order.' },
    { label: 'Shipped', description: 'Your order is on its way.' },
    { label: 'Delivered', description: 'Order delivered successfully.' },
  ];

  constructor(
    private route: ActivatedRoute,
    // private wsService: WebSocketService,
    // private orderService: OrdersService
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    this.initializeTracker();
  }

  async initializeTracker() {
    // const order = await this.orderService.getOrderById(this.orderId);
    // this.currentStatus = order.status;
    // this.updateStepIndex();

    // this.wsService.subscribeToOrder(this.orderId, (newStatus: string) => {
    //   this.currentStatus = newStatus;
    //   this.updateStepIndex();
    // });
  }

  updateStepIndex() {
    const statusIndex = this.steps.findIndex(
      (s) => s.label.toUpperCase() === this.currentStatus.toUpperCase()
    );
    this.currentStepIndex = statusIndex >= 0 ? statusIndex : 0;
  }

  ngOnDestroy() {
    // this.wsService.unsubscribeOrder(this.orderId);
  }
}
