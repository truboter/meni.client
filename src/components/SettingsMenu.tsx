import { CurrencyCircleDollar, List, Check } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LanguageSelector } from '@/components/LanguageSelector'
import { GridViewToggle, type GridColumns } from '@/components/GridViewToggle'
import type { Language } from '@/lib/translations'
import type { Currency, CurrencyInfo } from '@/lib/currency'
import { currencies } from '@/lib/currency'
import { useState } from 'react'

interface SettingsMenuProps {
  language: Language
  onLanguageChange: (language: Language) => void
  gridColumns: GridColumns
  onGridColumnsChange: (columns: GridColumns) => void
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
  convertPrices: boolean
  onConvertPricesChange: (convert: boolean) => void
}

export function SettingsMenu({ 
  language, 
  onLanguageChange,
  gridColumns,
  onGridColumnsChange,
  currency,
  onCurrencyChange,
}: SettingsMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currencyList = Object.values(currencies) as CurrencyInfo[]

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full bg-white hover:bg-white/90 shadow-lg border-2 border-neutral-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <List size={24} weight="bold" className="text-neutral-800" />
      </Button>

      {isMenuOpen && (
        <div className="flex items-center gap-2">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />

          <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
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
                    onClick={() => onCurrencyChange(curr.code)}
                  >
                    <Check
                      size={16}
                      weight="bold"
                      className={currency === curr.code ? 'mr-2' : 'mr-2 opacity-0'}
                    />
                    {curr.symbol} {curr.code}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-sm px-2">
            <GridViewToggle
              value={gridColumns}
              onChange={onGridColumnsChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
