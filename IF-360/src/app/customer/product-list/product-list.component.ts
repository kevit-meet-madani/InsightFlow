import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Product } from '../../product.model';
import { CustomerService } from '../customer.service';




@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentpage = 1

  constructor(private sharedSErvice:SharedService,private customerService:CustomerService) { }

  

  ngOnInit(): void {
    // Sample product data
    

    this.customerService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = this.products;
    })
    

    this.sharedSErvice.event$.subscribe(filters => {
      this.onFilterChange(filters);
    })
  }

  // Returns severity for p-tag based on inventoryStatus
  getSeverity(item: Product): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
  switch (item.inventoryStatus) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warning';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return 'secondary';
  }
}

  onFilterChange(filters: any) {
  this.filteredProducts = this.products.filter(p => {
    const matchCategory = filters.category ? p.category === filters.category : true;
    const matchStatus = filters.status ? p.inventoryStatus === filters.status : true;
    const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
    const matchRating = filters.rating ? p.rating >= filters.rating : true;
    return matchCategory && matchStatus && matchPrice && matchRating;
  });
}
}
