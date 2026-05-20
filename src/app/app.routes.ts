import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Cart } from './cart/cart';
import { NotFound } from './not-found/not-found';
import { ProductDetail } from './products/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: '**', component: NotFound },
];
