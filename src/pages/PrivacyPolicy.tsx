import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { type Language, getUITranslation } from "../lib/translations";
import { Button } from "../components/ui/button";

interface PrivacyPolicyProps {
  language: Language;
}

export function PrivacyPolicy({ language }: PrivacyPolicyProps) {
  const navigate = useNavigate();

  const content = {
    ka: {
      title: "კონფიდენციალურობის პოლიტიკა",
      lastUpdated: "ბოლო განახლება: 1 დეკემბერი, 2025",
      sections: [
        {
          title: "1. რა მონაცემებს ვაგროვებთ",
          content: `ჩვენ ვაგროვებთ და ვინახავთ შემდეგ მონაცემებს თქვენს მოწყობილობაზე (localStorage):
• თქვენი შეკვეთები და კალათის შიგთავსი
• ენის პარამეტრები
• ვალუტის პარამეტრები
• სხვა UI პარამეტრები (ბადის სვეტები)

ამასთან, შეკვეთები ინახება ჩვენს სერვერზე (AWS S3) შემდეგი ფორმატით:
• შეკვეთის უნიკალური ID
• შეკვეთილი კერძები და მათი რაოდენობა
• შეკვეთის თარიღი და დრო`,
        },
        {
          title: "2. როგორ ვიყენებთ თქვენს მონაცემებს",
          content: `თქვენი მონაცემები გამოიყენება მხოლოდ:
• თქვენი შეკვეთების დამუშავებისთვის
• თქვენი პარამეტრების შესანარჩუნებლად
• სერვისის გაუმჯობესებისთვის

ჩვენ არასოდეს:
• არ ვყიდით თქვენს მონაცემებს მესამე მხარეებს
• არ ვიყენებთ მათ რეკლამის მიზნებისთვის
• არ ვუზიარებთ მათ პარტნიორებს თქვენი თანხმობის გარეშე`,
        },
        {
          title: "3. სად ინახება თქვენი მონაცემები",
          content: `მონაცემები ინახება ორ ადგილას:
• თქვენს მოწყობილობაზე (localStorage): ენა, ვალუტა, UI პარამეტრები
• ჩვენს სერვერებზე (AWS S3, ევროპა): შეკვეთები

ყველა მონაცემი დაცულია და შენახულია უსაფრთხო სერვერებზე.`,
        },
        {
          title: "4. რამდენ ხანს ინახება მონაცემები",
          content: `• localStorage მონაცემები: სანამ არ წაშლით მათ ან browser cache-ს
• S3 შეკვეთები: 90 დღე შეკვეთის შექმნიდან
• შეკვეთების ისტორია: შენახული ხდება რესტორნის ადმინისტრაციისთვის

თქვენ შეგიძლიათ ნებისმიერ დროს მოითხოვოთ თქვენი მონაცემების წაშლა.`,
        },
        {
          title: "5. თქვენი უფლებები",
          content: `თქვენ გაქვთ უფლება:
• ნახოთ რა მონაცემები ინახება თქვენ შესახებ
• წაშალოთ თქვენი ყველა მონაცემი
• შეცვალოთ ან განაახლოთ თქვენი მონაცემები
• უარი თქვათ მონაცემების შეგროვებაზე (ამ შემთხვევაში სერვისი არ იმუშავებს)
• ექსპორტი გაუკეთოთ თქვენს მონაცემებს

მონაცემების წასაშლელად, გადადით "პარამეტრები" → "ჩემი მონაცემები" → "წაშლა".`,
        },
        {
          title: "6. Cookie-ები და თვალთვალი",
          content: `ჩვენ ვიყენებთ მხოლოდ აუცილებელ cookie-ებს (localStorage) სერვისის ფუნქციონირებისთვის.
არ ვიყენებთ:
• თვალთვალის cookie-ებს
• მესამე მხარის თვალთვალს
• რეკლამის cookie-ებს
• ანალიტიკის სერვისებს (Google Analytics, და ა.შ.)`,
        },
        {
          title: "7. კონტაქტი",
          content: `თუ გაქვთ კითხვები კონფიდენციალურობის პოლიტიკასთან დაკავშირებით:
Email: privacy@meni.ge
ვებსაიტი: https://meni.ge`,
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 1, 2025",
      sections: [
        {
          title: "1. What Data We Collect",
          content: `We collect and store the following data on your device (localStorage):
• Your orders and cart contents
• Language preferences
• Currency preferences
• Other UI settings (grid columns)

Additionally, orders are stored on our servers (AWS S3) in the following format:
• Unique order ID
• Ordered items and their quantities
• Order date and time`,
        },
        {
          title: "2. How We Use Your Data",
          content: `Your data is used only for:
• Processing your orders
• Maintaining your preferences
• Improving our service

We never:
• Sell your data to third parties
• Use it for advertising purposes
• Share it with partners without your consent`,
        },
        {
          title: "3. Where Your Data is Stored",
          content: `Data is stored in two locations:
• On your device (localStorage): language, currency, UI settings
• On our servers (AWS S3, Europe): orders

All data is protected and stored on secure servers.`,
        },
        {
          title: "4. How Long Data is Stored",
          content: `• localStorage data: until you delete it or clear browser cache
• S3 orders: 90 days from order creation
• Order history: kept for restaurant administration

You can request deletion of your data at any time.`,
        },
        {
          title: "5. Your Rights",
          content: `You have the right to:
• View what data is stored about you
• Delete all your data
• Change or update your data
• Refuse data collection (service won't work in this case)
• Export your data

To delete your data, go to "Settings" → "My Data" → "Delete".`,
        },
        {
          title: "6. Cookies and Tracking",
          content: `We only use essential cookies (localStorage) for service functionality.
We do not use:
• Tracking cookies
• Third-party tracking
• Advertising cookies
• Analytics services (Google Analytics, etc.)`,
        },
        {
          title: "7. Contact",
          content: `If you have questions about this Privacy Policy:
Email: privacy@meni.ge
Website: https://meni.ge`,
        },
      ],
    },
    ru: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 1 декабря, 2025",
      sections: [
        {
          title: "1. Какие данные мы собираем",
          content: `Мы собираем и храним следующие данные на вашем устройстве (localStorage):
• Ваши заказы и содержимое корзины
• Языковые предпочтения
• Предпочтения по валюте
• Другие настройки UI (колонки сетки)

Кроме того, заказы хранятся на наших серверах (AWS S3) в следующем формате:
• Уникальный ID заказа
• Заказанные позиции и их количество
• Дата и время заказа`,
        },
        {
          title: "2. Как мы используем ваши данные",
          content: `Ваши данные используются только для:
• Обработки ваших заказов
• Сохранения ваших настроек
• Улучшения нашего сервиса

Мы никогда:
• Не продаем ваши данные третьим лицам
• Не используем их для рекламных целей
• Не делимся ими с партнерами без вашего согласия`,
        },
        {
          title: "3. Где хранятся ваши данные",
          content: `Данные хранятся в двух местах:
• На вашем устройстве (localStorage): язык, валюта, настройки UI
• На наших серверах (AWS S3, Европа): заказы

Все данные защищены и хранятся на безопасных серверах.`,
        },
        {
          title: "4. Как долго хранятся данные",
          content: `• Данные localStorage: пока вы не удалите их или кеш браузера
• Заказы S3: 90 дней с момента создания заказа
• История заказов: сохраняется для администрации ресторана

Вы можете запросить удаление своих данных в любое время.`,
        },
        {
          title: "5. Ваши права",
          content: `Вы имеете право:
• Просмотреть, какие данные хранятся о вас
• Удалить все ваши данные
• Изменить или обновить ваши данные
• Отказаться от сбора данных (в этом случае сервис не будет работать)
• Экспортировать ваши данные

Для удаления данных перейдите в "Настройки" → "Мои данные" → "Удалить".`,
        },
        {
          title: "6. Cookies и отслеживание",
          content: `Мы используем только необходимые cookies (localStorage) для функционирования сервиса.
Мы не используем:
• Отслеживающие cookies
• Отслеживание третьих лиц
• Рекламные cookies
• Сервисы аналитики (Google Analytics и т.д.)`,
        },
        {
          title: "7. Контакты",
          content: `Если у вас есть вопросы о Политике конфиденциальности:
Email: privacy@meni.ge
Веб-сайт: https://meni.ge`,
        },
      ],
    },
  };

  const { title, lastUpdated, sections } =
    content[language] || content.en;

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
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{lastUpdated}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-20">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`p-6 ${
                index !== sections.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {section.title}
              </h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            {language === "ka" && (
              <>
                ეს პოლიტიკა შესაბამისია GDPR (General Data Protection Regulation)
                მოთხოვნებთან.
              </>
            )}
            {language === "ru" && (
              <>
                Эта политика соответствует требованиям GDPR (General Data
                Protection Regulation).
              </>
            )}
            {language === "en" && (
              <>
                This policy complies with GDPR (General Data Protection
                Regulation) requirements.
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
