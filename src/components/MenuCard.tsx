import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { MenuItem } from '@/lib/types'
import type { Currency } from '@/lib/currency'
import { formatPrice } from '@/lib/currency'

interface MenuCardProps {
  item: MenuItem
  onClick: () => void
  onQuickAdd?: () => void
  currency: Currency
  convertPrices: boolean
}

export function MenuCard({ item, onClick, onQuickAdd, currency, convertPrices }: MenuCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onQuickAdd?.()
  }

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer border-border hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-100 flex flex-col relative pb-14 p-0 overflow-hidden"
    >
      <div className="relative h-32 overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Badges */}
        {item.badges && item.badges.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1 flex-wrap">
            {item.badges.map((badge) => (
              <Badge 
                key={badge} 
                variant="secondary" 
                className="text-xs font-medium bg-white/90 text-gray-800 hover:bg-white"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-base leading-tight mb-2 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-3">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">
            {formatPrice(item.price, currency, convertPrices)}
          </span>
          
          {onQuickAdd && (
            <Button
              size="sm"
              onClick={handleQuickAdd}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Plus size={16} weight="bold" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}