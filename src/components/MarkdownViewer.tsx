import React, { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { type Language } from "../lib/translations";

interface MarkdownViewerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  documentType: "privacy" | "terms";
}

export function MarkdownViewer({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  documentType,
}: MarkdownViewerProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/legal/${documentType}-${language}.md`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          // Fallback to English if language not available
          const fallbackResponse = await fetch(`/legal/${documentType}-en.md`);
          if (fallbackResponse.ok) {
            const text = await fallbackResponse.text();
            setContent(text);
          }
        }
      } catch (error) {
        console.error("Error loading legal document:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [isOpen, language, documentType]);

  if (!isOpen) return null;

  // Simple markdown to HTML converter
  const renderMarkdown = (md: string) => {
    const lines = md.split("\n");
    const elements: React.JSX.Element[] = [];
    let listItems: React.JSX.Element[] = [];
    let listIndex = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${listIndex++}`} className="list-disc ml-6 mb-4">
            {listItems}
          </ul>
        );
        listItems = [];
      }
    };

    const processInlineMarkdown = (text: string) => {
      const parts: (string | React.JSX.Element)[] = [];
      let key = 0;

      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`bold-${key++}`} className="font-semibold">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      return parts.length > 0 ? parts : text;
    };

    lines.forEach((line, index) => {
      // Headers
      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h4
            key={`h4-${index}`}
            className="text-base font-semibold text-gray-900 mt-4 mb-2"
          >
            {processInlineMarkdown(line.replace("### ", ""))}
          </h4>
        );
        return;
      }
      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg font-semibold text-gray-900 mt-6 mb-3"
          >
            {processInlineMarkdown(line.replace("## ", ""))}
          </h3>
        );
        return;
      }
      if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            {processInlineMarkdown(line.replace("# ", ""))}
          </h2>
        );
        return;
      }

      // List items
      if (line.startsWith("- ")) {
        listItems.push(
          <li key={`li-${index}`} className="text-gray-700 mb-1">
            {processInlineMarkdown(line.replace("- ", ""))}
          </li>
        );
        return;
      }

      // Empty lines
      if (line.trim() === "") {
        flushList();
        elements.push(<div key={`space-${index}`} className="h-2" />);
        return;
      }

      // Regular paragraphs
      flushList();
      elements.push(
        <p key={`p-${index}`} className="text-gray-700 mb-2 leading-relaxed">
          {processInlineMarkdown(line)}
        </p>
      );
    });

    flushList();
    return elements;
  };

  const getTitle = () => {
    if (documentType === "privacy") {
      return language === "ka"
        ? "კონფიდენციალურობის პოლიტიკა"
        : language === "ru"
          ? "Политика конфиденциальности"
          : "Privacy Policy";
    } else {
      return language === "ka"
        ? "სერვისის გამოყენების პირობები"
        : language === "ru"
          ? "Условия использования"
          : "Terms of Service";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
              isOpen={false}
              onOpenChange={() => {}}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} weight="bold" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {renderMarkdown(content)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
