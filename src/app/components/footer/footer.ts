import { Component } from '@angular/core';
import { TPipe } from '../../i18n/t.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
