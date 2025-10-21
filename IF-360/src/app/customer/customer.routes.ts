import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomerHomeComponent } from "./home/home.component";
import { OrdersComponent } from "./orders/orders.component";
import { CartComponent } from "./cart/cart.component";
import { ProfileComponent } from "./profile/profile.component";

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
    path:'cart',
    component:CartComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  }
]

export class CustomerRoutesModule {}