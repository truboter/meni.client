export type BadgeType = 'vegan' | 'vegetarian' | 'gluten-free' | 'spicy' | 'new' | 'popular' | 'non-alcoholic'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  badges?: BadgeType[]
  allergens?: string[]
  modifiers?: ModifierGroup[]
  gallery?: string[]
}

export interface ModifierGroup {
  id: string
  name: string
  required: boolean
  maxSelections: number
  options: ModifierOption[]
}

export interface ModifierOption {
  id: string
  name: string
  price: number
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  selectedModifiers: { [groupId: string]: string[] }
  totalPrice: number
}

export interface VenueInfo {
  name: string
  subtitle: string
  bannerImage: string
  logoImage: string
}