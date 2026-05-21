import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false,
})
export class TPipe implements PipeTransform {
  private i18n = inject(I18nService);

  transform(key: string): string {
    // touch the signal so the impure pipe re-evaluates when locale changes
    this.i18n.locale();
    return this.i18n.t(key);
  }
}
