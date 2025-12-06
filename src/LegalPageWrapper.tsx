import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CookiesPolicy } from "./pages/CookiesPolicy";
import { DataManagement } from "./pages/DataManagement";
import { type Language } from "./lib/translations";
import * as consentManager from "./lib/consentManager";

const LANGUAGE_STORAGE_KEY = "meni_preferred_language";

interface LegalPageWrapperProps {
  page: "privacy" | "terms" | "cookies" | "data";
}

export function LegalPageWrapper({ page }: LegalPageWrapperProps) {
  const { lang } = useParams<{ lang?: string }>();

  const [language, setLanguage] = useState<Language>(() => {
    // Priority: URL param > localStorage > default
    if (lang && lang.length === 2) {
      return lang as Language;
    }
    const savedLanguage = consentManager.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && savedLanguage.length === 2) {
      return savedLanguage as Language;
    }
    return "ka";
  });

  // Update language when URL param changes
  useEffect(() => {
    if (lang && lang.length === 2) {
      setLanguage(lang as Language);
    }
  }, [lang]);

  // Listen for language changes in storage
  useEffect(() => {
    const checkLanguage = () => {
      // Don't override URL param
      if (lang && lang.length === 2) {
        return;
      }

      const savedLanguage = consentManager.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && savedLanguage.length === 2) {
        setLanguage(savedLanguage as Language);
      }
    };

    // Check every second for language changes
    const interval = setInterval(checkLanguage, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  switch (page) {
    case "privacy":
      return <PrivacyPolicy language={language} />;
    case "terms":
      return <TermsOfService language={language} />;
    case "cookies":
      return <CookiesPolicy language={language} />;
    case "data":
      return (
        <DataManagement
          language={language}
          onClose={() => window.history.back()}
        />
      );
    default:
      return null;
  }
}
