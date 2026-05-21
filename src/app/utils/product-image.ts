import { Product } from '../models/product.model';

const VARIANTS = {
  card: { w: 600, h: 750 },
  detail: { w: 900, h: 1125 },
  thumb: { w: 240, h: 240 },
} as const;

export type ImageVariant = keyof typeof VARIANTS;

export function productImageUrl(product: Product, variant: ImageVariant = 'card'): string {
  const raw = (product.image || '').trim();
  if (raw && /^(https?:|data:|\/)/i.test(raw)) {
    return raw;
  }
  const { w, h } = VARIANTS[variant];
  return `https://picsum.photos/seed/veebipood-${product.id}/${w}/${h}`;
}
