import { Component, OnInit } from '@angular/core';

export interface Address {
  id: number;
  label: string;
  address: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  name: string = 'Alice Johnson';
  email: string = 'alice@example.com';
  password: string = '';
  confirmPassword: string = '';
  addresses: Address[] = [];

  newAddressLabel: string = '';
  newAddressValue: string = '';

  constructor() {}

  ngOnInit(): void {
    // Sample addresses
    this.addresses = [
      { id: 1, label: 'Home', address: '123 Main Street, City, Country' },
      { id: 2, label: 'Work', address: '456 Office Park, City, Country' },
    ];
  }

  // Add new address
  addAddress() {
    if (this.newAddressLabel && this.newAddressValue) {
      const newId = this.addresses.length
        ? Math.max(...this.addresses.map(a => a.id)) + 1
        : 1;
      this.addresses.push({
        id: newId,
        label: this.newAddressLabel,
        address: this.newAddressValue
      });
      this.newAddressLabel = '';
      this.newAddressValue = '';
    }
  }

  // Remove address
  removeAddress(id: number) {
    this.addresses = this.addresses.filter(a => a.id !== id);
  }

  // Update profile
  updateProfile() {
    if (this.password && this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Normally, send data to backend API
    alert('Profile updated successfully!');
  }
}
