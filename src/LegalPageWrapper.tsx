import { useState } from "react";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { DataManagement } from "./pages/DataManagement";
import { type Language } from "./lib/translations";
import * as consentManager from "./lib/consentManager";

const LANGUAGE_STORAGE_KEY = "meni_preferred_language";

interface LegalPageWrapperProps {
  page: "privacy" | "terms" | "data";
}

export function LegalPageWrapper({ page }: LegalPageWrapperProps) {
  const [language] = useState<Language>(() => {
    const savedLanguage = consentManager.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && savedLanguage.length === 2) {
      return savedLanguage as Language;
    }
    return "ka";
  });

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
