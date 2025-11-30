import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VenueHeader } from "./components/VenueHeader";
import { CategoryChips } from "./components/CategoryChips";
import { MenuGrid } from "./components/MenuGrid";
import { CartBar } from "./components/CartBar";
import { MenuItemDialog } from "./components/MenuItemDialog";
import { FlyToCartAnimation } from "./components/FlyToCartAnimation";
import { restaurantData, venueInfo } from "./lib/data";
import { type Language, getUITranslation } from "./lib/translations";
import { type Currency } from "./lib/currency";
import { Toaster } from "./components/ui/sonner";
import type { CartItem, MenuItem, LocationData } from "./lib/types";
import type { GridColumns } from "./components/GridViewToggle";
import {
  fetchLocationData,
  convertLocationDataToMenuItems,
  extractCategories,
} from "./lib/locationService";
import { saveOrder, loadOrder } from "./lib/orderService";
import "./index.css";

const LANGUAGE_STORAGE_KEY = "meni_preferred_language";
const GRID_COLUMNS_STORAGE_KEY = "meni_grid_columns";
const ORDER_ID_STORAGE_KEY = "meni_order_id";

// Generate a unique order ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
};

// Get or create order ID
const getOrderId = (): string => {
  const existingOrderId = localStorage.getItem(ORDER_ID_STORAGE_KEY);
  if (existingOrderId) {
    return existingOrderId;
  }

  const newOrderId = generateOrderId();
  localStorage.setItem(ORDER_ID_STORAGE_KEY, newOrderId);
  return newOrderId;
};

// Determine optimal grid columns based on screen width
const getOptimalGridColumns = (): GridColumns => {
  // Check localStorage first
  const savedColumns = localStorage.getItem(GRID_COLUMNS_STORAGE_KEY);
  if (savedColumns) {
    const parsed = parseInt(savedColumns, 10);
    if ([1, 2, 3].includes(parsed)) {
      return parsed as GridColumns;
    }
  }

  // Determine based on screen width
  const width = window.innerWidth;

  // Mobile devices (< 640px) - 1 column
  if (width < 640) {
    return 1;
  }
  // Tablets and small laptops (640px - 1024px) - 2 columns
  else if (width < 1024) {
    return 2;
  }
  // Desktop and larger (>= 1024px) - 3 columns
  else {
    return 3;
  }
};

export default function App() {
  const { locationId: urlLocationId, lang: urlLang } = useParams<{
    locationId: string;
    lang: string;
  }>();
  const navigate = useNavigate();

  // Get locationId from URL path or subdomain
  const getLocationId = (): string | undefined => {
    // First, check URL parameter
    if (urlLocationId) {
      return urlLocationId;
    }

    // Then check subdomain (e.g., lnc2w74z.meni.ge)
    const hostname = window.location.hostname;
    const parts = hostname.split(".");

    // Check if it's a subdomain of meni.ge
    if (
      parts.length >= 3 &&
      parts[parts.length - 2] === "meni" &&
      parts[parts.length - 1] === "ge"
    ) {
      return parts[0]; // Return subdomain as locationId
    }

    return undefined;
  };

  // Get language from URL path or localStorage
  const getInitialLanguage = (): Language => {
    // Check URL parameter first (e.g., /lnc2w74z/ru or just /ru)
    if (urlLang && urlLang.length === 2) {
      return urlLang as Language;
    }

    // Check localStorage
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && savedLanguage.length === 2) {
      return savedLanguage as Language;
    }

    // Default to Georgian
    return "ka";
  };

  const locationId = getLocationId();
  const initialLanguage = getInitialLanguage();

  const [orderId] = useState<string>(() => getOrderId());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [currency, setCurrency] = useState<Currency>("GEL");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [gridColumns, setGridColumns] = useState<GridColumns>(
    getOptimalGridColumns()
  );
  const [convertPrices, setConvertPrices] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCartIndex, setEditingCartIndex] = useState<number | null>(null);
  const [animatingElement, setAnimatingElement] = useState<{
    element: HTMLElement;
    imageUrl: string;
  } | null>(null);

  // State for location data
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Check if location is in subdomain (not in URL path)
  const isLocationInSubdomain = (): boolean => {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    return (
      parts.length >= 3 &&
      parts[parts.length - 2] === "meni" &&
      parts[parts.length - 1] === "ge"
    );
  };

  // Initialize order ID on app load and restore cart
  useEffect(() => {
    console.log("Order ID:", orderId);

    // Load saved order from S3/localStorage
    loadOrder(orderId)
      .then((savedOrder) => {
        if (savedOrder && savedOrder.items.length > 0) {
          setCart(savedOrder.items);
          console.log(
            "Order restored from storage:",
            savedOrder.items.length,
            "items"
          );
        }
      })
      .catch((error) => {
        console.error("Failed to load saved order:", error);
      });
  }, [orderId]);

  // Save cart to S3 when it changes
  useEffect(() => {
    if (cart.length > 0) {
      saveOrder(orderId, cart).catch((error) => {
        console.error("Failed to save order to S3:", error);
      });
    }
  }, [cart, orderId]);

  // Update URL when language changes
  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

    // Update URL if language is different from URL parameter
    if (language !== urlLang) {
      // If location is in subdomain, don't include it in path
      if (isLocationInSubdomain()) {
        navigate(`/${language}`, { replace: true });
      } else if (locationId) {
        navigate(`/${locationId}/${language}`, { replace: true });
      } else {
        navigate(`/${language}`, { replace: true });
      }
    }
  }, [language, locationId, urlLang, navigate]);

  // Fetch location data when locationId or language changes
  useEffect(() => {
    if (!locationId) {
      // Use default data if no locationId
      setMenuItems(restaurantData.menuItems);
      setCategories(restaurantData.categories);
      return;
    }

    const loadLocationData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchLocationData(locationId, language);
        setLocationData(data);

        const items = convertLocationDataToMenuItems(data);
        const cats = extractCategories(data);

        setMenuItems(items);
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load location data:", err);
        setError("Failed to load menu data. Please try again later.");
        // Fallback to default data
        setMenuItems(restaurantData.menuItems);
        setCategories(restaurantData.categories);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocationData();
  }, [locationId, language]);

  const handleItemClick = (item: MenuItem) => {
    setEditingCartIndex(null);
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedModifiers: Record<string, string[]>
  ) => {
    let totalPrice = item.price * quantity;

    // Calculate modifier prices
    item.modifiers?.forEach((group) => {
      const selectedIds = selectedModifiers[group.id] || [];
      selectedIds.forEach((optionId) => {
        const option = group.options.find((o) => o.id === optionId);
        if (option && option.price > 0) {
          totalPrice += option.price * quantity;
        }
      });
    });

    setCart((currentCart) => {
      // Если редактируем существующий элемент
      if (editingCartIndex !== null) {
        const updated = [...currentCart];
        updated[editingCartIndex] = {
          menuItem: item,
          quantity,
          selectedModifiers,
          totalPrice,
        };
        return updated;
      }

      // Если добавляем новый - проверяем дубликат
      const existingIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.menuItem.id === item.id &&
          JSON.stringify(cartItem.selectedModifiers) ===
            JSON.stringify(selectedModifiers)
      );

      if (existingIndex >= 0) {
        const updated = [...currentCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          totalPrice: updated[existingIndex].totalPrice + totalPrice,
        };
        return updated;
      } else {
        return [
          ...currentCart,
          {
            menuItem: item,
            quantity,
            selectedModifiers,
            totalPrice,
          },
        ];
      }
    });

    setEditingCartIndex(null);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const totalPrice = item.price;

    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.menuItem.id === item.id &&
          Object.keys(cartItem.selectedModifiers).length === 0
      );

      if (existingIndex >= 0) {
        const updated = [...currentCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
          totalPrice: updated[existingIndex].totalPrice + totalPrice,
        };
        return updated;
      } else {
        return [
          ...currentCart,
          {
            menuItem: item,
            quantity: 1,
            selectedModifiers: {},
            totalPrice,
          },
        ];
      }
    });
  };

  const handleQuickRemove = (item: MenuItem) => {
    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.menuItem.id === item.id &&
          Object.keys(cartItem.selectedModifiers).length === 0
      );

      if (existingIndex >= 0) {
        const updated = [...currentCart];
        const currentQuantity = updated[existingIndex].quantity;

        if (currentQuantity > 1) {
          // Уменьшаем количество
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: currentQuantity - 1,
            totalPrice: updated[existingIndex].totalPrice - item.price,
          };
          return updated;
        } else {
          // Удаляем из корзины
          return updated.filter((_, index) => index !== existingIndex);
        }
      }

      return currentCart;
    });
  };

  const handleAnimationStart = (element: HTMLElement, imageUrl: string) => {
    setAnimatingElement({ element, imageUrl });
  };

  const handleAnimationComplete = () => {
    setAnimatingElement(null);
  };

  const handleGridColumnsChange = (columns: GridColumns) => {
    setGridColumns(columns);
    localStorage.setItem(GRID_COLUMNS_STORAGE_KEY, columns.toString());
  };

  const handleUpdateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
  };

  const handleCartItemClick = (cartItem: CartItem) => {
    // Найти индекс этого элемента в корзине
    const index = cart.findIndex(
      (item) =>
        item.menuItem.id === cartItem.menuItem.id &&
        JSON.stringify(item.selectedModifiers) ===
          JSON.stringify(cartItem.selectedModifiers)
    );
    setEditingCartIndex(index);
    setSelectedItem(cartItem.menuItem);
    setIsDialogOpen(true);
  };

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !menuItems.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <VenueHeader
          venue={{
            ...venueInfo,
            name: locationData?.locationName || venueInfo.name,
          }}
          currentLanguage={language}
          onLanguageChange={setLanguage}
          gridColumns={gridColumns}
          onGridColumnsChange={handleGridColumnsChange}
          currency={currency}
          onCurrencyChange={setCurrency}
          convertPrices={convertPrices}
          onConvertPricesChange={setConvertPrices}
        />

        {/* Controls */}
        <CategoryChips
          categories={categories}
          activeCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          language={language}
        />

        {/* Menu */}
        <div className="px-4 pb-8">
          <MenuGrid
            items={filteredItems}
            onItemClick={handleItemClick}
            onQuickAdd={handleQuickAdd}
            onQuickRemove={handleQuickRemove}
            cart={cart}
            onAnimationStart={handleAnimationStart}
            currency={currency}
            convertPrices={convertPrices}
            columns={gridColumns}
          />
        </div>
      </div>

      <MenuItemDialog
        item={selectedItem}
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingCartIndex(null);
        }}
        onAddToCart={handleAddToCart}
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        convertPrices={convertPrices}
        editMode={editingCartIndex !== null}
        initialQuantity={
          editingCartIndex !== null ? cart[editingCartIndex]?.quantity : 1
        }
        initialModifiers={
          editingCartIndex !== null
            ? cart[editingCartIndex]?.selectedModifiers
            : {}
        }
      />

      <CartBar
        items={cart}
        onUpdateCart={handleUpdateCart}
        onItemClick={handleCartItemClick}
        language={language}
        currency={currency}
        convertPrices={convertPrices}
        orderId={orderId}
        menuItems={menuItems}
      />

      {animatingElement && (
        <FlyToCartAnimation
          startElement={animatingElement.element}
          imageUrl={animatingElement.imageUrl}
          onComplete={handleAnimationComplete}
        />
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "white",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
          },
        }}
      />

      {/* Footer */}
      <footer className="pb-6 pt-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            {getUITranslation("poweredBy", language)}{" "}
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
  );
}
