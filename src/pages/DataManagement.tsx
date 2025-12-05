import { useState, useEffect } from "react";
import { X, Trash, Download, Warning } from "@phosphor-icons/react";
import { type Language } from "../lib/translations";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import * as consentManager from "../lib/consentManager";
import { deleteOrder } from "../lib/orderService";

const ORDER_ID_STORAGE_KEY = "meni_order_id";

interface DataManagementProps {
  language: Language;
  onClose: () => void;
  isOpen?: boolean;
}

export function DataManagement({
  language,
  onClose,
  isOpen = true,
}: DataManagementProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen) return null;

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
      deleteDesc: "სამუდამოდ წაშალეთ ყველა თქვენი მონაცემი ამ მოწყობილობიდან",
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
      description:
        "Управляйте своими персональными данными и настройками здесь.",
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

  const t =
    (content as Record<string, typeof content.en>)[language] || content.en;

  // Get storage type
  const storageType = consentManager.getStorageType();

  // Block body scroll when modal is open
  useEffect(() => {
    // Save original overflow style
    const originalOverflow = document.body.style.overflow;

    // Block scroll
    document.body.style.overflow = "hidden";

    // Restore on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      storageType,
      data: consentManager.getAllData(),
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

  const handleDeleteData = async () => {
    // Get orderId before clearing data
    const orderId = consentManager.getItem(ORDER_ID_STORAGE_KEY);

    // Delete order from S3 if it exists
    if (orderId) {
      try {
        await deleteOrder(orderId);
        console.log("Order deleted from S3:", orderId);
      } catch (error) {
        console.error("Failed to delete order from S3:", error);
      }
    }

    // Clear all local data (localStorage/memory)
    consentManager.clearAllData();
    setShowDeleteConfirm(false);

    toast.success(t.dataDeleted, {
      style: {
        background: "#10b981",
        color: "white",
        border: "none",
      },
    });

    // Close dialog after a short delay
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const localData = consentManager.getAllData();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 p-6 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.title}</h2>
            <p className="text-sm text-gray-500">{t.description}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 pb-20">
            {/* Storage Type Info */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                {language === "ka" && (
                  <>
                    <strong>მონაცემთა შენახვის ტიპი:</strong>{" "}
                    {storageType === "localStorage"
                      ? "localStorage (მოწყობილობა)"
                      : "მეხსიერება (დროებითი)"}
                  </>
                )}
                {language === "ru" && (
                  <>
                    <strong>Тип хранения:</strong>{" "}
                    {storageType === "localStorage"
                      ? "localStorage (устройство)"
                      : "Память (временно)"}
                  </>
                )}
                {language === "en" && (
                  <>
                    <strong>Storage Type:</strong>{" "}
                    {storageType === "localStorage"
                      ? "localStorage (device)"
                      : "Memory (temporary)"}
                  </>
                )}
                {!(["ka", "ru", "en"] as string[]).includes(language) && (
                  <>
                    <strong>Storage Type:</strong>{" "}
                    {storageType === "localStorage"
                      ? "localStorage (device)"
                      : "Memory (temporary)"}
                  </>
                )}
              </p>
            </div>
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
                  <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
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
                  <div className="shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Trash className="w-5 h-5 text-red-600" />
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
                      <Trash className="w-4 h-4 mr-2" />
                      {t.deleteData}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Warning className="w-6 h-6 text-red-600" weight="fill" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {t.deleteWarning}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 text-base leading-relaxed">
                    {t.deleteWarningText}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => setShowDeleteConfirm(false)}
                      variant="outline"
                      className="flex-1 h-11"
                      size="lg"
                    >
                      {t.cancel}
                    </Button>
                    <Button
                      onClick={handleDeleteData}
                      className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-semibold"
                      size="lg"
                    >
                      {t.confirmDelete}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
