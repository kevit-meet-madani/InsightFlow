import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CustomerHomeComponent } from './home/home.component';
import { routes } from './customer.routes'; // ✅ remove extra dot
import { CustomerNavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterComponent } from './filter/filter.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerFooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerNavbarComponent,
    ProductListComponent,
    FilterComponent,
    CustomerFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),// ✅ lazy-loaded child routes
    FormsModule, 
    RouterLink,
    DataViewModule,
    TagModule,
    ButtonModule,
    NgxPaginationModule
  ],
  providers:[
    provideHttpClient(withFetch())
  ]
})
export class CustomerModule {}
