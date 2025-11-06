import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getTranslatedCategory, type Language } from '@/lib/translations'

interface CategoryChipsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  language: Language
}

export function CategoryChips({ categories, activeCategory, onCategoryChange, language }: CategoryChipsProps) {
  return (
    <div className="w-full border-b border-border bg-background sticky top-0 z-10">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 px-4 md:px-6 py-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150',
                'min-h-[44px] flex items-center justify-center flex-shrink-0',
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                  : 'bg-transparent border border-border text-foreground hover:bg-secondary'
              )}
            >
              {getTranslatedCategory(category, language)}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}