import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { type Language, getUITranslation } from "../lib/translations";
import { Button } from "../components/ui/button";

interface PrivacyPolicyProps {
  language: Language;
}

export function PrivacyPolicy({ language }: PrivacyPolicyProps) {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/legal/privacy-${language}.md`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          // Fallback to English if language not available
          const fallbackResponse = await fetch(`/legal/privacy-en.md`);
          if (fallbackResponse.ok) {
            const text = await fallbackResponse.text();
            setContent(text);
          }
        }
      } catch (error) {
        console.error("Error loading privacy policy:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [language]);

  // Simple markdown to HTML converter
  const renderMarkdown = (md: string) => {
    const lines = md.split("\n");
    const elements: JSX.Element[] = [];
    let listItems: JSX.Element[] = [];
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
      const parts: (string | JSX.Element)[] = [];
      let currentText = text;
      let key = 0;

      // Process bold text
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(currentText.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`bold-${key++}`} className="font-semibold">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < text.length) {
        parts.push(currentText.substring(lastIndex));
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
    switch (language) {
      case "ka":
        return "კონფიდენციალურობის პოლიტიკა";
      case "ru":
        return "Политика конфиденциальности";
      case "de":
        return "Datenschutzrichtlinie";
      case "fr":
        return "Politique de Confidentialité";
      case "it":
        return "Informativa sulla privacy";
      case "tr":
        return "Gizlilik Politikası";
      case "he":
        return "מדיניות פרטיות";
      default:
        return "Privacy Policy";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {getUITranslation("close", language)}
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-20">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
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
      </main>
    </div>
  );
}
