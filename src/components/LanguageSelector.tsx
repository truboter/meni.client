import { Translate, CaretUp, CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Language } from "@/lib/translations";
import { languages } from "@/lib/translations";
import { useState, useRef, useEffect } from "react";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
}: LanguageSelectorProps) {
  const currentLang = languages.find((lang) => lang.code === currentLanguage);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnOpenChange || setInternalIsOpen;

  // Check scroll position
  const checkScroll = () => {
    // Find the actual scrollable viewport inside ScrollArea
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    if (viewport) {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      setCanScrollUp(scrollTop > 1);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // Find the actual scrollable viewport inside ScrollArea
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    if (viewport) {
      viewport.addEventListener("scroll", checkScroll);
      // Check initial state after a short delay to ensure content is rendered
      setTimeout(checkScroll, 100);
      return () => viewport.removeEventListener("scroll", checkScroll);
    }
  }, [isOpen]);

  const handleScrollUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    viewport?.scrollBy({ top: -100, behavior: "smooth" });
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;
    viewport?.scrollBy({ top: 100, behavior: "smooth" });
  };

  // Group languages
  const mainLanguages = languages.slice(0, 5); // Georgian, English, Russian, Turkish, Armenian
  const topWorldLanguages = languages.slice(5, 22); // Chinese to Persian (17 languages)
  const regionalLanguages = languages.slice(22); // Hebrew to Abkhazian (5 languages)

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 gap-2 text-foreground hover:bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Translate weight="bold" className="h-4 w-4" />
          {currentLang && (
            <img
              src={`https://flagcdn.com/w40/${currentLang.countryCode}.png`}
              srcSet={`https://flagcdn.com/w80/${currentLang.countryCode}.png 2x`}
              width="24"
              height="18"
              alt={currentLang.name}
              className="rounded shadow-sm"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] p-0 z-50">
        <div className="relative">
          {/* Top scroll indicator */}
          {canScrollUp && (
            <button
              onClick={handleScrollUp}
              className="absolute top-0 left-0 right-0 h-7 bg-background/98 backdrop-blur-sm border-b border-border/50 z-20 flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-all group shadow-sm"
            >
              <CaretUp
                weight="bold"
                className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </button>
          )}

          <ScrollArea className="h-[400px]" ref={scrollAreaRef}>
            <div
              className={`p-1 ${canScrollUp ? "pt-10" : "pt-2"} ${canScrollDown ? "pb-10" : "pb-2"}`}
            >
              {/* Main Languages - displayed with bold font weight */}
              {mainLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className="cursor-pointer gap-3"
                >
                  <img
                    src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                    srcSet={`https://flagcdn.com/w80/${lang.countryCode}.png 2x`}
                    width="32"
                    height="24"
                    alt={lang.name}
                    className="rounded shadow-sm shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">{lang.nativeName}</span>
                    <span className="text-xs text-muted-foreground font-bold">
                      {lang.name}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Other World Languages */}
              {topWorldLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className="cursor-pointer gap-3"
                >
                  <img
                    src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                    srcSet={`https://flagcdn.com/w80/${lang.countryCode}.png 2x`}
                    width="32"
                    height="24"
                    alt={lang.name}
                    className="rounded shadow-sm shrink-0"
                  />
                  <div className="flex flex-col">
                    <span
                      className={
                        currentLanguage === lang.code ? "font-semibold" : ""
                      }
                    >
                      {lang.nativeName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lang.name}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Regional Languages */}
              {regionalLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className="cursor-pointer gap-3"
                >
                  <img
                    src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                    srcSet={`https://flagcdn.com/w80/${lang.countryCode}.png 2x`}
                    width="32"
                    height="24"
                    alt={lang.name}
                    className="rounded shadow-sm shrink-0"
                  />
                  <div className="flex flex-col">
                    <span
                      className={
                        currentLanguage === lang.code ? "font-semibold" : ""
                      }
                    >
                      {lang.nativeName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lang.name}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </ScrollArea>

          {/* Bottom scroll indicator */}
          {canScrollDown && (
            <button
              onClick={handleScrollDown}
              className="absolute bottom-0 left-0 right-0 h-7 bg-background/98 backdrop-blur-sm border-t border-border/50 z-20 flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-all group shadow-sm"
            >
              <CaretDown
                weight="bold"
                className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
