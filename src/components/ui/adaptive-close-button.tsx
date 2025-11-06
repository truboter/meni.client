import { useEffect, useState, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  getAverageColorAtPosition,
  getOptimalTextColor,
} from "@/lib/color-contrast";

interface AdaptiveCloseButtonProps {
  imageSelector?: string;
}

export function AdaptiveCloseButton({
  imageSelector = "img",
}: AdaptiveCloseButtonProps) {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const analyzeBackground = () => {
      if (!buttonRef.current) return;

      // Find the dialog content
      const dialogContent = buttonRef.current.closest('[role="dialog"]');
      if (!dialogContent) return;

      // Find the image in the dialog
      const image = dialogContent.querySelector(
        imageSelector
      ) as HTMLImageElement;
      if (!image) return;

      // Wait for image to load
      const analyze = () => {
        try {
          // Get button position relative to image
          const buttonRect = buttonRef.current!.getBoundingClientRect();
          const imageRect = image.getBoundingClientRect();

          // Calculate relative position on the image
          const x =
            ((buttonRect.left + buttonRect.width / 2 - imageRect.left) /
              imageRect.width) *
            image.naturalWidth;
          const y =
            ((buttonRect.top + buttonRect.height / 2 - imageRect.top) /
              imageRect.height) *
            image.naturalHeight;

          // Get average color at button position
          const avgColor = getAverageColorAtPosition(image, x, y, 60);

          // Determine optimal text color
          const optimalColor = getOptimalTextColor(
            avgColor.r,
            avgColor.g,
            avgColor.b
          );
          setColorMode(optimalColor);
        } catch (error) {
          console.warn("Could not analyze background color:", error);
          setColorMode("dark"); // Default to dark
        }
      };

      if (image.complete) {
        analyze();
      } else {
        image.addEventListener("load", analyze);
        return () => image.removeEventListener("load", analyze);
      }
    };

    // Small delay to ensure dialog is fully rendered
    const timer = setTimeout(analyzeBackground, 100);

    return () => clearTimeout(timer);
  }, [imageSelector]);

  return (
    <DialogPrimitive.Close
      ref={buttonRef}
      className={`
        absolute right-1 top-1 rounded-sm 
        ring-offset-background transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
        disabled:pointer-events-none 
        data-[state=open]:bg-accent data-[state=open]:text-muted-foreground 
        z-50
        ${
          colorMode === "light"
            ? "text-white hover:bg-black/20 opacity-90 hover:opacity-100"
            : "text-gray-900 hover:bg-white/30 opacity-80 hover:opacity-100"
        }
      `}
    >
      <div
        className={`
        rounded-full p-1
        ${
          colorMode === "light"
            ? "bg-black/20 backdrop-blur-sm"
            : "bg-white/30 backdrop-blur-sm"
        }
      `}
      >
        <X className="h-5 w-5" strokeWidth={3} />
      </div>
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  );
}
