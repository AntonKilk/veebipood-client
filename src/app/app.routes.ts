import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Cart } from './cart/cart'
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    { path: "", component: Homepage },
    { path: "cart", component: Cart },
    { path: "**", component: NotFound }
];
