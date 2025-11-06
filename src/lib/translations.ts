export type Language = "en" | "ru";

export interface MenuItemTranslation {
  name: string;
  description: string;
}

export interface ModifierTranslation {
  name: string;
  options: { [optionId: string]: string };
}

export const categoryTranslations: Record<Language, Record<string, string>> = {
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
  Record<Language, MenuItemTranslation>
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

export const uiTranslations: Record<Language, Record<string, string>> = {
  en: {
    search: "Search menu...",
    addToOrder: "Add to Order",
    addToCart: "Add to Cart",
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
  return categoryTranslations[language][category] || category;
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
    uiTranslations[language][key] || uiTranslations.en[key] || key;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      translation = translation.replace(`{{${key}}}`, String(value));
    });
  }

  return translation;
}

export type Languages = Language;

export const translations = uiTranslations;
