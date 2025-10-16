import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); 
    // 👆 assuming you store a JWT or flag in localStorage/sessionStorage

    if (isLoggedIn) {
      return true;  // ✅ Allow access
    } else {
      this.router.navigate(['/login']); // 🚫 Redirect to login
      return false;
    }
  }
}
