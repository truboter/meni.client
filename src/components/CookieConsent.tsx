import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "@phosphor-icons/react";
import { type Language, getUITranslation } from "@/lib/translations";
import { LanguageSelector } from "./LanguageSelector";

const CONSENT_STORAGE_KEY = "meni_cookie_consent";

interface CookieConsentProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function CookieConsent({
  language,
  onLanguageChange,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {getUITranslation("cookieTitle", language)}
                </h3>
                <div className="bg-white backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
                  <LanguageSelector
                    currentLanguage={language}
                    onLanguageChange={onLanguageChange}
                    isOpen={isLanguageOpen}
                    onOpenChange={setIsLanguageOpen}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {getUITranslation("cookieMessage", language)}
              </p>
            </div>
            <button
              onClick={handleDecline}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium"
            >
              {getUITranslation("cookieAccept", language)}
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-2 border-gray-300 hover:bg-gray-50 font-medium"
            >
              {getUITranslation("cookieDecline", language)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
