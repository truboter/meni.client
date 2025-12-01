import { useState, useEffect } from "react";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { DataManagement } from "./pages/DataManagement";
import { type Language } from "./lib/translations";

const LANGUAGE_STORAGE_KEY = "meni_preferred_language";

interface LegalPageWrapperProps {
  page: "privacy" | "terms" | "data";
}

export function LegalPageWrapper({ page }: LegalPageWrapperProps) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && savedLanguage.length === 2) {
      return savedLanguage as Language;
    }
    return "ka";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  switch (page) {
    case "privacy":
      return <PrivacyPolicy language={language} />;
    case "terms":
      return <TermsOfService language={language} />;
    case "data":
      return <DataManagement language={language} />;
    default:
      return null;
  }
}
