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

/**
 * Get current consent status from actual localStorage
 */
export const getConsentStatus = (): ConsentStatus => {
  try {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return consent as ConsentStatus;
  } catch {
    return "declined";
  }
};

/**
 * Set consent status in actual localStorage
 */
export const setConsentStatus = (status: ConsentStatus): void => {
  try {
    if (status === null) {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } else {
      localStorage.setItem(CONSENT_STORAGE_KEY, status);
    }

    // If consent is accepted, migrate memory storage to localStorage
    if (status === "accepted") {
      migrateMemoryToLocalStorage();
    }
    // If consent is declined, clear localStorage and move to memory
    else if (status === "declined") {
      migrateLocalStorageToMemory();
    }
  } catch (error) {
    console.error("Failed to save consent status:", error);
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
    const consentValue = localStorage.getItem(CONSENT_STORAGE_KEY);
    
    // Save all localStorage data to memory
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key !== CONSENT_STORAGE_KEY) {
        const value = localStorage.getItem(key);
        if (value) {
          memoryStorage.setItem(key, value);
        }
      }
    }
    
    // Clear localStorage but restore consent
    localStorage.clear();
    if (consentValue) {
      localStorage.setItem(CONSENT_STORAGE_KEY, consentValue);
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
  const storage = getStorage();
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
 * Clear all data (except consent key)
 */
export const clearAllData = (): void => {
  try {
    const consentValue = localStorage.getItem(CONSENT_STORAGE_KEY);
    
    if (hasConsent()) {
      localStorage.clear();
      if (consentValue) {
        localStorage.setItem(CONSENT_STORAGE_KEY, consentValue);
      }
    } else {
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
