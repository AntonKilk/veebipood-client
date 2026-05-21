import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartLine, Order, OrderRowRequest } from '../models/order.model';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'veebipood.cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);

  readonly lines = signal<CartLine[]>(this.hydrate());

  readonly count = computed(() =>
    this.lines().reduce((sum, l) => sum + l.quantity, 0),
  );

  readonly total = computed(() =>
    this.lines().reduce((sum, l) => sum + l.quantity * l.product.price, 0),
  );

  constructor() {
    effect(() => {
      const snapshot = this.lines();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
        // ignore
      }
    });
  }

  add(product: Product, qty = 1): void {
    if (product.stock <= 0) return;
    this.lines.update(current => {
      const existing = current.find(l => l.product.id === product.id);
      if (existing) {
        return current.map(l =>
          l.product.id === product.id
            ? { ...l, quantity: Math.min(l.quantity + qty, product.stock) }
            : l,
        );
      }
      return [...current, { product, quantity: Math.min(qty, product.stock) }];
    });
  }

  setQuantity(productId: number, qty: number): void {
    if (qty <= 0) {
      this.remove(productId);
      return;
    }
    this.lines.update(current =>
      current.map(l =>
        l.product.id === productId
          ? { ...l, quantity: Math.min(qty, l.product.stock) }
          : l,
      ),
    );
  }

  remove(productId: number): void {
    this.lines.update(current => current.filter(l => l.product.id !== productId));
  }

  clear(): void {
    this.lines.set([]);
  }

  checkout(): Observable<Order> {
    const body: OrderRowRequest[] = this.lines().map(l => ({
      quantity: l.quantity,
      product: { id: l.product.id },
    }));
    return this.http.post<Order>(`${environment.apiUrl}/orders`, body);
  }

  private hydrate(): CartLine[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (l): l is CartLine =>
          l && typeof l.quantity === 'number' && l.product && typeof l.product.id === 'number',
      );
    } catch {
      return [];
    }
  }
}
