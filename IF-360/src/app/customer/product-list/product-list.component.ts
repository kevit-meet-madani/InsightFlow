import { Component, OnInit } from '@angular/core';


interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  image: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentpage = 1

  constructor() { }

  ngOnInit(): void {
    // Sample product data
    this.products = [
      {
        id: 1,
        name: 'Bamboo Watch',
        category: 'Accessories',
        price: 65,
        rating: 4.2,
        inventoryStatus: 'INSTOCK',
        image: 'bamboo-watch.jpg'
      },
      {
        id: 2,
        name: 'Black Watch',
        category: 'Accessories',
        price: 72,
        rating: 4.0,
        inventoryStatus: 'LOWSTOCK',
        image: 'black-watch.jpg'
      },
      {
        id: 3,
        name: 'Blue Band',
        category: 'Fitness',
        price: 79,
        rating: 3.5,
        inventoryStatus: 'OUTOFSTOCK',
        image: 'blue-band.jpg'
      },
      {
        id: 1,
        name: 'Bamboo Watch',
        category: 'Accessories',
        price: 65,
        rating: 4.2,
        inventoryStatus: 'INSTOCK',
        image: 'bamboo-watch.jpg'
      },
      {
        id: 2,
        name: 'Black Watch',
        category: 'Accessories',
        price: 72,
        rating: 4.0,
        inventoryStatus: 'LOWSTOCK',
        image: 'black-watch.jpg'
      },
      {
        id: 3,
        name: 'Blue Band',
        category: 'Fitness',
        price: 79,
        rating: 3.5,
        inventoryStatus: 'OUTOFSTOCK',
        image: 'blue-band.jpg'
      },
      {
        id: 1,
        name: 'Bamboo Watch',
        category: 'Accessories',
        price: 65,
        rating: 4.2,
        inventoryStatus: 'INSTOCK',
        image: 'bamboo-watch.jpg'
      },
      {
        id: 2,
        name: 'Black Watch',
        category: 'Accessories',
        price: 72,
        rating: 4.0,
        inventoryStatus: 'LOWSTOCK',
        image: 'black-watch.jpg'
      },
      {
        id: 3,
        name: 'Blue Band',
        category: 'Fitness',
        price: 79,
        rating: 3.5,
        inventoryStatus: 'OUTOFSTOCK',
        image: 'blue-band.jpg'
      },
      // Add more products as needed
    ];
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
