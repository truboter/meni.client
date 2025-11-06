import { useState } from "react";
import { VenueHeader } from "./components/VenueHeader";
import { CategoryChips } from "./components/CategoryChips";
import { MenuGrid } from "./components/MenuGrid";
import { CartBar } from "./components/CartBar";
import { MenuItemDialog } from "./components/MenuItemDialog";
import { FlyToCartAnimation } from "./components/FlyToCartAnimation";
import { restaurantData, venueInfo } from "./lib/data";
import { translations, type Language } from "./lib/translations";
import { type Currency } from "./lib/currency";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import type { CartItem, MenuItem } from "./lib/types";
import type { GridColumns } from "./components/GridViewToggle";
import "./index.css";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [language, setLanguage] = useState<Language>("ka");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [gridColumns, setGridColumns] = useState<GridColumns>(3);
  const [convertPrices, setConvertPrices] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [animatingElement, setAnimatingElement] = useState<{
    element: HTMLElement;
    imageUrl: string;
  } | null>(null);

  const t = translations[language];

  const handleItemClick = (item: MenuItem) => {
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
      // Check if exact same item with same modifiers exists
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

    toast.success(t.addedToOrder);
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

  const handleAnimationStart = (element: HTMLElement, imageUrl: string) => {
    setAnimatingElement({ element, imageUrl });
  };

  const handleAnimationComplete = () => {
    setAnimatingElement(null);
  };

  const handleUpdateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
  };

  const filteredItems =
    selectedCategory === "all"
      ? restaurantData.menuItems
      : restaurantData.menuItems.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <VenueHeader
          venue={venueInfo}
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
          categories={restaurantData.categories}
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
        onClose={() => setIsDialogOpen(false)}
        onAddToCart={handleAddToCart}
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        convertPrices={convertPrices}
      />

      <CartBar
        items={cart}
        onUpdateCart={handleUpdateCart}
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
