
export const formatLocalePrice = (price: number, locale = 'es-ES') => 
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    // Since we handle the price in cents, we need to divide by 100
  }).format(price / 100);