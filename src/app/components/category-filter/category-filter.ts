import { Component, input, output } from '@angular/core';
import { Category } from '../../models/product.model';
import { TPipe } from '../../i18n/t.pipe';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [TPipe],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
})
export class CategoryFilter {
  categories = input<Category[]>([]);
  selected = input<number | null>(null);
  selectedChange = output<number | null>();

  pick(id: number | null): void {
    this.selectedChange.emit(id);
  }

  pillClass(active: boolean): string {
    const base = 'px-4 py-2 text-[12px] tracking-wide border transition';
    return active
      ? `${base} bg-[color:var(--color-ink)] text-[color:var(--color-paper)] border-[color:var(--color-ink)]`
      : `${base} border-[color:var(--color-rule)] hover:border-[color:var(--color-ink)]`;
  }
}
