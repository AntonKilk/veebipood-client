import { Injectable, signal, effect } from '@angular/core';
import { Locale, translations } from '../i18n/translations';

const STORAGE_KEY = 'veebipood.locale';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly locale = signal<Locale>(this.readInitialLocale());

  constructor() {
    effect(() => {
      const value = this.locale();
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // ignore (private mode / SSR)
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = value;
      }
    });
  }

  setLocale(next: Locale): void {
    this.locale.set(next);
  }

  toggle(): void {
    this.locale.update(l => (l === 'et' ? 'en' : 'et'));
  }

  t(key: string): string {
    const dict = translations[this.locale()];
    return dict[key] ?? translations.et[key] ?? key;
  }

  private readInitialLocale(): Locale {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'et') return stored;
    } catch {
      // ignore
    }
    return 'et';
  }
}
