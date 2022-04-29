export const DEFAULT_UNSPLASH_ID = '3zx-cgfbFAg';

const ONE_USD_TO_COP = 3741.5;
const ONE_USD_TO_EUR = 0.9;

export const TIME_DESCRIPTION = {
  MONTHLY: '/mo',
  YEARLY: '/year',
};
export const TIME_ATTRIBUTE = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};
export const CREDIT_CARD_TYPES = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
};

export const CURRENCY_TO_USD = {
  USD: (price) => price,
  COP: (price) => price / ONE_USD_TO_COP,
  EUR: (price) => price / ONE_USD_TO_EUR,
};
