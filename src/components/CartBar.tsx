import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash, QrCode } from "@phosphor-icons/react";
import { QRCodeSVG } from "qrcode.react";
import type { CartItem } from "@/lib/types";
import type { Language } from "@/lib/translations";
import type { Currency } from "@/lib/currency";
import { formatPrice } from "@/lib/currency";
import { getUITranslation } from "@/lib/translations";

interface CartBarProps {
  items: CartItem[];
  onUpdateCart: (updatedCart: CartItem[]) => void;
  language: Language;
  currency: Currency;
  convertPrices: boolean;
  onItemClick?: (cartItem: CartItem) => void;
  orderId: string;
}

export function CartBar({
  items,
  onUpdateCart,
  language,
  currency,
  convertPrices,
  onItemClick,
  orderId,
}: CartBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showQrCode, setShowQrCode] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const isEmpty = items.length === 0;

  // Auto-collapse after 3 seconds of inactivity
  useEffect(() => {
    if (!isEmpty && isExpanded) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 3000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isExpanded, isEmpty]);

  // Expand when items change (item added/removed)
  useEffect(() => {
    if (!isEmpty) {
      setIsExpanded(true);
    }
  }, [totalItems, isEmpty]);

  const handleCartButtonClick = () => {
    setIsOpen(true);
  };

  const handleQuantityChange = (index: number, delta: number) => {
    const updatedCart = [...items];
    const newQuantity = updatedCart[index].quantity + delta;

    if (newQuantity <= 0) {
      updatedCart.splice(index, 1);
    } else {
      const pricePerItem =
        updatedCart[index].totalPrice / updatedCart[index].quantity;
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: newQuantity,
        totalPrice: pricePerItem * newQuantity,
      };
    }

    onUpdateCart(updatedCart);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = items.filter((_, i) => i !== index);
    onUpdateCart(updatedCart);
  };

  const getModifierText = (cartItem: CartItem) => {
    const modifierTexts: string[] = [];

    cartItem.menuItem.modifiers?.forEach((group) => {
      const selectedIds = cartItem.selectedModifiers[group.id] || [];
      selectedIds.forEach((optionId) => {
        const option = group.options.find((o) => o.id === optionId);
        if (option) {
          modifierTexts.push(option.name);
        }
      });
    });

    return modifierTexts.length > 0 ? modifierTexts.join(", ") : null;
  };

  if (isEmpty) {
    return (
      <>
        <div className="fixed bottom-6 right-6 z-20">
          <Button
            data-cart-button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-xl bg-white! text-foreground hover:bg-gray-100"
            size="icon"
            variant="secondary"
          >
            <ShoppingCart size={24} weight="regular" />
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="h-[85vh] !bg-white">
            <SheetHeader>
              <SheetTitle className="text-2xl">
                {getUITranslation("yourOrder", language)}
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <ShoppingCart
                size={64}
                weight="thin"
                className="text-muted-foreground mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                {getUITranslation("emptyCart", language)}
              </h3>
              <p className="text-muted-foreground">
                {getUITranslation("emptyCartDescription", language)}
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 pb-safe pointer-events-none">
        <div className="pointer-events-auto max-w-4xl mx-auto">
          <Button
            data-cart-button
            onClick={handleCartButtonClick}
            style={{ backgroundColor: "#0EA5E9" }}
            className={`gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-white hover:opacity-90 has-[>svg]:px-4 h-14 text-base shadow-xl flex items-center px-6 ${
              isExpanded
                ? "w-full rounded-md justify-between"
                : "w-14 px-0 justify-center ml-auto rounded-full"
            }`}
            size="lg"
          >
            <div
              className={`flex items-center gap-3 ${isExpanded ? "" : "justify-center"}`}
            >
              <ShoppingCart size={24} weight="bold" />
              {isExpanded && (
                <span className="whitespace-nowrap">
                  {totalItems} {getUITranslation("items", language)}
                </span>
              )}
            </div>
            {isExpanded && (
              <span className="font-semibold whitespace-nowrap">
                {formatPrice(totalPrice, currency, convertPrices)}
              </span>
            )}
          </Button>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[85vh] !bg-white">
          <SheetHeader>
            <SheetTitle className="text-2xl flex items-center gap-2">
              {getUITranslation("yourOrder", language)}
              <button
                onClick={() => setShowQrCode(true)}
                className="p-1 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Show QR Code"
              >
                <QrCode size={24} weight="duotone" className="text-blue-600" />
              </button>
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[calc(85vh-200px)] mt-6">
            <div className="space-y-4 pr-4">
              {items.map((cartItem, index) => {
                const modifiers = getModifierText(cartItem);

                return (
                  <div key={index} className="space-y-2">
                    <div
                      className="flex gap-3 cursor-pointer hover:bg-secondary/50 p-2 -m-2 rounded-lg transition-colors"
                      onClick={() => onItemClick?.(cartItem)}
                    >
                      <img
                        src={cartItem.menuItem.image}
                        alt={cartItem.menuItem.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm">
                          {cartItem.menuItem.name}
                        </h4>
                        {modifiers && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {modifiers}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div
                            className="flex items-center gap-2 bg-secondary rounded-lg p-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              onClick={() => handleQuantityChange(index, -1)}
                            >
                              <Minus size={14} weight="bold" />
                            </Button>
                            <span className="text-sm font-semibold w-6 text-center">
                              {cartItem.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              onClick={() => handleQuantityChange(index, 1)}
                            >
                              <Plus size={14} weight="bold" />
                            </Button>
                          </div>
                          <div
                            className="flex items-center gap-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="font-semibold">
                              {formatPrice(
                                cartItem.totalPrice,
                                currency,
                                convertPrices
                              )}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleRemoveItem(index)}
                            >
                              <Trash size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && <Separator className="mt-4" />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">
                {getUITranslation("total", language)}
              </span>
              <span className="text-2xl font-bold">
                {formatPrice(totalPrice, currency, convertPrices)}
              </span>
            </div>
            <Button
              style={{ backgroundColor: "#0EA5E9" }}
              className="w-full h-14 px-6 rounded-md shadow-xl text-white hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none text-base font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-all flex items-center justify-between gap-2"
              size="lg"
            >
              <span className="flex items-center gap-3">
                {getUITranslation("checkout", language)}
              </span>
              <span className="font-semibold">
                {formatPrice(totalPrice, currency, convertPrices)}
              </span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent 
          className="max-w-full w-screen h-screen max-h-screen p-0 flex flex-col items-center justify-center bg-white [&>button]:hidden"
        >
          <div className="flex flex-col items-center justify-center gap-8 p-8">
            <DialogHeader className="sr-only">
              <DialogTitle>{getUITranslation("yourOrder", language)}</DialogTitle>
              <DialogDescription>
                {getUITranslation("scanQrCode", language) || "Scan this QR code to view your order"}
              </DialogDescription>
            </DialogHeader>
            <h2 className="text-3xl font-bold text-center">
              {getUITranslation("yourOrder", language)}
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <QRCodeSVG
                value={orderId}
                size={Math.min(window.innerWidth - 100, window.innerHeight - 250, 400)}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">{getUITranslation("orderId", language) || "Order ID"}</p>
              <p className="font-mono text-lg font-semibold text-gray-800">{orderId}</p>
            </div>
            <Button
              onClick={() => setShowQrCode(false)}
              className="mt-4 px-8 py-6 text-lg"
              size="lg"
            >
              {getUITranslation("close", language)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
