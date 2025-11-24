import { List, Check, CaretUp, CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LanguageSelector } from "@/components/LanguageSelector";
import { GridViewToggle, type GridColumns } from "@/components/GridViewToggle";
import type { Language } from "@/lib/translations";
import { getUITranslation } from "@/lib/translations";
import type { Currency, CurrencyInfo } from "@/lib/currency";
import { currencies } from "@/lib/currency";
import { useState, useEffect, useRef } from "react";

interface SettingsMenuProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  gridColumns: GridColumns;
  onGridColumnsChange: (columns: GridColumns) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  convertPrices: boolean;
  onConvertPricesChange: (convert: boolean) => void;
}

export function SettingsMenu({
  language,
  onLanguageChange,
  gridColumns,
  onGridColumnsChange,
  currency,
  onCurrencyChange,
}: SettingsMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCurrencyWarning, setShowCurrencyWarning] = useState(false);
  const [pendingCurrency, setPendingCurrency] = useState<Currency | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currencyList = Object.values(currencies) as CurrencyInfo[];

  // Check scroll position for currency list
  const checkScroll = () => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    if (viewport) {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      setCanScrollUp(scrollTop > 1);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
    }
  };

  useEffect(() => {
    if (!isCurrencyOpen) return;

    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    if (viewport) {
      viewport.addEventListener("scroll", checkScroll);
      setTimeout(checkScroll, 100);
      return () => viewport.removeEventListener("scroll", checkScroll);
    }
  }, [isCurrencyOpen]);

  const handleScrollUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    viewport?.scrollBy({ top: -100, behavior: "smooth" });
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    viewport?.scrollBy({ top: 100, behavior: "smooth" });
  };

  // Auto-collapse after 20 seconds of inactivity
  useEffect(() => {
    if (isMenuOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsMenuOpen(false);
      }, 20000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isMenuOpen]);

  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (lang: Language) => {
    onLanguageChange(lang);
    setIsMenuOpen(false);
  };

  const handleLanguageOpenChange = (open: boolean) => {
    setIsLanguageOpen(open);
    if (open) {
      setIsCurrencyOpen(false);
    }
  };

  const handleCurrencyOpenChange = (open: boolean) => {
    setIsCurrencyOpen(open);
    if (open) {
      setIsLanguageOpen(false);
    }
  };

  const handleCurrencyChange = (curr: Currency) => {
    setPendingCurrency(curr);
    setShowCurrencyWarning(true);
  };

  const confirmCurrencyChange = () => {
    if (pendingCurrency) {
      onCurrencyChange(pendingCurrency);
      setShowCurrencyWarning(false);
      setIsMenuOpen(false);
      setPendingCurrency(null);
    }
  };

  const handleGridColumnsChange = (cols: GridColumns) => {
    onGridColumnsChange(cols);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white hover:bg-white/90 shadow-lg border-2 border-neutral-200"
            onClick={handleMenuButtonClick}
          >
            <List size={24} weight="bold" className="text-neutral-800" />
          </Button>

          {isMenuOpen && (
            <div className="flex items-center gap-2">
              <div className="bg-white backdrop-blur-sm rounded-full shadow-sm">
                <DropdownMenu
                  open={isCurrencyOpen}
                  onOpenChange={handleCurrencyOpenChange}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 px-3 text-foreground hover:bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <span className="font-semibold text-lg">
                        {currencies[currency].symbol}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] p-0">
                    <div className="relative">
                      {/* Top scroll indicator */}
                      {canScrollUp && (
                        <button
                          onClick={handleScrollUp}
                          className="absolute top-0 left-0 right-0 h-7 bg-background/98 backdrop-blur-sm border-b border-border/50 z-20 flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-all group shadow-sm"
                        >
                          <CaretUp
                            weight="bold"
                            className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
                          />
                        </button>
                      )}

                      <ScrollArea className="h-[300px]" ref={scrollAreaRef}>
                        <div
                          className={`p-1 ${canScrollUp ? "pt-10" : "pt-2"} ${canScrollDown ? "pb-10" : "pb-2"}`}
                        >
                          {currencyList.map((curr: CurrencyInfo) => (
                            <DropdownMenuItem
                              key={curr.code}
                              onClick={() => handleCurrencyChange(curr.code)}
                            >
                              <Check
                                size={16}
                                weight="bold"
                                className={
                                  currency === curr.code
                                    ? "mr-2"
                                    : "mr-2 opacity-0"
                                }
                              />
                              {curr.symbol} {curr.code}
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </ScrollArea>

                      {/* Bottom scroll indicator */}
                      {canScrollDown && (
                        <button
                          onClick={handleScrollDown}
                          className="absolute bottom-0 left-0 right-0 h-7 bg-background/98 backdrop-blur-sm border-t border-border/50 z-20 flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-all group shadow-sm"
                        >
                          <CaretDown
                            weight="bold"
                            className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
                          />
                        </button>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="bg-white backdrop-blur-sm rounded-full shadow-sm px-2">
                <GridViewToggle
                  value={gridColumns}
                  onChange={handleGridColumnsChange}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white backdrop-blur-sm rounded-full shadow-sm">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
            isOpen={isLanguageOpen}
            onOpenChange={handleLanguageOpenChange}
          />
        </div>
      </div>

      <Dialog open={showCurrencyWarning} onOpenChange={setShowCurrencyWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {getUITranslation("currencyWarningTitle", language)}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {getUITranslation("currencyWarningMessage", language)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={confirmCurrencyChange}
              style={{ backgroundColor: "#0EA5E9" }}
              className="text-white hover:opacity-90 w-full"
            >
              {getUITranslation("ok", language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
