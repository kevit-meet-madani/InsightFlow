import { Component } from '@angular/core';
import { SAMPLE_PRODUCTS } from '../../product.model';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule,ProductCardComponent,CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  query = '';
  products = SAMPLE_PRODUCTS;
  handleSearch() {
    if (this.query.trim()) {
      console.log('Searching for:', this.query);
      // Integrate real search or route if needed
    }
  }
}
