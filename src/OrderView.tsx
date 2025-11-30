import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LanguageSelector } from "./components/LanguageSelector";
import { type Language } from "./lib/translations";
import { type Currency } from "./lib/currency";
import { Toaster } from "./components/ui/sonner";
import type { CartItem, MenuItem } from "./lib/types";
import { loadOrder } from "./lib/orderService";
import {
  fetchLocationData,
  convertLocationDataToMenuItems,
} from "./lib/locationService";
import "./index.css";

const ORDER_VIEW_LANGUAGE_STORAGE_KEY = "meni_order_view_language";

export default function OrderView() {
  const params = useParams<{
    param1?: string;
    param2?: string;
    param3?: string;
  }>();

  // Determine which params are which
  // Three params: /:locationId/:lang/:orderId
  // Two params: /:lang/:orderId (when lang is valid 2-letter code and param2 has dash)
  const getParams = () => {
    const { param1, param2, param3 } = params;

    if (param3) {
      // /:locationId/:lang/:orderId
      return {
        locationId: param1,
        lang: param2,
        orderId: param3,
      };
    } else if (param1 && param2) {
      // /:lang/:orderId
      return {
        locationId: undefined,
        lang: param1,
        orderId: param2,
      };
    }

    return {
      locationId: undefined,
      lang: undefined,
      orderId: undefined,
    };
  };

  const { locationId: urlLocationId, lang: urlLang, orderId } = getParams();

  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem(ORDER_VIEW_LANGUAGE_STORAGE_KEY);
    if (savedLang && ["ka", "en", "ru"].includes(savedLang)) {
      return savedLang as Language;
    }
    return (urlLang as Language) || "ru";
  });

  const [currency] = useState<Currency>("GEL");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function for price conversion
  const convertPrice = (price: number) => price;

  // Load order data
  useEffect(() => {
    const loadOrderData = async () => {
      if (!orderId) return;

      try {
        setIsLoading(true);

        // Get locationId from subdomain if not in URL
        const getLocationId = (): string | undefined => {
          if (urlLocationId) return urlLocationId;

          const hostname = window.location.hostname;
          const parts = hostname.split(".");
          if (
            parts.length >= 3 &&
            parts[parts.length - 2] === "meni" &&
            parts[parts.length - 1] === "ge"
          ) {
            return parts[0];
          }
          return undefined;
        };

        const locationId = getLocationId();

        if (locationId) {
          // Load location data to get menu items
          const locationData = await fetchLocationData(
            locationId,
            language as Language
          );
          const items = convertLocationDataToMenuItems(locationData);
          setMenuItems(items);
        }

        // Load order from S3/localStorage
        const order = await loadOrder(orderId);
        if (order) {
          setCart(order.items);
        }
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrderData();
  }, [orderId, urlLocationId, language]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem(ORDER_VIEW_LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  // Get translated menu item name
  const getItemName = (item: CartItem) => {
    // Try to find the item in the loaded menuItems (which are in the selected language)
    const translatedItem = menuItems.find((mi) => mi.id === item.menuItem.id);
    if (translatedItem) {
      return translatedItem.name;
    }

    // Fallback to original name
    return item.menuItem.name;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Simple header with only language selector */}
      <div className="bg-white shadow-sm py-4 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            {language === "ru"
              ? "Просмотр заказа"
              : language === "ka"
                ? "შეკვეთის ნახვა"
                : "Order View"}
          </h1>
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4">
            {language === "ru"
              ? "ID заказа:"
              : language === "ka"
                ? "შეკვეთის ID:"
                : "Order ID:"}{" "}
            <span className="font-mono font-semibold">{orderId}</span>
          </p>

          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">
                {language === "ru"
                  ? "Заказ пуст или не найден"
                  : language === "ka"
                    ? "შეკვეთა ცარიელია ან ვერ მოიძებნა"
                    : "Order is empty or not found"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start py-4 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {getItemName(item)}
                    </h3>
                    {Object.entries(item.selectedModifiers).map(
                      ([group, selections]) =>
                        selections.length > 0 && (
                          <p key={group} className="text-sm text-gray-600 mt-1">
                            {group}: {selections.join(", ")}
                          </p>
                        )
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {language === "ru"
                        ? "Количество"
                        : language === "ka"
                          ? "რაოდენობა"
                          : "Quantity"}
                      : {item.quantity}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-800">
                      {convertPrice(item.totalPrice).toFixed(2)} {currency}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 mt-4 border-t-2">
                <span className="text-lg font-bold">
                  {language === "ru"
                    ? "Итого"
                    : language === "ka"
                      ? "სულ"
                      : "Total"}
                  :
                </span>
                <span className="text-xl font-bold text-sky-600">
                  {convertPrice(
                    cart.reduce((sum, item) => sum + item.totalPrice, 0)
                  ).toFixed(2)}{" "}
                  {currency}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pb-6 pt-4 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500">
              Powered by{" "}
              <a
                href="https://meni.ge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
              >
                meni.ge
              </a>
            </p>
          </div>
        </footer>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
