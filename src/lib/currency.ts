export type Currency = 'USD' | 'EUR' | 'GBP' | 'RUB'

export interface CurrencyInfo {
  code: Currency
  symbol: string
  name: string
  nameRu: string
  rate: number // Rate relative to USD
}

export const currencies: Record<Currency, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameRu: 'Доллар США',
    rate: 1
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    nameRu: 'Евро',
    rate: 0.92
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    nameRu: 'Британский фунт',
    rate: 0.79
  },
  RUB: {
    code: 'RUB',
    symbol: '₽',
    name: 'Russian Ruble',
    nameRu: 'Российский рубль',
    rate: 95.0
  }
}

export function convertPrice(priceInUSD: number, targetCurrency: Currency): number {
  return priceInUSD * currencies[targetCurrency].rate
}

export function formatPrice(
  price: number,
  currency: Currency,
  convertEnabled: boolean = false
): string {
  const finalPrice = convertEnabled && currency !== 'USD' 
    ? convertPrice(price, currency) 
    : price
    
  const currencyInfo = currencies[currency]
  return `${currencyInfo.symbol}${finalPrice.toFixed(2)}`
}

export type CurrencyCode = Currency

export const currencySymbol: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  RUB: '₽'
}