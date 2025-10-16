import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule,AuthModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {

  constructor(private authService:AuthService,private router:Router) {}
  private fb = inject(FormBuilder);
  

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['customer', Validators.required], // 'customer' | 'vendor'
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required]],
    acceptTerms: [false, Validators.requiredTrue],
  }, { validators: this.passwordMatch });

  loading = false;
  error: string | null = null;
  private signupEndpoint = '/api/auth/signup';

  passwordMatch(group: any) {
    const p = group.get('password')?.value;
    const c = group.get('confirm')?.value;
    return p === c ? null : { passwordMismatch: true };
  }

  submit() {
    this.error = null;
    alert("Signup Clicked");
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const body = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      role: this.signupForm.value.role,
      password: this.signupForm.value.password,
    };
    console.log(body);
    
    this.authService.signup(body).subscribe({
      next: (res) => {
        console.log('Signup successful', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Signup error', err);
      }
    })
  }
}
