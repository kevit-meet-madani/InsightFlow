import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomerHomeComponent } from "./home/home.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderTrackerComponent } from "./order-tracker/order-tracker.component";

export const routes = [
  {
    path:'',
    component:CustomerHomeComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  },
  {
    path:'order-tracker',
    component:OrderTrackerComponent
  }
]

export class CustomerRoutesModule {}