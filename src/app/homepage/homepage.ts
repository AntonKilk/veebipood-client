import { Component, OnInit, inject, signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category, Page, Product } from '../models/product.model';
import { ProductCard } from '../components/product-card/product-card';
import { CategoryFilter } from '../components/category-filter/category-filter';
import { TPipe } from '../i18n/t.pipe';

const PAGE_SIZE = 12;

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ProductCard, CategoryFilter, TPipe],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  private products = inject(ProductService);
  private categoryService = inject(CategoryService);

  readonly items = signal<Product[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly selectedCategoryId = signal<number | null>(null);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: cats => this.categories.set(cats),
      error: () => this.categories.set([]),
    });
    this.load();
  }

  onCategoryChange(id: number | null): void {
    this.selectedCategoryId.set(id);
    this.page.set(0);
    this.load();
  }

  prev(): void {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.load();
    }
  }

  next(): void {
    if (this.page() < this.totalPages() - 1) {
      this.page.update(p => p + 1);
      this.load();
    }
  }

  retry(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.products
      .getProducts(this.page(), PAGE_SIZE, this.selectedCategoryId())
      .subscribe({
        next: (resp: Page<Product>) => {
          this.items.set(resp.content ?? []);
          this.totalPages.set(resp.totalPages ?? 0);
          this.loading.set(false);
        },
        error: () => {
          this.items.set([]);
          this.error.set('error');
          this.loading.set(false);
        },
      });
  }
}
