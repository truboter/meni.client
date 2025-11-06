import { CurrencyCircleDollar, List, Check } from "@phosphor-icons/react";
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
  const timeoutRef = useRef<number | null>(null);
  const currencyList = Object.values(currencies) as CurrencyInfo[];

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
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            <div className="bg-white backdrop-blur-sm rounded-full shadow-sm">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <CurrencyCircleDollar size={20} weight="bold" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {currencyList.map((curr: CurrencyInfo) => (
                    <DropdownMenuItem
                      key={curr.code}
                      onClick={() => handleCurrencyChange(curr.code)}
                    >
                      <Check
                        size={16}
                        weight="bold"
                        className={
                          currency === curr.code ? "mr-2" : "mr-2 opacity-0"
                        }
                      />
                      {curr.symbol} {curr.code}
                    </DropdownMenuItem>
                  ))}
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
