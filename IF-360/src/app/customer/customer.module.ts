import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CustomerHomeComponent } from './home/home.component';
import { routes } from './customer.routes'; // ✅ remove extra dot
import { CustomerNavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterComponent } from './filter/filter.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerFooterComponent } from './footer/footer.component';
import { BadgeModule } from 'primeng/badge';
import { CustomerService } from './customer.service';
import { OrdersComponent } from './orders/orders.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from "../landing/footer/footer.component";
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerNavbarComponent,
    ProductListComponent,
    FilterComponent,
    CustomerFooterComponent,
    OrdersComponent,
    CartComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // ✅ lazy-loaded child routes
    FormsModule,
    RouterLink,
    DataViewModule,
    TagModule,
    ButtonModule,
    NgxPaginationModule,
    BadgeModule,
    HttpClientModule,
    SkeletonModule,
    FooterComponent,
    TimelineModule,
    CardModule
],
  providers:[
    CustomerService,
    provideHttpClient(withFetch())
  ]
})
export class CustomerModule {}
