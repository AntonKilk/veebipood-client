export type Locale = 'et' | 'en';

export const translations: Record<Locale, Record<string, string>> = {
  et: {
    'brand.name': 'veebipood',
    'brand.tagline': 'Põhjamaine pood, hoolikalt valitud',

    'nav.home': 'Avaleht',
    'nav.cart': 'Ostukorv',

    'hero.eyebrow': 'Kollektsioon · 2026',
    'hero.title': 'Esemed, mis kestavad.',
    'hero.body': 'Valitud kogu igapäevasest disainist. Ei midagi liigset, kõik vajalik.',

    'filter.all': 'Kõik',
    'filter.label': 'Kategooriad',

    'product.add': 'Lisa ostukorvi',
    'product.added': 'Lisatud',
    'product.outOfStock': 'Otsas',
    'product.inStock': 'Laos',
    'product.lowStock': 'Vähe alles',
    'product.stockCount': 'tk laos',
    'product.back': 'Tagasi poodi',
    'product.description': 'Kirjeldus',
    'product.category': 'Kategooria',
    'product.quantity': 'Kogus',

    'cart.title': 'Ostukorv',
    'cart.empty': 'Sinu ostukorv on tühi.',
    'cart.emptyCta': 'Vaata tooteid',
    'cart.subtotal': 'Vahesumma',
    'cart.total': 'Kokku',
    'cart.remove': 'Eemalda',
    'cart.checkout': 'Vormista tellimus',
    'cart.success': 'Tellimus on edukalt vormistatud. Aitäh!',
    'cart.error': 'Tellimuse vormistamine ebaõnnestus. Palun proovi uuesti.',
    'cart.itemCount': 'eset',

    'common.loading': 'Laeb...',
    'common.error': 'Midagi läks valesti.',
    'common.retry': 'Proovi uuesti',
    'common.page': 'Lehekülg',
    'common.of': '/',
    'common.prev': 'Eelmine',
    'common.next': 'Järgmine',

    'notFound.eyebrow': 'Viga 404',
    'notFound.title': 'Lehte ei leitud.',
    'notFound.body': 'Aadress, mida otsid, on liikunud või seda pole olemas.',
    'notFound.cta': 'Tagasi avalehele',

    'footer.copyright': '© 2026 veebipood. Kõik õigused kaitstud.',
    'footer.repo': 'Lähtekood',
  },
  en: {
    'brand.name': 'veebipood',
    'brand.tagline': 'A nordic shop, carefully curated',

    'nav.home': 'Home',
    'nav.cart': 'Cart',

    'hero.eyebrow': 'Collection · 2026',
    'hero.title': 'Objects that last.',
    'hero.body': 'A small edit of daily design. Nothing excess, everything essential.',

    'filter.all': 'All',
    'filter.label': 'Categories',

    'product.add': 'Add to cart',
    'product.added': 'Added',
    'product.outOfStock': 'Sold out',
    'product.inStock': 'In stock',
    'product.lowStock': 'Few left',
    'product.stockCount': 'in stock',
    'product.back': 'Back to shop',
    'product.description': 'Description',
    'product.category': 'Category',
    'product.quantity': 'Quantity',

    'cart.title': 'Cart',
    'cart.empty': 'Your cart is empty.',
    'cart.emptyCta': 'Browse products',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.remove': 'Remove',
    'cart.checkout': 'Place order',
    'cart.success': 'Your order has been placed. Thank you!',
    'cart.error': 'We couldn’t place your order. Please try again.',
    'cart.itemCount': 'items',

    'common.loading': 'Loading…',
    'common.error': 'Something went wrong.',
    'common.retry': 'Try again',
    'common.page': 'Page',
    'common.of': '/',
    'common.prev': 'Previous',
    'common.next': 'Next',

    'notFound.eyebrow': 'Error 404',
    'notFound.title': 'Page not found.',
    'notFound.body': 'The address you’re looking for has moved or never existed.',
    'notFound.cta': 'Back to home',

    'footer.copyright': '© 2026 veebipood. All rights reserved.',
    'footer.repo': 'Source code',
  },
};
