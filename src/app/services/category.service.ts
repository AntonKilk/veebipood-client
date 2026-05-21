import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }
}
