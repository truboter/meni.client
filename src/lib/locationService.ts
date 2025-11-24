import type { LocationData, MenuItem } from "./types";
import type { Language } from "./translations";

const CDN_BASE_URL = "https://cdn.meni.ge/locations";

/**
 * Fetch location data from CDN
 * @param locationId - The location ID (e.g., "demo")
 * @param languageCode - The language code (e.g., "ru", "en", "ka")
 * @returns Location data with categories and menu items
 */
export async function fetchLocationData(
  locationId: string,
  languageCode: Language
): Promise<LocationData> {
  const url = `${CDN_BASE_URL}/${locationId}/profile.json`;

  console.log(`[LocationService] Fetching data from: ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch location data: ${response.statusText}`);
    }

    const data: LocationData = await response.json();
    console.log(
      `[LocationService] Successfully loaded data for location: ${data.locationName}`,
      {
        categories: data.categories.length,
        totalItems: data.categories.reduce(
          (sum, cat) => sum + cat.items.length,
          0
        ),
      }
    );
    return data;
  } catch (error) {
    console.error("[LocationService] Error fetching location data:", error);
    throw error;
  }
}

/**
 * Convert location data to menu items format
 * This function transforms CDN data to the format used by the menu display
 */
export function convertLocationDataToMenuItems(
  locationData: LocationData
): MenuItem[] {
  const menuItems: MenuItem[] = [];

  locationData.categories.forEach((category) => {
    category.items.forEach((item) => {
      // Build image URL from CDN
      const imageUrl = `${CDN_BASE_URL}/${locationData.locationId}/${item.id}/medium.webp`;
      const largeUrl = `${CDN_BASE_URL}/${locationData.locationId}/${item.id}/large.webp`;

      menuItems.push({
        id: item.id,
        name: item.name,
        description: item.description || "",
        price: 0, // Price will need to be added separately if available
        category: category.name,
        image: imageUrl,
        badges: [],
        allergens: [],
        modifiers: [],
        gallery: [largeUrl], // Use large image for gallery
      });
    });
  });

  return menuItems;
}

/**
 * Extract category names from location data
 */
export function extractCategories(locationData: LocationData): string[] {
  return locationData.categories.map((category) => category.name);
}
