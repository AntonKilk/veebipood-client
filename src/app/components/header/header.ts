import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { I18nService } from '../../services/i18n.service';
import { Locale } from '../../i18n/translations';
import { TPipe } from '../../i18n/t.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cart = inject(CartService);
  i18n = inject(I18nService);

  setLocale(value: Locale): void {
    this.i18n.setLocale(value);
  }

  localeBtnClass(target: Locale): string {
    const base = 'px-3 py-1.5 transition';
    return this.i18n.locale() === target
      ? `${base} bg-[color:var(--color-ink)] text-[color:var(--color-paper)]`
      : `${base} hover:bg-[color:var(--color-paper-soft)]`;
  }
}
