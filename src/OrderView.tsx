import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VenueHeader } from "./components/VenueHeader";
import { CartBar } from "./components/CartBar";
import { type Language } from "./lib/translations";
import { type Currency } from "./lib/currency";
import { Toaster } from "./components/ui/sonner";
import type { CartItem, MenuItem } from "./lib/types";
import { loadOrder } from "./lib/orderService";
import {
  fetchLocationData,
  convertLocationDataToMenuItems,
} from "./lib/locationService";
import { venueInfo } from "./lib/data";
import "./index.css";

const LANGUAGE_STORAGE_KEY = "meni_preferred_language";

export default function OrderView() {
  const {
    locationId: urlLocationId,
    lang: urlLang,
    orderId,
  } = useParams<{
    locationId: string;
    lang: string;
    orderId: string;
  }>();

  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLang && ["ka", "en", "ru"].includes(savedLang)) {
      return savedLang as Language;
    }
    return (urlLang as Language) || "ru";
  });

  const [currency] = useState<Currency>("GEL");
  const [convertPrices] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function for price conversion
  const convertPrice = (price: number) => price;

  // Load order data
  useEffect(() => {
    const loadOrderData = async () => {
      if (!orderId || !urlLocationId || !urlLang) return;

      try {
        setIsLoading(true);

        // Load location data to get menu items
        const locationData = await fetchLocationData(
          urlLocationId,
          urlLang as Language
        );
        const items = convertLocationDataToMenuItems(locationData);
        setMenuItems(items);

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
  }, [orderId, urlLocationId, urlLang]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
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
      <VenueHeader
        venue={venueInfo}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        currency={currency}
        onCurrencyChange={() => {}} // Read-only
        gridColumns={2}
        onGridColumnsChange={() => {}} // Not needed for order view
        convertPrices={false}
        onConvertPricesChange={() => {}}
        hideSettings={true} // Hide currency and grid settings
      />

      <div className="container mx-auto px-4 py-8 pb-32">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {language === "ru"
              ? "Просмотр заказа"
              : language === "ka"
                ? "შეკვეთის ნახვა"
                : "Order View"}
          </h1>
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
                      {item.menuItem.name}
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
      </div>

      <CartBar
        items={cart}
        onUpdateCart={() => {}} // Read-only
        onItemClick={() => {}} // Read-only
        language={language}
        currency={currency}
        convertPrices={convertPrices}
        orderId={orderId || ""}
        menuItems={menuItems}
        readOnly={true}
      />

      <Toaster position="top-center" />
    </div>
  );
}
