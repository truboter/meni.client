/**
 * Cookie Consent Manager
 * Manages user consent for data storage and provides safe storage methods
 */

const CONSENT_STORAGE_KEY = "meni_cookie_consent";

export type ConsentStatus = "accepted" | "declined" | null;

/**
 * Get current consent status
 */
export const getConsentStatus = (): ConsentStatus => {
  try {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return consent as ConsentStatus;
  } catch {
    // If localStorage is blocked, treat as declined
    return "declined";
  }
};

/**
 * Set consent status
 */
export const setConsentStatus = (status: ConsentStatus): void => {
  try {
    if (status === null) {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } else {
      localStorage.setItem(CONSENT_STORAGE_KEY, status);
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
 * Safe localStorage getter - returns null if no consent
 */
export const getItem = (key: string): string | null => {
  if (!hasConsent() && key !== CONSENT_STORAGE_KEY) {
    console.warn(
      `Attempted to read ${key} without consent. Returning null.`
    );
    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/**
 * Safe localStorage setter - does nothing if no consent
 */
export const setItem = (key: string, value: string): boolean => {
  // Always allow consent key itself
  if (key === CONSENT_STORAGE_KEY) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  if (!hasConsent()) {
    console.warn(
      `Attempted to write ${key} without consent. Operation blocked.`
    );
    return false;
  }

  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safe localStorage remove - does nothing if no consent
 */
export const removeItem = (key: string): boolean => {
  if (!hasConsent() && key !== CONSENT_STORAGE_KEY) {
    console.warn(
      `Attempted to remove ${key} without consent. Operation blocked.`
    );
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

/**
 * Clear all data (used when consent is revoked)
 */
export const clearAllData = (): void => {
  try {
    const consentValue = localStorage.getItem(CONSENT_STORAGE_KEY);
    localStorage.clear();
    // Restore consent status
    if (consentValue) {
      localStorage.setItem(CONSENT_STORAGE_KEY, consentValue);
    }
  } catch (error) {
    console.error("Failed to clear data:", error);
  }
};

/**
 * Show a user-friendly message when consent is declined
 */
export const showConsentRequiredMessage = (language: string = "en"): string => {
  const messages = {
    ka: "გთხოვთ მიიღოთ Cookie-ების გამოყენება სერვისის მუშაობისთვის.",
    en: "Please accept cookies to use this service.",
    ru: "Пожалуйста, примите использование cookies для работы сервиса.",
  };
  return messages[language as keyof typeof messages] || messages.en;
};

// Export consent key for direct access where needed
export { CONSENT_STORAGE_KEY };
