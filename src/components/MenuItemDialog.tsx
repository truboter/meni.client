import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Plus, Minus } from '@phosphor-icons/react'
import type { MenuItem } from '@/lib/types'
import type { Language } from '@/lib/translations'
import type { Currency } from '@/lib/currency'
import { formatPrice } from '@/lib/currency'
import { getUITranslation } from '@/lib/translations'

interface MenuItemDialogProps {
  item: MenuItem | null
  open: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, quantity: number, selectedModifiers: Record<string, string[]>) => void
  language: Language
  currency: Currency
  convertPrices: boolean
}

export function MenuItemDialog({
  item,
  open,
  onClose,
  onAddToCart,
  language,
  currency,
  convertPrices
}: MenuItemDialogProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (open) {
      setQuantity(1)
      setSelectedModifiers({})
    }
  }, [open, item])

  if (!item) return null

  const handleModifierToggle = (groupId: string, optionId: string, isMultiple: boolean) => {
    setSelectedModifiers((prev) => {
      const current = prev[groupId] || []
      
      if (isMultiple) {
        // Multiple selection
        if (current.includes(optionId)) {
          return {
            ...prev,
            [groupId]: current.filter((id) => id !== optionId)
          }
        } else {
          return {
            ...prev,
            [groupId]: [...current, optionId]
          }
        }
      } else {
        // Single selection
        return {
          ...prev,
          [groupId]: current.includes(optionId) ? [] : [optionId]
        }
      }
    })
  }

  const calculateTotalPrice = () => {
    let total = item.price

    item.modifiers?.forEach((group) => {
      const selectedIds = selectedModifiers[group.id] || []
      selectedIds.forEach((optionId) => {
        const option = group.options.find((o) => o.id === optionId)
        if (option && option.price > 0) {
          total += option.price
        }
      })
    })

    return total * quantity
  }

  const handleAddToCart = () => {
    onAddToCart(item, quantity, selectedModifiers)
    onClose()
  }

  const totalPrice = calculateTotalPrice()

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0 bg-background">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          {item.badges && item.badges.length > 0 && (
            <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
              {item.badges.map((badge) => (
                <Badge 
                  key={badge} 
                  variant="secondary" 
                  className="text-xs font-medium bg-white/90 text-gray-800"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col max-h-[calc(90vh-16rem)] bg-background">
          <DialogHeader className="px-6 pt-6 bg-background">
            <DialogTitle className="text-2xl">{item.name}</DialogTitle>
            <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
            <p className="text-xl font-semibold mt-2">
              {formatPrice(item.price, currency, convertPrices)}
            </p>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6">
            {/* Modifiers */}
            {item.modifiers && item.modifiers.length > 0 && (
              <div className="space-y-6 py-6">
                {item.modifiers.map((group) => (
                  <div key={group.id}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-base">{group.name}</h3>
                      {group.required && (
                        <Badge variant="destructive" className="text-xs">
                          {getUITranslation('required', language)}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {group.options.map((option) => {
                        const isSelected = (selectedModifiers[group.id] || []).includes(option.id)
                        
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleModifierToggle(group.id, option.id, group.multiple || false)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                              }`}>
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                              <span className="text-sm font-medium">{option.name}</span>
                            </div>
                            {option.price > 0 && (
                              <span className="text-sm text-muted-foreground">
                                +{formatPrice(option.price, currency, convertPrices)}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                    
                    <Separator className="mt-6" />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <DialogFooter className="px-6 py-4 border-t bg-background">
            <div className="flex items-center justify-between w-full gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} weight="bold" />
                </Button>
                <span className="text-base font-semibold w-8 text-center">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} weight="bold" />
                </Button>
              </div>

              {/* Add to Cart Button */}
              <Button
                className="flex-1 h-11"
                size="lg"
                onClick={handleAddToCart}
              >
                {getUITranslation('addToCart', language)} • {formatPrice(totalPrice, currency, convertPrices)}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
