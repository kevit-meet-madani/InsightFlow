import { Component, OnInit } from '@angular/core';

export interface CartItem {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor() {}

  ngOnInit(): void {
    // Example mock data
    this.cartItems = [
      {
        id: 'P-1001',
        productName: 'Apple MacBook Air M3',
        productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        price: 1249.99,
        quantity: 1
      },
      {
        id: 'P-1002',
        productName: 'Sony WH-1000XM5 Headphones',
        productImage: 'https://images.unsplash.com/photo-1585386959984-a41552231693',
        price: 349.99,
        quantity: 2
      }
    ];
  }

  // Update quantity
  updateQuantity(item: CartItem, change: number) {
    const index = this.cartItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity += change;
      if (this.cartItems[index].quantity < 1) this.cartItems[index].quantity = 1;
    }
  }

  // Remove item from cart
  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  // Calculate subtotal
  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Checkout action
  checkout() {
    alert('Proceed to checkout with total: ₹' + this.subtotal.toFixed(2));
    // Integrate with payment module / backend API
  }
}
