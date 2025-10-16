import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule,AuthModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private authService:AuthService,private router:Router) {}
  private fb = inject(FormBuilder);
 

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  loading = false;
  showPassword = false;
  error: string | null = null;

  // Replace with your auth endpoint or service
  private authEndpoint = '/api/auth/login';

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  submit() {
    this.error = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const {remember , ...payload} = this.loginForm.value;
    console.log(payload)

    // Example HTTP; replace with AuthService in your app
    this.authService.login(payload).subscribe({
      next: (res:any) =>  {
        localStorage.setItem('access_token', res.access_token);

        const decoded = this.authService.jwt_decode(res.access_token);

        switch(decoded.role){
          case 'customer': this.router.navigate(['/customer']); break;
        }
        console.log('Decoded JWT:', decoded);
      },
      error: (err) => {
        console.log('Login error', err);
      }
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}


