// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    // Clone the request and add Authorization header
    const authReq = token 
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    // Pass the request to next handler
    console.log('Intercepted request:', authReq);
    return next.handle(authReq);
  }
}
