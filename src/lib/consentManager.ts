/**
 * Consent-Aware Storage Manager
 * Automatically switches between localStorage and in-memory storage based on user consent
 */

const CONSENT_STORAGE_KEY = "meni_cookie_consent";

export type ConsentStatus = "accepted" | "declined" | null;

// In-memory storage fallback
class MemoryStorage {
  private storage: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.storage.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  get length(): number {
    return this.storage.size;
  }

  key(index: number): string | null {
    const keys = Array.from(this.storage.keys());
    return keys[index] ?? null;
  }

  // Get all data for export
  getAllData(): Record<string, string> {
    const data: Record<string, string> = {};
    this.storage.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  }
}

// Singleton in-memory storage
const memoryStorage = new MemoryStorage();

// In-memory consent storage (for declined state)
// IMPORTANT: When user declines cookies, we must NOT store anything in localStorage,
// not even the consent decision itself. This ensures true GDPR compliance.
let inMemoryConsent: ConsentStatus = null;

/**
 * Get current consent status from localStorage or memory
 */
export const getConsentStatus = (): ConsentStatus => {
  // Check memory first (for declined state)
  if (inMemoryConsent === "declined") {
    return "declined";
  }

  // Then check localStorage
  try {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return consent as ConsentStatus;
  } catch {
    return null;
  }
};

/**
 * Set consent status - accepted goes to localStorage, declined stays in memory
 */
export const setConsentStatus = (status: ConsentStatus): void => {
  try {
    if (status === null) {
      // Clear both
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      inMemoryConsent = null;
    } else if (status === "accepted") {
      // Save to localStorage and clear memory
      localStorage.setItem(CONSENT_STORAGE_KEY, status);
      inMemoryConsent = null;
      // Migrate memory storage to localStorage
      migrateMemoryToLocalStorage();
    } else if (status === "declined") {
      // Save to memory only FIRST to ensure getStorage() returns memory
      inMemoryConsent = "declined";
      // Then migrate and clear localStorage
      migrateLocalStorageToMemory();
    }
  } catch (error) {
    console.error("Failed to save consent status:", error);
    // Fallback to memory if localStorage fails
    inMemoryConsent = status;
  }
};

/**
 * Check if user has given consent
 */
export const hasConsent = (): boolean => {
  return getConsentStatus() === "accepted";
};

/**
 * Get the appropriate storage based on consent
 */
const getStorage = (): Storage | MemoryStorage => {
  return hasConsent() ? localStorage : memoryStorage;
};

/**
 * Migrate data from memory storage to localStorage
 */
const migrateMemoryToLocalStorage = (): void => {
  try {
    const memoryData = memoryStorage.getAllData();
    Object.entries(memoryData).forEach(([key, value]) => {
      if (key !== CONSENT_STORAGE_KEY) {
        localStorage.setItem(key, value);
      }
    });
    memoryStorage.clear();
  } catch (error) {
    console.error("Failed to migrate to localStorage:", error);
  }
};

/**
 * Migrate data from localStorage to memory storage
 */
const migrateLocalStorageToMemory = (): void => {
  try {
    // Save all localStorage data to memory (except consent key)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key !== CONSENT_STORAGE_KEY) {
        const value = localStorage.getItem(key);
        if (value) {
          memoryStorage.setItem(key, value);
        }
      }
    }

    // Clear localStorage completely (including consent)
    localStorage.clear();

    // Double-check: ensure localStorage is actually empty
    // (in case something tried to write during clear)
    if (localStorage.length > 0) {
      console.warn("⚠️ localStorage not empty after clear, clearing again...");
      localStorage.clear();
    }
  } catch (error) {
    console.error("Failed to migrate to memory storage:", error);
  }
};

/**
 * Universal storage getter - works regardless of consent
 */
export const getItem = (key: string): string | null => {
  const storage = getStorage();
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

/**
 * Universal storage setter - works regardless of consent
 */
export const setItem = (key: string, value: string): boolean => {
  const consent = getConsentStatus();
  const storage = getStorage();

  // STRICT: Never allow localStorage writes when consent is declined
  if (consent === "declined" && storage === localStorage) {
    console.error(
      `🚫 GDPR VIOLATION PREVENTED: Attempted localStorage write with declined consent`,
      {
        key,
        consent,
        stackTrace: new Error().stack,
      }
    );
    // Force use memory storage instead
    memoryStorage.setItem(key, value);
    return true;
  }

  try {
    storage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Failed to set ${key}:`, error);
    return false;
  }
};

/**
 * Universal storage remove - works regardless of consent
 */
export const removeItem = (key: string): boolean => {
  const storage = getStorage();
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

/**
 * Clear all data (except consent key if accepted)
 */
export const clearAllData = (): void => {
  try {
    const consentStatus = getConsentStatus();

    if (consentStatus === "accepted") {
      // Clear localStorage but keep consent
      const consentValue = localStorage.getItem(CONSENT_STORAGE_KEY);
      localStorage.clear();
      if (consentValue) {
        localStorage.setItem(CONSENT_STORAGE_KEY, consentValue);
      }
    } else {
      // Clear memory storage (consent stays in inMemoryConsent)
      memoryStorage.clear();
    }
  } catch (error) {
    console.error("Failed to clear data:", error);
  }
};

/**
 * Get all stored data (for export/debugging)
 */
export const getAllData = (): Record<string, string> => {
  const data: Record<string, string> = {};

  if (hasConsent()) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key !== CONSENT_STORAGE_KEY) {
          const value = localStorage.getItem(key);
          if (value) {
            data[key] = value;
          }
        }
      }
    } catch (error) {
      console.error("Failed to get localStorage data:", error);
    }
  } else {
    return memoryStorage.getAllData();
  }

  return data;
};

/**
 * Get storage type for debugging
 */
export const getStorageType = (): "localStorage" | "memory" => {
  return hasConsent() ? "localStorage" : "memory";
};

// Export consent key for direct access where needed
export { CONSENT_STORAGE_KEY };
