
// This function will format the price
// to the locale passed as parameter
// and will return a string with the formatted price
export const formatLocalePrice = (price: number, locale = 'es-ES') => 
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    // Since we handle the price in cents, 
    // we need to divide it by 100
  }).format(price / 100);