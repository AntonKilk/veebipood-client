import { Product } from './product.model';

export interface OrderRowRequest {
  quantity: number;
  product: { id: number };
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  name: string;
  total: number;
  active: boolean;
}
