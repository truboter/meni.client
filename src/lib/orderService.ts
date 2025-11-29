import type { CartItem } from './types';

export interface Order {
  orderId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

const S3_BUCKET_URL = 'https://s3.eu-central-1.amazonaws.com/cdn.meni';
const ORDERS_PREFIX = 'orders';
const LOCAL_STORAGE_KEY = 'meni_pending_orders';

/**
 * Save order to localStorage and attempt S3 sync
 */
export async function saveOrder(orderId: string, items: CartItem[]): Promise<void> {
  const order: Order = {
    orderId,
    items,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Always save to localStorage first
  try {
    localStorage.setItem(`meni_order_${orderId}`, JSON.stringify(order));
    console.log('Order saved to localStorage');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }

  // Try to sync to S3 (will fail if CORS not configured)
  try {
    const response = await fetch(`${S3_BUCKET_URL}/${ORDERS_PREFIX}/${orderId}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      console.log('Order synced to S3 successfully');
    } else {
      console.warn(`S3 sync failed (${response.status}): CORS might not be configured yet. Order saved locally.`);
    }
  } catch (error) {
    console.warn('S3 sync failed: CORS not configured. Order saved locally only.', error);
  }
}

/**
 * Load order from localStorage or S3
 */
export async function loadOrder(orderId: string): Promise<Order | null> {
  // Try localStorage first
  try {
    const localData = localStorage.getItem(`meni_order_${orderId}`);
    if (localData) {
      const order = JSON.parse(localData) as Order;
      console.log('Order loaded from localStorage:', order);
      return order;
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }

  // Try S3 as fallback
  try {
    const response = await fetch(`${S3_BUCKET_URL}/${ORDERS_PREFIX}/${orderId}.json`);
    
    if (response.ok) {
      const order = await response.json() as Order;
      console.log('Order loaded from S3:', order);
      // Save to localStorage for faster future access
      localStorage.setItem(`meni_order_${orderId}`, JSON.stringify(order));
      return order;
    }
  } catch (error) {
    console.error('Error loading from S3:', error);
  }

  return null;
}

/**
 * Get public URL for order (for sharing)
 */
export function getOrderUrl(orderId: string): string {
  return `${S3_BUCKET_URL}/${ORDERS_PREFIX}/${orderId}.json`;
}
