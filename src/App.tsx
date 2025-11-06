import { useState } from 'react';
import { VenueHeader } from './components/VenueHeader';
import { CategoryChips } from './components/CategoryChips';
import { MenuGrid } from './components/MenuGrid';
import { LanguageSelector } from './components/LanguageSelector';
import { CartBar } from './components/CartBar';
import { Badge } from './components/ui/badge';
import { restaurantData, venueInfo } from './lib/data';
import { translations, Languages } from './lib/translations';
import { convertPrice, currencySymbol, CurrencyCode } from './lib/currency';
import { Toaster } from './components/ui/sonner';
import type { CartItem, MenuItem } from './lib/types';
import type { GridColumns } from './components/GridViewToggle';
import './index.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [language, setLanguage] = useState<Languages>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [gridColumns, setGridColumns] = useState<GridColumns>(3);
  const [convertPrices, setConvertPrices] = useState<boolean>(false);

  const t = translations[language];

  const handleQuickAdd = (item: MenuItem) => {
    const totalPrice = item.price

    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (cartItem) => cartItem.menuItem.id === item.id && Object.keys(cartItem.selectedModifiers).length === 0
      )

      if (existingIndex >= 0) {
        const updated = [...currentCart]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
          totalPrice: updated[existingIndex].totalPrice + totalPrice
        }
        return updated
      } else {
        return [
          ...currentCart,
          {
            menuItem: item,
            quantity: 1,
            selectedModifiers: {},
            totalPrice
          }
        ]
      }
    })
  }

  const handleUpdateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart)
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
  };

  const filteredItems = selectedCategory === 'all' 
    ? restaurantData.menuItems 
    : restaurantData.menuItems.filter(item => item.category === selectedCategory);

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
        <div className="px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CategoryChips
              categories={restaurantData.categories}
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="flex items-center gap-4">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              
              {getTotalItems() > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {getTotalItems()} {t.items} • {currencySymbol[currency]}{getTotalPrice().toFixed(2)}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="px-4 pb-8">
          <MenuGrid
            items={filteredItems}
            onItemClick={(item) => console.log('Item clicked:', item)}
            onQuickAdd={handleQuickAdd}
            currency={currency}
            convertPrices={convertPrices}
            columns={gridColumns}
          />
        </div>
      </div>
      
      <CartBar 
        items={cart}
        onUpdateCart={handleUpdateCart}
        language={language}
        currency={currency}
        convertPrices={convertPrices}
      />
      
      <Toaster />
    </div>
  );
}
