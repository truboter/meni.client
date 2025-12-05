import type { CartItem } from "./types";
import * as consentManager from "./consentManager";

// Simplified order item for S3 storage (only IDs and selections)
export interface OrderItemCompact {
  itemId: string;
  quantity: number;
  modifiers: Record<string, string[]>;
}

// Full order with cart items (for localStorage)
export interface Order {
  orderId: string;
  userId?: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// Compact order for S3 (minimal data)
export interface OrderCompact {
  orderId: string;
  userId?: string;
  items: OrderItemCompact[];
  createdAt: string;
  updatedAt: string;
}

const S3_BUCKET_URL = "https://s3.eu-central-1.amazonaws.com/cdn.meni";
const ORDERS_PREFIX = "orders";
const ORDER_PATH_STORAGE_KEY = "meni_order_path_";

/**
 * Get or create the location path for an order
 * Once created, it's saved in localStorage to prevent path changes when language changes
 */
function getOrderLocationPath(orderId: string): string {
  // Try to get saved path first
  const savedPath = consentManager.getItem(
    `${ORDER_PATH_STORAGE_KEY}${orderId}`
  );
  if (savedPath) {
    return savedPath;
  }

  // Create new path based on current URL
  const locationPath = encodeLocationPath();

  // Save it for future use
  consentManager.setItem(`${ORDER_PATH_STORAGE_KEY}${orderId}`, locationPath);

  return locationPath;
}

/**
 * Encode URL path and domain as safe directory name
 */
function encodeLocationPath(): string {
  // Get domain (e.g., "meni.ge" or "localhost:7003")
  const domain = window.location.host.replace(/:/g, "_");

  // Get current URL path (e.g., "/demo/ru" or "/ru" or "/ru/orderId")
  let path = window.location.pathname;

  // Remove orderId from path if present (last segment with dash and length > 10)
  const segments = path.split("/").filter((s) => s);
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1];
    if (lastSegment.includes("-") && lastSegment.length > 10) {
      // Last segment looks like an orderId, remove it
      segments.pop();
    }
  }

  // Reconstruct path without orderId
  const cleanPath = segments.join("/");

  // Remove leading/trailing slashes and replace remaining slashes with underscores
  const encodedPath = cleanPath.replace(/^\/+|\/+$/g, "").replace(/\//g, "_");

  // Combine domain and path
  const locationPart = encodedPath || "home";
  return `${domain}/${locationPart}`;
}

/**
 * Get S3 path for order file
 */
function getOrderPath(orderId: string): string {
  const locationPath = getOrderLocationPath(orderId);
  return `${ORDERS_PREFIX}/${locationPath}/${orderId}.json`;
}

/**
 * Convert CartItem to compact format (only IDs and selections)
 */
function toCompactItem(cartItem: CartItem): OrderItemCompact {
  return {
    itemId: cartItem.menuItem.id,
    quantity: cartItem.quantity,
    modifiers: cartItem.selectedModifiers,
  };
}

/**
 * Save order to localStorage and attempt S3 sync
 */
export async function saveOrder(
  orderId: string,
  items: CartItem[],
  userId?: string
): Promise<void> {
  const order: Order = {
    orderId,
    userId,
    items,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Always save full order to localStorage first
  try {
    consentManager.setItem(`meni_order_${orderId}`, JSON.stringify(order));
    console.log("Order saved to localStorage");
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }

  // Create compact version for S3
  const compactOrder: OrderCompact = {
    orderId,
    userId,
    items: items.map(toCompactItem),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };

  // Try to sync compact order to S3 (will fail if CORS not configured)
  try {
    const orderPath = getOrderPath(orderId);
    const response = await fetch(`${S3_BUCKET_URL}/${orderPath}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compactOrder),
    });

    if (response.ok) {
      console.log("Order synced to S3 successfully:", orderPath);
    } else {
      console.warn(
        `S3 sync failed (${response.status}): CORS might not be configured yet. Order saved locally.`
      );
    }
  } catch (error) {
    console.warn(
      "S3 sync failed: CORS not configured. Order saved locally only.",
      error
    );
  }
}

/**
 * Load order from localStorage or S3
 */
export async function loadOrder(orderId: string): Promise<Order | null> {
  // Try localStorage first
  try {
    const localData = consentManager.getItem(`meni_order_${orderId}`);
    if (localData) {
      const order = JSON.parse(localData) as Order;
      console.log("Order loaded from localStorage:", order);
      return order;
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }

  // Try S3 as fallback
  try {
    const orderPath = getOrderPath(orderId);
    const response = await fetch(`${S3_BUCKET_URL}/${orderPath}`);

    if (response.ok) {
      const order = (await response.json()) as Order;
      console.log("Order loaded from S3:", order);
      // Save to localStorage for faster future access
      consentManager.setItem(`meni_order_${orderId}`, JSON.stringify(order));
      return order;
    }
  } catch (error) {
    console.error("Error loading from S3:", error);
  }

  return null;
}

/**
 * Get public URL for order (for sharing)
 */
export function getOrderUrl(orderId: string): string {
  const orderPath = getOrderPath(orderId);
  return `${S3_BUCKET_URL}/${orderPath}`;
}

/**
 * Check if order has been updated in S3 (returns compact order if updated)
 */
export async function checkOrderUpdate(
  orderId: string,
  currentUpdatedAt: string
): Promise<OrderCompact | null> {
  try {
    const orderPath = getOrderPath(orderId);
    const response = await fetch(`${S3_BUCKET_URL}/${orderPath}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (response.ok) {
      const compactOrder = (await response.json()) as OrderCompact;

      // Check if order has been updated
      if (compactOrder.updatedAt !== currentUpdatedAt) {
        console.log("Order updated in S3:", compactOrder.updatedAt);
        return compactOrder;
      }
    }
  } catch (error) {
    console.error("Error checking order update:", error);
  }

  return null;
}

/**
 * Delete order from S3
 */
export async function deleteOrder(orderId: string): Promise<boolean> {
  try {
    const orderPath = getOrderPath(orderId);
    const response = await fetch(`${S3_BUCKET_URL}/${orderPath}`, {
      method: "DELETE",
    });

    if (response.ok || response.status === 204 || response.status === 404) {
      console.log("Order deleted successfully:", orderPath);
      return true;
    } else {
      console.warn(`Failed to delete order (${response.status})`);
      return false;
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
}

/**
 * Call waiter - creates a .call file in the order directory
 */
export async function callWaiter(
  orderId: string,
  language: string
): Promise<boolean> {
  try {
    const locationPath = getOrderLocationPath(orderId);
    const callPath = `${ORDERS_PREFIX}/${locationPath}/${orderId}.call`;

    const response = await fetch(`${S3_BUCKET_URL}/${callPath}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log("Waiter called successfully:", callPath);
      return true;
    } else {
      console.warn(`Failed to call waiter (${response.status})`);
      return false;
    }
  } catch (error) {
    console.error("Error calling waiter:", error);
    return false;
  }
}
