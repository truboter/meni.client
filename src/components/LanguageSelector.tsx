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
  const mainLanguages = languages.slice(0, 4); // Georgian, English, Russian, Turkish
  const topWorldLanguages = languages.slice(4, 18); // Chinese to Persian
  const regionalLanguages = languages.slice(18); // Hebrew to Uzbek

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 gap-2 text-foreground hover:bg-secondary"
        >
          <Translate weight="bold" className="h-4 w-4" />
          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
            {currentLang?.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-1">
            {/* Main Languages - displayed with bold font weight */}
            {mainLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className="cursor-pointer gap-3"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold bg-primary text-primary-foreground rounded-full shrink-0">
                  {lang.code.toUpperCase()}
                </span>
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
                <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold bg-secondary text-foreground rounded-full shrink-0">
                  {lang.code.toUpperCase()}
                </span>
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
                <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold bg-secondary text-foreground rounded-full shrink-0">
                  {lang.code.toUpperCase()}
                </span>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
