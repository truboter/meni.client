import type { CartItem } from './types';

export interface Order {
  orderId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

const S3_BUCKET_URL = 'https://s3.eu-central-1.amazonaws.com/data.meni';
const ORDERS_PREFIX = 'orders';

/**
 * Save order to S3 bucket data.meni
 */
export async function saveOrder(orderId: string, items: CartItem[]): Promise<void> {
  try {
    const order: Order = {
      orderId,
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(`${S3_BUCKET_URL}/${ORDERS_PREFIX}/${orderId}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Failed to save order: ${response.statusText}`);
    }

    console.log('Order saved successfully to data.meni bucket');
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
}

/**
 * Load order from S3 bucket data.meni
 */
export async function loadOrder(orderId: string): Promise<Order | null> {
  try {
    const response = await fetch(`${S3_BUCKET_URL}/${ORDERS_PREFIX}/${orderId}.json`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log('Order not found');
        return null;
      }
      throw new Error(`Failed to load order: ${response.statusText}`);
    }

    const order = await response.json() as Order;
    console.log('Order loaded successfully from data.meni bucket:', order);
    return order;
  } catch (error) {
    console.error('Error loading order:', error);
    return null;
  }
}

/**
 * Get public URL for order (for sharing)
 */
export function getOrderUrl(orderId: string): string {
  return `${S3_BUCKET_URL}/${ORDERS_PREFIX}/${orderId}.json`;
}
