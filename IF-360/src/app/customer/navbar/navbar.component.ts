import { Component } from '@angular/core';
import { Product } from '../../product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-customernavbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class CustomerNavbarComponent {
  query = '';
  showSuggestions = false;
  mobileMenuOpen = false;
  filtered: Product[] = [];
  showNotifications = false;
  notifications: any[] = [
    { message: 'New order received', read: false },
    { message: 'Stock low on product X', read: false },
    { message: 'Server maintenance scheduled', read: true },
  ];
  unreadCount = 3

  filterProducts() {
    // const q = this.query.trim().toLowerCase();
    // this.filtered = q
    //   ? SAMPLE_PRODUCTS.filter(p =>
    //       p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
    //     ).slice(0, 4)
    //   : [];
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

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  closeNotifications() {
    this.showNotifications = false;
  }
}