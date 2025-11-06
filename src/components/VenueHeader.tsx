import type { VenueInfo } from "@/lib/types";
import type { Language } from "@/lib/translations";
import type { Currency } from "@/lib/currency";
import { SettingsMenu } from "@/components/SettingsMenu";
import type { GridColumns } from "@/components/GridViewToggle";

interface VenueHeaderProps {
  venue?: VenueInfo;
  children?: React.ReactNode;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  gridColumns: GridColumns;
  onGridColumnsChange: (columns: GridColumns) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  convertPrices: boolean;
  onConvertPricesChange: (convert: boolean) => void;
}

export function VenueHeader({
  venue,
  children,
  currentLanguage,
  onLanguageChange,
  gridColumns,
  onGridColumnsChange,
  currency,
  onCurrencyChange,
  convertPrices,
  onConvertPricesChange,
}: VenueHeaderProps) {
  if (!venue) {
    return null;
  }

  return (
    <div className="relative">
      {/* Banner Image */}
      <div
        className="h-48 md:h-64 bg-cover bg-gray-200 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${venue.bannerImage})`,
          backgroundPosition: "center calc(50% + 50%)",
        }}
      >
        {/* Settings Menu in top-left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-40">
          <SettingsMenu
            language={currentLanguage}
            onLanguageChange={onLanguageChange}
            gridColumns={gridColumns}
            onGridColumnsChange={onGridColumnsChange}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            convertPrices={convertPrices}
            onConvertPricesChange={onConvertPricesChange}
          />
        </div>
        {/* Logo positioned at bottom */}
        <div className="absolute bottom-0 left-4 md:left-6">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white shrink-0 -mb-14 md:-mb-18 relative z-20">
            <img
              src={venue.logoImage}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Venue Info below banner, next to logo */}
      <div className="relative px-4 md:px-6 pt-2 pb-2">
        <div className="flex items-start justify-between ml-32 md:ml-40">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {venue.name}
            </h1>
          </div>

          {/* Action buttons area */}
          {children && (
            <div className="flex items-center gap-2">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
