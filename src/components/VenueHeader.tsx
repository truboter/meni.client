import type { VenueInfo } from '@/lib/types'
import type { Language } from '@/lib/translations'
import type { Currency } from '@/lib/currency'
import { SettingsMenu } from '@/components/SettingsMenu'
import type { GridColumns } from '@/components/GridViewToggle'

interface VenueHeaderProps {
  venue?: VenueInfo
  children?: React.ReactNode
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  gridColumns: GridColumns
  onGridColumnsChange: (columns: GridColumns) => void
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
  convertPrices: boolean
  onConvertPricesChange: (convert: boolean) => void
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
  onConvertPricesChange
}: VenueHeaderProps) {
  if (!venue) {
    return null;
  }

  return (
    <div className="relative">
      {/* Banner Image */}
      <div 
        className="h-48 md:h-64 bg-cover bg-center bg-gray-200 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${venue.bannerImage})`
        }}
      >
        {/* Settings Menu in top-left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
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
        {/* Overlay content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 md:px-6 pb-6">
            <div className="flex items-end gap-4">
              {/* Logo */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white flex-shrink-0">
                <img
                  src={venue.logoImage}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Venue Info */}
              <div className="flex-1 text-white">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                  {venue.name}
                </h1>
                <p className="text-sm md:text-base opacity-90">
                  {venue.subtitle}
                </p>
              </div>
              
              {/* Action buttons area */}
              {children && (
                <div className="flex items-end gap-2">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}