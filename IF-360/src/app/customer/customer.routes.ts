import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomerHomeComponent } from "./home/home.component";

export const routes = [
  {
    path:'',
    component:CustomerHomeComponent
  }
]

export class CustomerRoutesModule {}