import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../i18n/t.pipe';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, TPipe],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
