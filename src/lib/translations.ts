export type Language =
  | "ka" // Georgian (default)
  | "en" // English
  | "ru" // Russian
  | "tr" // Turkish
  | "hy" // Armenian
  | "zh" // Chinese
  | "hi" // Hindi
  | "es" // Spanish
  | "fr" // French
  | "ar" // Arabic
  | "bn" // Bengali
  | "pt" // Portuguese
  | "id" // Indonesian
  | "ur" // Urdu
  | "de" // German
  | "ja" // Japanese
  | "ko" // Korean
  | "vi" // Vietnamese
  | "it" // Italian
  | "pl" // Polish
  | "uk" // Ukrainian
  | "fa" // Persian
  | "he" // Hebrew
  | "az" // Azerbaijani
  | "kk" // Kazakh
  | "uz" // Uzbek
  | "ab"; // Abkhazian

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: string; // ISO 3166-1 alpha-2 country code for flag
}

export const languages: LanguageInfo[] = [
  // Main languages (5)
  {
    code: "ka",
    name: "Georgian",
    nativeName: "ქართული",
    flag: "🇬🇪",
    countryCode: "ge",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    countryCode: "us",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    countryCode: "ru",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    countryCode: "tr",
  },
  {
    code: "hy",
    name: "Armenian",
    nativeName: "Հայերեն",
    flag: "🇦🇲",
    countryCode: "am",
  },

  // Popular world languages (17)
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    countryCode: "cn",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    countryCode: "in",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    countryCode: "es",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    countryCode: "fr",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    countryCode: "sa",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇧🇩",
    countryCode: "bd",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    countryCode: "pt",
  },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    countryCode: "id",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    countryCode: "pk",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    countryCode: "de",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    countryCode: "jp",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    countryCode: "kr",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    countryCode: "vn",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    countryCode: "it",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    countryCode: "pl",
  },
  {
    code: "uk",
    name: "Ukrainian",
    nativeName: "Українська",
    flag: "🇺🇦",
    countryCode: "ua",
  },
  {
    code: "fa",
    name: "Persian",
    nativeName: "فارسی",
    flag: "🇮🇷",
    countryCode: "ir",
  },

  // Regional (tourist) languages (5)
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    flag: "🇮🇱",
    countryCode: "il",
  },
  {
    code: "az",
    name: "Azerbaijani",
    nativeName: "Azərbaycan",
    flag: "🇦🇿",
    countryCode: "az",
  },
  {
    code: "kk",
    name: "Kazakh",
    nativeName: "Қазақша",
    flag: "🇰🇿",
    countryCode: "kz",
  },
  {
    code: "uz",
    name: "Uzbek",
    nativeName: "Oʻzbek",
    flag: "🇺🇿",
    countryCode: "uz",
  },
  {
    code: "ab",
    name: "Abkhazian",
    nativeName: "Аҧсуа бызшәа",
    flag: "🇬🇪",
    countryCode: "ge",
  },
];

export interface MenuItemTranslation {
  name: string;
  description: string;
}

export interface ModifierTranslation {
  name: string;
  options: { [optionId: string]: string };
}

export const categoryTranslations: Partial<
  Record<Language, Record<string, string>>
> = {
  ka: {
    Food: "საკვები",
    Cocktails: "კოქტეილები",
    "Beers, Spirits & Wines": "ლუდი, სპირტიანი სასმელები და ღვინო",
    "Non-Alcoholic Drinks": "უალკოჰოლო სასმელები",
    "Urban Legends": "ურბანული ლეგენდები",
    Desserts: "დესერტები",
  },
  en: {
    Food: "Food",
    Cocktails: "Cocktails",
    "Beers, Spirits & Wines": "Beers, Spirits & Wines",
    "Non-Alcoholic Drinks": "Non-Alcoholic Drinks",
    "Urban Legends": "Urban Legends",
    Desserts: "Desserts",
  },
  ru: {
    Food: "Еда",
    Cocktails: "Коктейли",
    "Beers, Spirits & Wines": "Пиво, Крепкий алкоголь и Вино",
    "Non-Alcoholic Drinks": "Безалкогольные напитки",
    "Urban Legends": "Городские легенды",
    Desserts: "Десерты",
  },
};

export const menuItemTranslations: Record<
  string,
  Partial<Record<Language, MenuItemTranslation>>
> = {
  "1": {
    en: {
      name: "Classic Burger",
      description:
        "Angus beef patty, lettuce, tomato, pickles, special sauce on a brioche bun",
    },
    ru: {
      name: "Классический бургер",
      description:
        "Котлета из говядины ангус, салат, помидор, маринованные огурцы, фирменный соус на булочке бриошь",
    },
  },
  "2": {
    en: {
      name: "Caesar Salad",
      description: "Crisp romaine, parmesan, croutons, classic caesar dressing",
    },
    ru: {
      name: "Салат Цезарь",
      description:
        "Хрустящий салат романо, пармезан, гренки, классический соус цезарь",
    },
  },
};

export const uiTranslations: Partial<Record<Language, Record<string, string>>> =
  {
    ka: {
      search: "მენიუს ძიება...",
      addToOrder: "დაამატეთ შეკვეთაში",
      addToCart: "კალათაში დამატება",
      update: "შეცვლა",
      viewCart: "შეკვეთის ნახვა",
      cart: "კალათა",
      yourOrder: "თქვენი შეკვეთა",
      emptyCart: "თქვენი კალათა ცარიელია",
      emptyCartDescription: "დაიწყეთ მენიუდან კერძების დამატება",
      total: "სულ",
      checkout: "გადახდა",
      addedToOrder: "დაემატა შეკვეთას",
      items: "ერთეული",
      item: "ერთეული",
      required: "აუცილებელია",
      currencyWarningTitle: "ყურადღება!",
      currencyWarningMessage:
        "თუ თქვენ აირჩევთ ვალუტას, რომელიც განსხვავდება დაწესებულების ვალუტისგან, ნაჩვენები ფასები გამოითვლება მიმდინარე კურსით, მაგრამ გადახდას მაინც დაწესებულების ვალუტაში განახორციელებთ!",
      ok: "კარგი",
    },
    en: {
      search: "Search menu...",
      addToOrder: "Add to Order",
      addToCart: "Add to Cart",
      update: "Update",
      viewCart: "View Order",
      cart: "Cart",
      yourOrder: "Your Order",
      emptyCart: "Your cart is empty",
      emptyCartDescription: "Add items from the menu to get started",
      total: "Total",
      checkout: "Checkout",
      addedToOrder: "Added to order",
      items: "items",
      item: "item",
      required: "Required",
      currencyWarningTitle: "Attention!",
      currencyWarningMessage:
        "If you choose a currency different from the venue's currency, the prices shown to you will be calculated at the current exchange rate, but you will still pay in the venue's currency!",
      ok: "OK",
    },
    ru: {
      search: "Поиск в меню...",
      addToOrder: "Добавить в заказ",
      addToCart: "Добавить в корзину",
      update: "Изменить",
      viewCart: "Посмотреть заказ",
      cart: "Корзина",
      yourOrder: "Ваш заказ",
      emptyCart: "Ваша корзина пуста",
      emptyCartDescription: "Добавьте блюда из меню, чтобы начать",
      total: "Итого",
      checkout: "Оформить заказ",
      addedToOrder: "Добавлено в заказ",
      items: "позиций",
      item: "позиция",
      required: "Обязательно",
      currencyWarningTitle: "Внимание!",
      currencyWarningMessage:
        "Если Вы выбираете валюту отличную от валюты заведения, показываемые Вам цены будут рассчитаны по текущему курсу, но оплату Вы будете производить всё равно в валюте заведения!",
      ok: "ОК",
    },
  };

export function getTranslatedCategory(
  category: string,
  language: Language
): string {
  return (
    categoryTranslations[language]?.[category] ||
    categoryTranslations.en?.[category] ||
    category
  );
}

export function getTranslatedMenuItem(
  itemId: string,
  language: Language
): MenuItemTranslation | undefined {
  return (
    menuItemTranslations[itemId]?.[language] || menuItemTranslations[itemId]?.en
  );
}

export function getUITranslation(
  key: string,
  language: Language,
  params?: Record<string, string | number>
): string {
  let translation =
    uiTranslations[language]?.[key] || uiTranslations.en?.[key] || key;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      translation = translation.replace(`{{${key}}}`, String(value));
    });
  }

  return translation;
}

export type Languages = Language;

export const translations = uiTranslations;
