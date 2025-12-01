import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { type Language, getUITranslation } from "../lib/translations";
import { Button } from "../components/ui/button";

interface TermsOfServiceProps {
  language: Language;
}

export function TermsOfService({ language }: TermsOfServiceProps) {
  const navigate = useNavigate();

  const content = {
    ka: {
      title: "სერვისის გამოყენების პირობები",
      lastUpdated: "ბოლო განახლება: 1 დეკემბერი, 2025",
      sections: [
        {
          title: "1. სერვისის აღწერა",
          content: `meni.ge არის ციფრული მენიუს პლატფორმა, რომელიც საშუალებას აძლევს დაწესებულებებს უზრუნველყონ უკონტაქტო შეკვეთების მიღება.

სერვისი მოიცავს:
• ციფრული მენიუს ნახვა
• კერძების კალათაში დამატება
• შეკვეთის გაფორმება
• ენების მხარდაჭერა (27 ენა)
• ვალუტის გადაანგარიშება`,
        },
        {
          title: "2. მომხმარებლის პასუხისმგებლობა",
          content: `სერვისის გამოყენებით თქვენ:
• ეთანხმებით ამ პირობებს
• აღიარებთ, რომ თქვენ ხართ 18 წელზე მეტი ან მშობლის თანხმობით
• პასუხისმგებელი ხართ თქვენი შეკვეთის სიზუსტეზე
• ვალდებული ხართ გადაიხადოთ შეკვეთილი კერძები

აკრძალულია:
• სერვისის არასათანადო გამოყენება
• ყალბი შეკვეთების გაკეთება
• სისტემის ჰაკინგი ან მოშლა
• სხვა მომხმარებლების შეფერხება`,
        },
        {
          title: "3. შეკვეთები და გადახდა",
          content: `შეკვეთის პროცესი:
• შეკვეთა ფორმირდება თქვენს მოწყობილობაზე
• შეკვეთა გადაეცემა დაწესებულებას
• გადახდა ხდება დაწესებულებაში ადგილზე
• ფასები მითითებულია დაწესებულების ვალუტაში

მნიშვნელოვანი:
• ფასები შეიძლება შეიცვალოს ბრძანების გარეშე
• ვალუტის კონვერტაცია არის მიახლოებითი
• საბოლოო გადახდა ხდება დაწესებულების ვალუტაში
• დაწესებულებას აქვს უფლება უარი თქვას შეკვეთაზე`,
        },
        {
          title: "4. პლატფორმის პასუხისმგებლობა",
          content: `meni.ge არის მხოლოდ პლატფორმა და:
• არ არის პასუხისმგებელი კერძების ხარისხზე
• არ არის პასუხისმგებელი მიწოდების დროზე
• არ არის შუამავალი დაწესებულებასა და კლიენტს შორის
• არ იღებს გადახდებს ან კომისიას

პასუხისმგებლობა:
• კერძების ხარისხზე პასუხისმგებელია დაწესებულება
• შეკვეთის დამუშავებაზე პასუხისმგებელია დაწესებულება
• პრობლემების შემთხვევაში დაუკავშირდით დაწესებულებას`,
        },
        {
          title: "5. პასუხისმგებლობის შეზღუდვა",
          content: `meni.ge არ არის პასუხისმგებელი:
• პირდაპირი ზარალისთვის სერვისის გამოყენებით
• არაპირდაპირი ზარალისთვის
• მონაცემების დაკარგვისთვის
• ტექნიკური პრობლემებისთვის
• სერვისის ხელმისაწვდომობისთვის

მაქსიმალური პასუხისმგებლობა შემოიფარგლება თქვენი შეკვეთის თანხით.`,
        },
        {
          title: "6. ინტელექტუალური საკუთრება",
          content: `ყველა შიგთავსი, დიზაინი და კოდი:
• ეკუთვნის meni.ge-ს ან მის ლიცენზიარებს
• დაცულია საავტორო უფლებით
• არ შეიძლება გამოყენება ნებართვის გარეშე

დაწესებულებების შიგთავსი:
• კერძების აღწერა და ფოტოები ეკუთვნის დაწესებულებებს
• გამოიყენება ნებართვით`,
        },
        {
          title: "7. პირობების ცვლილება",
          content: `meni.ge იტოვებს უფლებას:
• შეცვალოს ეს პირობები ნებისმიერ დროს
• შეაჩეროს ან დახუროს სერვისი
• შეზღუდოს წვდომა მომხმარებლებისთვის

ცვლილებები ძალაში შედის დაუყოვნებლივ გამოქვეყნების შემდეგ.`,
        },
        {
          title: "8. გამოსაყენებელი კანონმდებლობა",
          content: `ეს პირობები რეგულირდება საქართველოს კანონმდებლობით.

დავების მოგვარება:
• პირველ რიგში მოლაპარაკებით
• შემდეგ მედიაციით
• საბოლოოდ სასამართლოში (თბილისი, საქართველო)`,
        },
        {
          title: "9. კონტაქტი",
          content: `კითხვების შემთხვევაში:
Email: legal@meni.ge
ვებსაიტი: https://meni.ge

ოპერატორი: meni.ge
მისამართი: თბილისი, საქართველო`,
        },
      ],
    },
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: December 1, 2025",
      sections: [
        {
          title: "1. Service Description",
          content: `meni.ge is a digital menu platform that enables establishments to provide contactless ordering.

The service includes:
• Digital menu viewing
• Adding items to cart
• Order placement
• Language support (27 languages)
• Currency conversion`,
        },
        {
          title: "2. User Responsibility",
          content: `By using the service you:
• Agree to these terms
• Confirm you are 18+ or have parental consent
• Are responsible for order accuracy
• Are obligated to pay for ordered items

Prohibited:
• Improper use of the service
• Placing fake orders
• Hacking or disrupting the system
• Interfering with other users`,
        },
        {
          title: "3. Orders and Payment",
          content: `Order process:
• Order is created on your device
• Order is transmitted to establishment
• Payment is made at the establishment
• Prices are in establishment's currency

Important:
• Prices may change without notice
• Currency conversion is approximate
• Final payment is in establishment's currency
• Establishment may refuse orders`,
        },
        {
          title: "4. Platform Responsibility",
          content: `meni.ge is only a platform and:
• Is not responsible for food quality
• Is not responsible for delivery time
• Is not an intermediary between establishment and client
• Does not collect payments or commissions

Responsibility:
• Food quality is establishment's responsibility
• Order processing is establishment's responsibility
• Contact the establishment for problems`,
        },
        {
          title: "5. Limitation of Liability",
          content: `meni.ge is not liable for:
• Direct damages from service use
• Indirect damages
• Data loss
• Technical problems
• Service availability

Maximum liability is limited to your order amount.`,
        },
        {
          title: "6. Intellectual Property",
          content: `All content, design and code:
• Belongs to meni.ge or its licensors
• Protected by copyright
• Cannot be used without permission

Establishment content:
• Item descriptions and photos belong to establishments
• Used with permission`,
        },
        {
          title: "7. Changes to Terms",
          content: `meni.ge reserves the right to:
• Change these terms at any time
• Suspend or close the service
• Restrict access for users

Changes take effect immediately upon publication.`,
        },
        {
          title: "8. Governing Law",
          content: `These terms are governed by Georgian law.

Dispute resolution:
• First by negotiation
• Then by mediation
• Finally in court (Tbilisi, Georgia)`,
        },
        {
          title: "9. Contact",
          content: `For questions:
Email: legal@meni.ge
Website: https://meni.ge

Operator: meni.ge
Address: Tbilisi, Georgia`,
        },
      ],
    },
    ru: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление: 1 декабря, 2025",
      sections: [
        {
          title: "1. Описание сервиса",
          content: `meni.ge - это платформа цифрового меню, которая позволяет заведениям предоставлять бесконтактные заказы.

Сервис включает:
• Просмотр цифрового меню
• Добавление блюд в корзину
• Оформление заказа
• Поддержка языков (27 языков)
• Конвертация валют`,
        },
        {
          title: "2. Ответственность пользователя",
          content: `Используя сервис, вы:
• Соглашаетесь с этими условиями
• Подтверждаете, что вам 18+ или есть согласие родителей
• Несете ответственность за точность заказа
• Обязаны оплатить заказанные блюда

Запрещено:
• Ненадлежащее использование сервиса
• Размещение поддельных заказов
• Взлом или нарушение работы системы
• Вмешательство в работу других пользователей`,
        },
        {
          title: "3. Заказы и оплата",
          content: `Процесс заказа:
• Заказ создается на вашем устройстве
• Заказ передается в заведение
• Оплата производится в заведении
• Цены указаны в валюте заведения

Важно:
• Цены могут изменяться без уведомления
• Конвертация валют приблизительная
• Окончательный расчет в валюте заведения
• Заведение может отказать в заказе`,
        },
        {
          title: "4. Ответственность платформы",
          content: `meni.ge является только платформой и:
• Не несет ответственности за качество блюд
• Не несет ответственности за время доставки
• Не является посредником между заведением и клиентом
• Не принимает платежи и комиссии

Ответственность:
• За качество блюд отвечает заведение
• За обработку заказа отвечает заведение
• При проблемах обращайтесь в заведение`,
        },
        {
          title: "5. Ограничение ответственности",
          content: `meni.ge не несет ответственности за:
• Прямой ущерб от использования сервиса
• Косвенный ущерб
• Потерю данных
• Технические проблемы
• Доступность сервиса

Максимальная ответственность ограничена суммой вашего заказа.`,
        },
        {
          title: "6. Интеллектуальная собственность",
          content: `Весь контент, дизайн и код:
• Принадлежит meni.ge или его лицензиарам
• Защищен авторским правом
• Не может использоваться без разрешения

Контент заведений:
• Описания и фото блюд принадлежат заведениям
• Используется с разрешения`,
        },
        {
          title: "7. Изменение условий",
          content: `meni.ge оставляет за собой право:
• Изменять эти условия в любое время
• Приостанавливать или закрывать сервис
• Ограничивать доступ для пользователей

Изменения вступают в силу сразу после публикации.`,
        },
        {
          title: "8. Применимое право",
          content: `Эти условия регулируются законодательством Грузии.

Разрешение споров:
• Сначала путем переговоров
• Затем путем медиации
• В конечном итоге в суде (Тбилиси, Грузия)`,
        },
        {
          title: "9. Контакты",
          content: `По вопросам:
Email: legal@meni.ge
Веб-сайт: https://meni.ge

Оператор: meni.ge
Адрес: Тбилиси, Грузия`,
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
      </main>
    </div>
  );
}
