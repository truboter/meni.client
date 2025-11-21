import { Translate } from "@phosphor-icons/react";
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

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  // Group languages
  const mainLanguages = languages.slice(0, 5); // Georgian, English, Russian, Turkish, Armenian
  const topWorldLanguages = languages.slice(5, 22); // Chinese to Persian (17 languages)
  const regionalLanguages = languages.slice(22); // Hebrew to Abkhazian (5 languages)

  return (
    <DropdownMenu>
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
      <DropdownMenuContent align="end" className="w-[280px] p-0">
        <div className="relative">
          {/* Top fade indicator */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-background to-transparent pointer-events-none z-10" />
          
          <ScrollArea className="h-[400px]">
            <div className="p-1 pt-2">
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
        
        {/* Bottom fade indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent pointer-events-none z-10" />
      </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
