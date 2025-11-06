import type { MenuItem, VenueInfo } from './types'

export const venueInfo: VenueInfo = {
  name: 'Easy Street Diner',
  subtitle: 'Visual menu',
  bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop&q=80',
  logoImage: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop&q=80'
}

export const categories = [
  'Food',
  'Cocktails',
  'Beers, Spirits & Wines',
  'Non-Alcoholic Drinks',
  'Urban Legends',
  'Desserts'
]

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Angus beef patty, lettuce, tomato, pickles, special sauce on a brioche bun',
    price: 16.50,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=675&fit=crop&q=80',
    badges: ['popular'],
    modifiers: [
      {
        id: 'm1',
        name: 'Cooking Temperature',
        required: true,
        maxSelections: 1,
        options: [
          { id: 'rare', name: 'Rare', price: 0 },
          { id: 'medium', name: 'Medium', price: 0 },
          { id: 'well', name: 'Well Done', price: 0 }
        ]
      },
      {
        id: 'm2',
        name: 'Add-ons',
        required: false,
        maxSelections: 3,
        options: [
          { id: 'cheese', name: 'Extra Cheese', price: 2 },
          { id: 'bacon', name: 'Bacon', price: 3 },
          { id: 'avocado', name: 'Avocado', price: 2.5 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons, classic caesar dressing',
    price: 12.00,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=900&h=675&fit=crop&q=80',
    badges: ['vegetarian']
  },
  {
    id: '3',
    name: 'Spicy Chicken Wings',
    description: 'Crispy wings tossed in buffalo sauce, served with blue cheese dip',
    price: 14.00,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=900&h=675&fit=crop&q=80',
    badges: ['spicy', 'popular']
  },
  {
    id: '4',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil, tomato sauce on wood-fired crust',
    price: 15.00,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&h=675&fit=crop&q=80',
    badges: ['vegetarian']
  },
  {
    id: '7',
    name: 'Espresso Martini',
    description: 'Vodka, coffee liqueur, fresh espresso, simple syrup',
    price: 14.00,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&h=675&fit=crop&q=80',
    badges: ['popular']
  },
  {
    id: '8',
    name: 'Classic Mojito',
    description: 'White rum, fresh mint, lime, soda water, sugar',
    price: 12.00,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=900&h=675&fit=crop&q=80'
  },
  {
    id: '11',
    name: 'IPA Craft Beer',
    description: 'Local brewery hoppy IPA with citrus notes',
    price: 8.00,
    category: 'Beers, Spirits & Wines',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=900&h=675&fit=crop&q=80',
    badges: ['popular']
  },
  {
    id: '14',
    name: 'Fresh Lemonade',
    description: 'House-made with real lemons, mint, and a touch of honey',
    price: 5.00,
    category: 'Non-Alcoholic Drinks',
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe1e1e?w=900&h=675&fit=crop&q=80',
    badges: ['non-alcoholic']
  },
  {
    id: '19',
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake with graham cracker crust and berry compote',
    price: 9.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=900&h=675&fit=crop&q=80',
    badges: ['popular']
  },
  {
    id: '20',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 10.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=900&h=675&fit=crop&q=80'
  }
]

export const restaurantData = {
  venueInfo,
  categories,
  menuItems
}