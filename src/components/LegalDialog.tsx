import { X } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { type Language } from "../lib/translations";

interface PolicyParagraph {
  id: string;
  content: string;
}

interface PolicySection {
  title: string;
  paragraphs: PolicyParagraph[];
}

interface LegalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  title: string;
  lastUpdated: string;
  intro?: PolicyParagraph[];
  sections: PolicySection[];
}

export function LegalDialog({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
            <p className="text-sm text-gray-500">{lastUpdated}</p>
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
          <div className="space-y-6">
            {/* Intro paragraphs */}
            {intro && intro.length > 0 && (
              <div className="pb-6 border-b border-gray-100">
                {intro.map((paragraph) => (
                  <p
                    key={paragraph.id}
                    className="text-gray-700 whitespace-pre-line leading-relaxed mb-4 last:mb-0"
                  >
                    {paragraph.content}
                  </p>
                ))}
              </div>
            )}

            {/* Sections with paragraphs */}
            {sections.map((section, index) => (
              <div
                key={index}
                className="pb-6 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.id}
                      className="text-gray-700 whitespace-pre-line leading-relaxed"
                    >
                      {paragraph.content}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
