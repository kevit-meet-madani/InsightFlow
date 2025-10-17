import { Component } from '@angular/core';
import { Product, SAMPLE_PRODUCTS } from '../../product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  query = '';
  showSuggestions = false;
  mobileMenuOpen = false;
  filtered: Product[] = [];

  filterProducts() {
    const q = this.query.trim().toLowerCase();
    this.filtered = q
      ? SAMPLE_PRODUCTS.filter(p =>
          p.name.toLowerCase().includes(q) || p.subtitle?.toLowerCase().includes(q)
        ).slice(0, 4)
      : [];
  }

  handleSearch() {
    if (this.query.trim()) {
      console.log('Searching for:', this.query);
      this.showSuggestions = false;
    }
  }

  handleSuggestionClick(product: Product) {
    this.query = product.name;
    this.showSuggestions = false;
    console.log('Selected product:', product);
  }
}
