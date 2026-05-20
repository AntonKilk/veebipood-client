import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/products`;

  getProducts(page = 0, size = 12, categoryId?: number | null): Observable<Page<Product>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (categoryId != null) {
      params = params.set('categoryId', categoryId);
    }
    return this.http.get<Page<Product>>(this.base, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }
}
