import { Component, Input } from '@angular/core';
import { Product } from '../../product.model';


@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;
}
