import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { productImageUrl } from '../../utils/product-image';
import { TPipe } from '../../i18n/t.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, TPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  private cart = inject(CartService);

  readonly imageFailed = signal(false);

  readonly imageUrl = computed(() => productImageUrl(this.product(), 'card'));

  readonly stockState = computed<'out' | 'low' | 'ok'>(() => {
    const s = this.product().stock;
    if (s <= 0) return 'out';
    if (s <= 3) return 'low';
    return 'ok';
  });

  onImageError(): void {
    this.imageFailed.set(true);
  }

  add(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cart.add(this.product());
  }
}
