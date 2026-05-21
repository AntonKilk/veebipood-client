import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { productImageUrl } from '../../utils/product-image';
import { QuantityStepper } from '../../components/quantity-stepper/quantity-stepper';
import { TPipe } from '../../i18n/t.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, QuantityStepper, TPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  // Bound via withComponentInputBinding() from app.config.ts
  id = input.required<string>();

  private products = inject(ProductService);
  private cart = inject(CartService);

  readonly product = signal<Product | null>(null);
  readonly quantity = signal(1);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly justAdded = signal(false);
  readonly imageFailed = signal(false);

  readonly imageUrl = computed(() => {
    const p = this.product();
    return p ? productImageUrl(p, 'detail') : '';
  });

  readonly outOfStock = computed(() => {
    const p = this.product();
    return !p || p.stock <= 0;
  });

  ngOnInit(): void {
    const numericId = Number(this.id());
    if (!Number.isFinite(numericId)) {
      this.error.set('error');
      this.loading.set(false);
      return;
    }
    this.products.getProduct(numericId).subscribe({
      next: p => {
        this.product.set(p);
        this.quantity.set(p.stock > 0 ? 1 : 0);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('error');
        this.loading.set(false);
      },
    });
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }

  onQuantityChange(value: number): void {
    this.quantity.set(value);
  }

  add(): void {
    const p = this.product();
    if (!p || p.stock <= 0) return;
    this.cart.add(p, this.quantity());
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 1800);
  }
}
