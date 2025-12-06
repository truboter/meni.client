import { useState, useEffect } from "react";
import { MarkdownViewer } from "../components/MarkdownViewer";
import { LanguageSelector } from "../components/LanguageSelector";
import { type Language } from "../lib/translations";

interface CookiesPolicyProps {
  language: Language;
}

export function CookiesPolicy({ language }: CookiesPolicyProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to load language-specific version first
        let response = await fetch(`/legal/cookies-${language}.md`);

        // If not found, fall back to English
        if (!response.ok && language !== "en") {
          response = await fetch(`/legal/cookies-en.md`);
        }

        // If English not found, try base cookies.md
        if (!response.ok) {
          response = await fetch(`/legal/cookies.md`);
        }

        if (!response.ok) {
          throw new Error("Cookies policy not found");
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error("Error loading cookies policy:", err);
        setError("Failed to load cookies policy");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        <MarkdownViewer content={content} />
      </div>
    </div>
  );
}
