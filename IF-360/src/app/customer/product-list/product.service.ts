import { Observable } from "rxjs";
import { Product } from "../../product.model";
import { HttpClient } from "@angular/common/http";

export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}