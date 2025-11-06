/**
 * Get the average color from an image at a specific position
 */
export function getAverageColorAtPosition(
  imageElement: HTMLImageElement,
  x: number,
  y: number,
  sampleSize: number = 40
): { r: number; g: number; b: number } {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return { r: 128, g: 128, b: 128 }; // Default gray
  }

  canvas.width = imageElement.naturalWidth || imageElement.width;
  canvas.height = imageElement.naturalHeight || imageElement.height;

  ctx.drawImage(imageElement, 0, 0);

  try {
    // Sample area around the position
    const imageData = ctx.getImageData(
      Math.max(0, x - sampleSize / 2),
      Math.max(0, y - sampleSize / 2),
      Math.min(sampleSize, canvas.width - x),
      Math.min(sampleSize, canvas.height - y)
    );

    let r = 0,
      g = 0,
      b = 0;
    const pixels = imageData.data.length / 4;

    for (let i = 0; i < imageData.data.length; i += 4) {
      r += imageData.data[i];
      g += imageData.data[i + 1];
      b += imageData.data[i + 2];
    }

    return {
      r: Math.round(r / pixels),
      g: Math.round(g / pixels),
      b: Math.round(b / pixels),
    };
  } catch (error) {
    // Handle CORS errors or other issues
    console.warn("Could not analyze image color:", error);
    return { r: 128, g: 128, b: 128 };
  }
}

/**
 * Calculate relative luminance of a color (WCAG formula)
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determine if a color is light or dark
 */
export function isLightColor(r: number, g: number, b: number): boolean {
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5;
}

/**
 * Get optimal text color (black or white) for a given background
 */
export function getOptimalTextColor(
  r: number,
  g: number,
  b: number
): "light" | "dark" {
  return isLightColor(r, g, b) ? "dark" : "light";
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number {
  const l1 = getLuminance(color1.r, color1.g, color1.b);
  const l2 = getLuminance(color2.r, color2.g, color2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}
