export type Language =
  | "ka" // Georgian (default)
  | "en" // English
  | "zh" // Chinese
  | "hi" // Hindi
  | "es" // Spanish
  | "fr" // French
  | "ar" // Arabic
  | "bn" // Bengali
  | "ru" // Russian
  | "pt" // Portuguese
  | "id" // Indonesian
  | "de" // German
  | "ja" // Japanese
  | "tr" // Turkish
  | "ko" // Korean
  | "vi" // Vietnamese
  | "it" // Italian
  | "pl" // Polish
  | "uk" // Ukrainian
  | "fa" // Persian
  | "he" // Hebrew
  | "hy" // Armenian
  | "az" // Azerbaijani
  | "kk" // Kazakh
  | "uz"; // Uzbek

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: LanguageInfo[] = [
  // Main languages
  { code: "ka", name: "Georgian", nativeName: "ქართული", flag: "🇬🇪" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },

  // Top-20 world languages
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
  },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷" },

  // Regional (tourist) languages
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱" },
  { code: "hy", name: "Armenian", nativeName: "Հայերեն", flag: "🇦🇲" },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan", flag: "🇦🇿" },
  { code: "kk", name: "Kazakh", nativeName: "Қазақша", flag: "🇰🇿" },
  { code: "uz", name: "Uzbek", nativeName: "Oʻzbek", flag: "🇺🇿" },
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
