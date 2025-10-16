import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<any>();

  // Example filter options
  categories: string[] = ['Accessories', 'Fitness', 'Electronics'];
  inventoryStatuses: string[] = ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'];

  // Current selected filters
  selectedCategory: string | null = null;
  selectedStatus: string | null = null;
  priceRange: { min: number; max: number } = { min: 0, max: 1000 };
  rating: number | null = null;

  constructor() { }

  ngOnInit(): void {}

  // Emit filter whenever it changes
  applyFilters() {
    this.filterChange.emit({
      category: this.selectedCategory,
      status: this.selectedStatus,
      minPrice: this.priceRange.min,
      maxPrice: this.priceRange.max,
      rating: this.rating
    });
  }

  resetFilters() {
    this.selectedCategory = null;
    this.selectedStatus = null;
    this.priceRange = { min: 0, max: 1000 };
    this.rating = null;
    this.applyFilters();
  }
}
