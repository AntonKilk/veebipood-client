import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { productImageUrl } from '../utils/product-image';
import { QuantityStepper } from '../components/quantity-stepper/quantity-stepper';
import { TPipe } from '../i18n/t.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, QuantityStepper, TPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart = inject(CartService);

  readonly submitting = signal(false);
  readonly success = signal(false);
  readonly error = signal<string | null>(null);
  readonly failedImages = signal<Set<number>>(new Set());

  imageFor(product: Product): string {
    return productImageUrl(product, 'thumb');
  }

  isImageFailed(productId: number): boolean {
    return this.failedImages().has(productId);
  }

  onImageError(productId: number): void {
    this.failedImages.update(set => {
      const next = new Set(set);
      next.add(productId);
      return next;
    });
  }

  onQuantity(productId: number, qty: number): void {
    this.cart.setQuantity(productId, qty);
  }

  remove(productId: number): void {
    this.cart.remove(productId);
  }

  checkout(): void {
    if (this.cart.lines().length === 0 || this.submitting()) return;
    this.submitting.set(true);
    this.error.set(null);
    this.cart.checkout().subscribe({
      next: () => {
        this.cart.clear();
        this.success.set(true);
        this.submitting.set(false);
      },
      error: () => {
        this.error.set('error');
        this.submitting.set(false);
      },
    });
  }
}
