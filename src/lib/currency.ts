export type Currency =
  | "GEL" // Georgian Lari (default)
  | "USD" // US Dollar
  | "EUR" // Euro
  | "GBP" // British Pound
  | "RUB" // Russian Ruble
  | "TRY" // Turkish Lira
  | "CNY" // Chinese Yuan
  | "INR" // Indian Rupee
  | "SAR" // Saudi Riyal
  | "BDT" // Bangladeshi Taka
  | "IDR" // Indonesian Rupiah
  | "JPY" // Japanese Yen
  | "KRW" // South Korean Won
  | "VND" // Vietnamese Dong
  | "PLN" // Polish Zloty
  | "UAH" // Ukrainian Hryvnia
  | "IRR" // Iranian Rial
  | "ILS" // Israeli Shekel
  | "AMD" // Armenian Dram
  | "AZN" // Azerbaijani Manat
  | "KZT" // Kazakhstani Tenge
  | "UZS"; // Uzbekistani Som

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  nameRu: string;
  rate: number; // Rate relative to USD
}

export const currencies: Record<Currency, CurrencyInfo> = {
  GEL: {
    code: "GEL",
    symbol: "₾",
    name: "Georgian Lari",
    nameRu: "Грузинский лари",
    rate: 2.7,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    nameRu: "Доллар США",
    rate: 1,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    nameRu: "Евро",
    rate: 0.92,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    nameRu: "Британский фунт",
    rate: 0.79,
  },
  RUB: {
    code: "RUB",
    symbol: "₽",
    name: "Russian Ruble",
    nameRu: "Российский рубль",
    rate: 95.0,
  },
  TRY: {
    code: "TRY",
    symbol: "₺",
    name: "Turkish Lira",
    nameRu: "Турецкая лира",
    rate: 34.5,
  },
  CNY: {
    code: "CNY",
    symbol: "¥",
    name: "Chinese Yuan",
    nameRu: "Китайский юань",
    rate: 7.24,
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    nameRu: "Индийская рупия",
    rate: 83.3,
  },
  SAR: {
    code: "SAR",
    symbol: "﷼",
    name: "Saudi Riyal",
    nameRu: "Саудовский риял",
    rate: 3.75,
  },
  BDT: {
    code: "BDT",
    symbol: "৳",
    name: "Bangladeshi Taka",
    nameRu: "Бангладешская така",
    rate: 110.0,
  },
  IDR: {
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    nameRu: "Индонезийская рупия",
    rate: 15650.0,
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    nameRu: "Японская иена",
    rate: 149.5,
  },
  KRW: {
    code: "KRW",
    symbol: "₩",
    name: "South Korean Won",
    nameRu: "Южнокорейская вона",
    rate: 1320.0,
  },
  VND: {
    code: "VND",
    symbol: "₫",
    name: "Vietnamese Dong",
    nameRu: "Вьетнамский донг",
    rate: 24500.0,
  },
  PLN: {
    code: "PLN",
    symbol: "zł",
    name: "Polish Zloty",
    nameRu: "Польский злотый",
    rate: 4.0,
  },
  UAH: {
    code: "UAH",
    symbol: "₴",
    name: "Ukrainian Hryvnia",
    nameRu: "Украинская гривна",
    rate: 36.5,
  },
  IRR: {
    code: "IRR",
    symbol: "﷼",
    name: "Iranian Rial",
    nameRu: "Иранский риал",
    rate: 42000.0,
  },
  ILS: {
    code: "ILS",
    symbol: "₪",
    name: "Israeli Shekel",
    nameRu: "Израильский шекель",
    rate: 3.7,
  },
  AMD: {
    code: "AMD",
    symbol: "֏",
    name: "Armenian Dram",
    nameRu: "Армянский драм",
    rate: 387.0,
  },
  AZN: {
    code: "AZN",
    symbol: "₼",
    name: "Azerbaijani Manat",
    nameRu: "Азербайджанский манат",
    rate: 1.7,
  },
  KZT: {
    code: "KZT",
    symbol: "₸",
    name: "Kazakhstani Tenge",
    nameRu: "Казахстанский тенге",
    rate: 445.0,
  },
  UZS: {
    code: "UZS",
    symbol: "soʻm",
    name: "Uzbekistani Som",
    nameRu: "Узбекский сум",
    rate: 12400.0,
  },
};

export function convertPrice(
  priceInUSD: number,
  targetCurrency: Currency
): number {
  return priceInUSD * currencies[targetCurrency].rate;
}

export function formatPrice(
  price: number,
  currency: Currency,
  convertEnabled: boolean = false
): string {
  const finalPrice =
    convertEnabled && currency !== "USD"
      ? convertPrice(price, currency)
      : price;

  const currencyInfo = currencies[currency];
  return `${currencyInfo.symbol}${finalPrice.toFixed(2)}`;
}

export type CurrencyCode = Currency;

export const currencySymbol: Record<Currency, string> = {
  GEL: "₾",
  USD: "$",
  EUR: "€",
  GBP: "£",
  RUB: "₽",
  TRY: "₺",
  CNY: "¥",
  INR: "₹",
  SAR: "﷼",
  BDT: "৳",
  IDR: "Rp",
  JPY: "¥",
  KRW: "₩",
  VND: "₫",
  PLN: "zł",
  UAH: "₴",
  IRR: "﷼",
  ILS: "₪",
  AMD: "֏",
  AZN: "₼",
  KZT: "₸",
  UZS: "soʻm",
};
