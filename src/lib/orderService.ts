import { uploadData, getUrl, downloadData } from 'aws-amplify/storage';
import type { CartItem } from './types';

export interface Order {
  orderId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Save order to S3
 */
export async function saveOrder(orderId: string, items: CartItem[]): Promise<void> {
  try {
    const order: Order = {
      orderId,
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await uploadData({
      path: `orders/${orderId}.json`,
      data: JSON.stringify(order),
      options: {
        contentType: 'application/json',
      }
    }).result;

    console.log('Order saved successfully:', result);
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
}

/**
 * Load order from S3
 */
export async function loadOrder(orderId: string): Promise<Order | null> {
  try {
    const downloadResult = await downloadData({
      path: `orders/${orderId}.json`,
    }).result;

    const text = await downloadResult.body.text();
    const order = JSON.parse(text) as Order;
    
    console.log('Order loaded successfully:', order);
    return order;
  } catch (error) {
    console.error('Error loading order:', error);
    return null;
  }
}

/**
 * Get public URL for order (for sharing)
 */
export async function getOrderUrl(orderId: string): Promise<string | null> {
  try {
    const result = await getUrl({
      path: `orders/${orderId}.json`,
      options: {
        expiresIn: 3600, // 1 hour
      }
    });

    return result.url.toString();
  } catch (error) {
    console.error('Error getting order URL:', error);
    return null;
  }
}
