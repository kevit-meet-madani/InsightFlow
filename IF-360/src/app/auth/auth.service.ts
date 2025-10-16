import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
    constructor(private http: HttpClient) {}

    url = 'http://localhost:3000/auth'

    signup(data:any)
    {
       return this.http.post(`${this.url}/signup`,data);
    }

    login(data:any){
        return this.http.post(`${this.url}/login`,data);
    }

    jwt_decode(access_token: string): any {
  // Basic JWT decode (does not verify signature)
       const payload = access_token.split('.')[1];
       if (!payload) throw new Error('Invalid JWT token');
       const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
       try {
          return JSON.parse(decoded);
        } catch {
        throw new Error('Failed to parse JWT payload');
        }
     }
}