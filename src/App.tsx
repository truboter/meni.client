import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VenueHeader } from "./components/VenueHeader";
import { CategoryChips } from "./components/CategoryChips";
import { MenuGrid } from "./components/MenuGrid";
import { CartBar } from "./components/CartBar";
import { MenuItemDialog } from "./components/MenuItemDialog";
import { FlyToCartAnimation } from "./components/FlyToCartAnimation";
import { restaurantData, venueInfo } from "./lib/data";
import { type Language } from "./lib/translations";
import { type Currency } from "./lib/currency";
import { Toaster } from "./components/ui/sonner";
import type { CartItem, MenuItem, LocationData } from "./lib/types";
import type { GridColumns } from "./components/GridViewToggle";
import {
  fetchLocationData,
  convertLocationDataToMenuItems,
  extractCategories,
} from "./lib/locationService";
import "./index.css";

export default function App() {
  const { locationId: urlLocationId, lang: urlLang } = useParams<{ locationId: string; lang: string }>();
  
  // Get locationId from URL path or subdomain
  const getLocationId = (): string | undefined => {
    // First, check URL parameter
    if (urlLocationId) {
      return urlLocationId;
    }
    
    // Then check subdomain (e.g., lnc2w74z.meni.ge)
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    // Check if it's a subdomain of meni.ge
    if (parts.length >= 3 && parts[parts.length - 2] === 'meni' && parts[parts.length - 1] === 'ge') {
      return parts[0]; // Return subdomain as locationId
    }
    
    return undefined;
  };
  
  // Get language from URL path (e.g., /en, /ru)
  const getLanguageFromUrl = (): Language => {
    // Check URL parameter first (e.g., /lnc2w74z/ru or just /ru)
    if (urlLang && urlLang.length === 2) {
      return urlLang as Language;
    }
    
    // Default to Georgian
    return "ka";
  };
  
  const locationId = getLocationId();
  const initialLanguage = getLanguageFromUrl();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [currency, setCurrency] = useState<Currency>("GEL");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [gridColumns, setGridColumns] = useState<GridColumns>(3);
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
          onGridColumnsChange={setGridColumns}
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
      />

      {animatingElement && (
        <FlyToCartAnimation
          startElement={animatingElement.element}
          imageUrl={animatingElement.imageUrl}
          onComplete={handleAnimationComplete}
        />
      )}

      <Toaster />
    </div>
  );
}
