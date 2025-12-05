import { type Language } from "../lib/translations";

export const privacyPolicyContent = {
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

export function getPrivacyContent(language: Language) {
  return (
    (privacyPolicyContent as Record<string, typeof privacyPolicyContent.en>)[
      language
    ] || privacyPolicyContent.en
  );
}

export const termsOfServiceContent = {
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

export function getTermsContent(language: Language) {
  return (
    (termsOfServiceContent as Record<string, typeof termsOfServiceContent.en>)[
      language
    ] || termsOfServiceContent.en
  );
}
