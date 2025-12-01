import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Download, AlertTriangle } from "lucide-react";
import { type Language, getUITranslation } from "../lib/translations";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

interface DataManagementProps {
  language: Language;
}

export function DataManagement({ language }: DataManagementProps) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const content = {
    ka: {
      title: "ჩემი მონაცემები",
      description:
        "აქ შეგიძლიათ მართოთ თქვენი პერსონალური მონაცემები და პარამეტრები.",
      storedData: "შენახული მონაცემები",
      localStorage: "ლოკალური მონაცემები (თქვენს მოწყობილობაზე)",
      orderId: "შეკვეთის ID",
      language: "ენა",
      currency: "ვალუტა",
      gridColumns: "ბადის სვეტები",
      cookieConsent: "Cookie თანხმობა",
      exportData: "ექსპორტი",
      exportDesc: "გადმოწერეთ თქვენი ყველა მონაცემი JSON ფორმატში",
      deleteData: "მონაცემების წაშლა",
      deleteDesc:
        "სამუდამოდ წაშალეთ ყველა თქვენი მონაცემი ამ მოწყობილობიდან",
      deleteWarning: "გაფრთხილება!",
      deleteWarningText:
        "ეს მოქმედება წაშლის ყველა თქვენს მონაცემს, მათ შორის შეკვეთებს და პარამეტრებს. ეს მოქმედება შეუქცევადია.",
      cancel: "გაუქმება",
      confirmDelete: "დიახ, წაშალე ყველაფერი",
      dataDeleted: "ყველა მონაცემი წაშლილია",
      dataExported: "მონაცემები ექსპორტირებულია",
      noData: "მონაცემი არ არის",
      yes: "დიახ",
      no: "არა",
    },
    en: {
      title: "My Data",
      description: "Manage your personal data and preferences here.",
      storedData: "Stored Data",
      localStorage: "Local Data (on your device)",
      orderId: "Order ID",
      language: "Language",
      currency: "Currency",
      gridColumns: "Grid Columns",
      cookieConsent: "Cookie Consent",
      exportData: "Export Data",
      exportDesc: "Download all your data in JSON format",
      deleteData: "Delete Data",
      deleteDesc: "Permanently delete all your data from this device",
      deleteWarning: "Warning!",
      deleteWarningText:
        "This action will delete all your data including orders and preferences. This action is irreversible.",
      cancel: "Cancel",
      confirmDelete: "Yes, delete everything",
      dataDeleted: "All data deleted",
      dataExported: "Data exported",
      noData: "No data",
      yes: "Yes",
      no: "No",
    },
    ru: {
      title: "Мои данные",
      description: "Управляйте своими персональными данными и настройками здесь.",
      storedData: "Сохраненные данные",
      localStorage: "Локальные данные (на вашем устройстве)",
      orderId: "ID заказа",
      language: "Язык",
      currency: "Валюта",
      gridColumns: "Колонки сетки",
      cookieConsent: "Согласие Cookie",
      exportData: "Экспорт данных",
      exportDesc: "Скачать все ваши данные в формате JSON",
      deleteData: "Удалить данные",
      deleteDesc: "Безвозвратно удалить все ваши данные с этого устройства",
      deleteWarning: "Внимание!",
      deleteWarningText:
        "Это действие удалит все ваши данные, включая заказы и настройки. Это действие необратимо.",
      cancel: "Отмена",
      confirmDelete: "Да, удалить всё",
      dataDeleted: "Все данные удалены",
      dataExported: "Данные экспортированы",
      noData: "Нет данных",
      yes: "Да",
      no: "Нет",
    },
  };

  const t = content[language] || content.en;

  // Get all localStorage data
  const getLocalStorageData = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key) || "";
      }
    }
    return data;
  };

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      localStorage: getLocalStorageData(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meni-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(t.dataExported, {
      style: {
        background: "#10b981",
        color: "white",
        border: "none",
      },
    });
  };

  const handleDeleteData = () => {
    localStorage.clear();
    setShowDeleteConfirm(false);

    toast.success(t.dataDeleted, {
      style: {
        background: "#10b981",
        color: "white",
        border: "none",
      },
    });

    // Redirect to home after 1.5 seconds
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const localData = getLocalStorageData();

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
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.description}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-20">
        {/* Stored Data Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t.storedData}
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {t.localStorage}
              </h3>
              <div className="bg-gray-50 rounded-md p-4 space-y-2">
                {Object.keys(localData).length === 0 ? (
                  <p className="text-sm text-gray-500">{t.noData}</p>
                ) : (
                  Object.entries(localData).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-start text-sm border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="font-medium text-gray-700 break-all pr-2">
                        {key}:
                      </span>
                      <span className="text-gray-600 text-right break-all">
                        {value.length > 50
                          ? `${value.substring(0, 50)}...`
                          : value}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="space-y-4">
          {/* Export Data */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900">
                  {t.exportData}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{t.exportDesc}</p>
                <Button
                  onClick={handleExportData}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.exportData}
                </Button>
              </div>
            </div>
          </div>

          {/* Delete Data */}
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900">
                  {t.deleteData}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{t.deleteDesc}</p>
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="destructive"
                  className="mt-3"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t.deleteData}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.deleteWarning}
                </h3>
              </div>
              <p className="text-gray-700 mb-6">{t.deleteWarningText}</p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={handleDeleteData}
                  variant="destructive"
                  className="flex-1"
                >
                  {t.confirmDelete}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
