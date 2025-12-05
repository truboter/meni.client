import { type Language } from "./translations";

// Each paragraph is stored separately for easier translation and modification
export interface PolicyParagraph {
  id: string;
  content: string;
}

export interface PolicySection {
  title: string;
  paragraphs: PolicyParagraph[];
}

export const privacyPolicyData = {
  en: {
    title: "Privacy Policy – meni.ge Customer Application",
    lastUpdated: "Last updated: 5 December 2025",
    intro: [
      {
        id: "intro-1",
        content: `This Privacy Policy explains how Individual Entrepreneur (Sole Proprietor) Andrei Verbitskii (Georgian TIN 305573448) ("we", "us", "our") collects and uses personal data when you use the customer-facing meni.ge application available at https://meni.ge and via QR codes in participating venues (the "Customer Application").`,
      },
      {
        id: "intro-2",
        content: `The Customer Application is part of the meni.ge platform used by cafés and restaurants to manage orders and guests. This Privacy Policy applies only to the Customer Application that guests and visitors see and use. In this Policy, we refer to the Customer Application and closely related features collectively as the "Service".`,
      },
      {
        id: "intro-3",
        content: `We are committed to protecting your privacy and processing your personal data in accordance with the EU General Data Protection Regulation (GDPR).`,
      },
    ],
    sections: [
      {
        title: "1. Data Controller and Contact Details",
        paragraphs: [
          {
            id: "s1-p1",
            content: `Data Controller
Individual Entrepreneur (Sole Proprietor) Andrei Verbitskii
Georgian TIN: 305573448`,
          },
          {
            id: "s1-p2",
            content: `Registered address (Georgia):
6010, საქართველო, ქალაქი ბათუმი, გრიგოლ ელიავას ქუჩა, N 32ე, სართული 2, ბინა N201ა`,
          },
          {
            id: "s1-p3",
            content: `Contact email for privacy matters: info@meni.ge`,
          },
          {
            id: "s1-p4",
            content: `We do not have representative offices or branches in other countries.
At the moment we have not appointed an EU/EEA representative or a Data Protection Officer (DPO). If this changes, we will update this Policy.`,
          },
        ],
      },
      {
        title: "2. Scope of this Policy",
        paragraphs: [
          {
            id: "s2-p1",
            content: `This Policy applies only to the customer-facing meni.ge application – the part of our platform that guests and visitors use to:

• Register and log in
• View menu items
• Place orders and transmit them to a waiter
• Allow staff to serve your order
• Create a caricature from your photo
• View your order history
• View your history of interactions with venues that use our platform`,
          },
          {
            id: "s2-p2",
            content: `The meni.ge platform also includes a separate back-office / administrative application used by venue staff and administrators. This Privacy Policy does not cover that back-office application; the processing of personal data in the back office may be described in separate privacy information provided to staff and venue operators.`,
          },
        ],
      },
      {
        title: "3. Personal data we collect",
        paragraphs: [
          {
            id: "s3-intro",
            content: `Depending on how you use the Service, we may collect the following categories of data.`,
          },
          {
            id: "s3-p1",
            content: `3.1 Registration and profile data

• Email address and/or mobile phone number
• Preferred name or nickname (for addressing you in the app and by staff)
• Authentication data (such as password hash, authentication tokens, login timestamps)`,
          },
          {
            id: "s3-p2",
            content: `3.2 Geolocation data

• Device location data (GPS, Wi-Fi, Bluetooth or similar), if you grant us access in your device or browser
• Approximate location derived from your IP address, where permitted by law`,
          },
          {
            id: "s3-p3",
            content: `3.3 Order and transaction data

• Items ordered, date, time and place of order
• Table number or area (where applicable)
• Order status and basic payment-related metadata (for example, method of payment, payment status)

As a rule, payment card data is processed by external payment providers in accordance with their own privacy policies. We do not store full card numbers or CVV/CVC codes.`,
          },
          {
            id: "s3-p4",
            content: `3.4 Photo and caricature data

• Photograph you upload or provide via your device's camera
• Caricature image generated from your photo
• Technical data and internal identifiers necessary to create, associate and store the caricature in your account`,
          },
          {
            id: "s3-p5",
            content: `3.5 Device and technical data

To ensure correct display and convenient repeat orders, we collect basic technical information, such as:

• Device type (for example, smartphone, tablet), operating system and version
• Screen size, orientation and other display parameters
• Browser or app version, language settings
• IP address and other technical identifiers (for example, device or installation ID)
• Log data about app events (for example, opening screens, button clicks, page load errors)`,
          },
          {
            id: "s3-p6",
            content: `3.6 Usage history and communication data

• History of your orders in venues that use our platform
• History of your interactions with different venues (for example, which venue you visited and when)
• Messages sent to venues via the Service
• Feedback, ratings and support requests related to venues or to the platform`,
          },
          {
            id: "s3-p7",
            content: `3.7 Analytics data (Google and Meta/Facebook)

We use analytics services Google Analytics 4, Firebase Analytics, Meta Pixel and Meta app events to understand how the Service is used and to improve it. These services may collect:

• Pseudonymous identifiers (for example, app instance ID, cookie ID)
• Aggregated usage statistics (e.g. number of visits, session duration)
• Interaction events (screens viewed, buttons pressed, features used)
• General technical data (device type, OS version, approximate location)

We configure these tools for analytics purposes only, not for advertising.`,
          },
          {
            id: "s3-p8",
            content: `3.8 Consent and preference data

• Your consents and preferences (for example, consent to analytics, geolocation, camera use for photos)
• Records of your requests regarding your data (access, deletion, etc.) and our responses`,
          },
        ],
      },
      {
        title: "4. Purposes and legal bases for processing",
        paragraphs: [
          {
            id: "s4-intro",
            content: `Under GDPR we must have a legal basis for each processing purpose. We use your data for:`,
          },
          {
            id: "s4-p1",
            content: `4.1 Providing the Service

• Creating and managing your account
• Allowing you to view the menu, place orders and send them to the waiter
• Displaying your order history and communication history

Legal bases:
• Performance of a contract (GDPR Art. 6(1)(b)) – to provide the Service you request
• Legitimate interests (Art. 6(1)(f)) – to operate and improve our café services`,
          },
          {
            id: "s4-p2",
            content: `4.2 Geolocation

• Showing nearby venues or the correct menu for your location
• Assigning your order to the correct café or table (where relevant)

Legal bases:
• Your consent (Art. 6(1)(a)) – when you enable location in the app or OS
• Legitimate interests (Art. 6(1)(f)) for approximate IP‑based location, where permitted, to prevent fraud and misuse

You can withdraw your consent to location at any time via your device/app settings. This will not affect processing already carried out.`,
          },
          {
            id: "s4-p3",
            content: `4.3 Creating photo caricatures

• Capturing your photo via camera or upload
• Generating and storing a caricature for display in the Service (for example, for fun, personalization, or interaction with staff)

Legal basis:
• Your consent (Art. 6(1)(a)) – you choose whether to provide a photo

You may delete your photo and caricature at any time via the profile / data deletion features, or by contacting us.`,
          },
          {
            id: "s4-p4",
            content: `4.4 Maintaining order and communication history

• Keeping a record of your past orders to speed up future orders
• Showing your history of interactions with venues
• Handling complaints, returns, or disputes

Legal bases:
• Performance of a contract (Art. 6(1)(b))
• Compliance with legal obligations (Art. 6(1)(c)) – e.g. accounting, tax or consumer protection laws
• Legitimate interests (Art. 6(1)(f)) – to improve service quality and handle disputes`,
          },
          {
            id: "s4-p5",
            content: `4.5 Device and technical data

• Ensuring the Service displays correctly on your device
• Securing our systems and preventing fraud or misuse
• Diagnosing and fixing technical issues

Legal basis:
• Legitimate interests (Art. 6(1)(f)) – to ensure security, performance and correct functioning of the Service`,
          },
          {
            id: "s4-p6",
            content: `4.6 Analytics (Google and Meta/Facebook)

We use analytics services provided by Google (e.g. Google Analytics / Firebase Analytics) and Meta/Facebook (e.g. Meta analytics tools) to understand how the Service is used and to improve it.

Purposes:
• Measuring which screens and features are used
• Understanding general usage patterns (e.g. peak times, device types)
• Improving usability and stability of the Service

Important:
We do not use analytics data to show you third‑party advertising in the Visitor Menu.

Where required by law, we obtain your consent before using analytics cookies or SDKs. You can withdraw your consent at any time via the app settings or your browser/device settings.

Legal bases:
• Your consent (Art. 6(1)(a)) for analytics where required
• Legitimate interests (Art. 6(1)(f)) – in markets where analytics without consent is lawfully allowed, to improve our services

Google and Meta may also process certain data as independent controllers; please see their own privacy policies for details.`,
          },
        ],
      },
      {
        title: "5. No use of data for advertising",
        paragraphs: [
          {
            id: "s5-p1",
            content: `We do not use your personal data from the Visitor Menu to:

• Display third‑party advertisements to you
• Build advertising profiles for third parties
• Sell or rent your data to advertisers or data brokers`,
          },
          {
            id: "s5-p2",
            content: `Analytics data is used only to understand and improve how the Service is used, not to show you targeted ads inside the Visitor Menu.`,
          },
        ],
      },
      {
        title: "6. Sharing of your personal data",
        paragraphs: [
          {
            id: "s6-p1",
            content: `We do not share your personal data with third parties for their own marketing or advertising purposes.`,
          },
          {
            id: "s6-p2",
            content: `We may share your data only with:

• Our platform and hosting providers – Infrastructure and cloud providers that host and store data on our behalf.

• Analytics providers – Google and Meta/Facebook, for analytics purposes as described above.

• Venue operators using our platform – When you place an order or interact with a specific café or restaurant, the operator of that venue receives the order and related information necessary to serve you (e.g. order details, table number, preferred name).

• Service providers and professional advisers – IT support, security, auditors, legal or accounting advisers, where necessary.

• Authorities and legal obligations – If required by law, court order or a competent authority, or to protect our rights or the rights of others.`,
          },
          {
            id: "s6-p3",
            content: `In all such cases, we limit access to what is necessary and ensure appropriate data processing agreements or other safeguards are in place.`,
          },
        ],
      },
      {
        title: "7. International data transfers",
        paragraphs: [
          {
            id: "s7-p1",
            content: `If your personal data is transferred outside the European Economic Area (EEA) or the United Kingdom, we will ensure that an adequate level of protection is provided, for example by:

• An adequacy decision of the European Commission, or
• Standard Contractual Clauses (SCCs) approved by the European Commission, and additional safeguards where necessary.`,
          },
          {
            id: "s7-p2",
            content: `Details of such transfers and safeguards are available on request.`,
          },
        ],
      },
      {
        title: "8. Data retention",
        paragraphs: [
          {
            id: "s8-p1",
            content: `We retain your personal data only for as long as necessary for the purposes described in this Policy, or as required by law. In particular:

• Account data – stored while your account is active and for [X] months/years after your last activity, unless you request earlier deletion.

• Order and communication history – stored for as long as needed for accounting, tax, and consumer law purposes, typically [Y] years (exact period depends on local law).

• Photos and caricatures – stored until you delete them, delete your account, or after [Z] months of inactivity, unless required longer for legal reasons.

• Analytics data – kept in accordance with our analytics providers' retention settings, typically between [A] and [B] months.`,
          },
          {
            id: "s8-p2",
            content: `Once data is no longer needed, we will delete it or anonymise it so that it can no longer identify you.`,
          },
        ],
      },
      {
        title: "9. Your rights under GDPR",
        paragraphs: [
          {
            id: "s9-p1",
            content: `Under GDPR, you have the following rights regarding your personal data:

• Right of access – to obtain confirmation whether we process your personal data and to receive a copy of it.

• Right to rectification – to have inaccurate or incomplete data corrected.

• Right to erasure ("right to be forgotten") – to request deletion of your personal data, subject to legal retention requirements.

• Right to restriction of processing – to request that we limit processing in certain circumstances.

• Right to data portability – to receive certain data in a structured, commonly used, machine‑readable format and to transmit it to another controller.

• Right to object – to object to processing based on our legitimate interests, including profiling.

• Right to withdraw consent – where processing is based on consent, you may withdraw it at any time; this does not affect processing carried out before withdrawal.

• Right to lodge a complaint – with your local data protection authority if you believe your rights have been violated.`,
          },
          {
            id: "s9-p2",
            content: `To exercise any of these rights, you can contact us at [privacy email] or use the tools described below.`,
          },
        ],
      },
      {
        title: "10. Data deletion page and self‑service controls",
        paragraphs: [
          {
            id: "s10-p1",
            content: `We provide a dedicated "Delete my data" function for your convenience:

In‑app / web page: You can request deletion of your account and associated personal data via our data deletion page:
[insert link or in‑app navigation path here, e.g. Settings → Privacy → Delete my data]`,
          },
          {
            id: "s10-p2",
            content: `Through this page or via your account settings, you can:

• Delete your account and profile data
• Delete photos and caricatures
• Request removal of your order and communication history, where legally permitted
• Withdraw consent for analytics and/or geolocation`,
          },
          {
            id: "s10-p3",
            content: `We will process your deletion request without undue delay and within the time limits required by GDPR, subject to legal retention obligations (for example, we may need to keep some transaction data for tax or accounting purposes).`,
          },
        ],
      },
      {
        title: "11. Security",
        paragraphs: [
          {
            id: "s11-p1",
            content: `We take appropriate technical and organisational measures to protect your personal data, including:

• Encryption in transit (e.g. HTTPS/TLS)
• Access controls and authentication for staff and systems
• Regular updates, monitoring and backups
• Limiting access to personal data to authorised personnel only`,
          },
          {
            id: "s11-p2",
            content: `However, no system is completely secure. If we become aware of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you and the relevant authorities as required by law.`,
          },
        ],
      },
      {
        title: "12. Children's privacy",
        paragraphs: [
          {
            id: "s12-p1",
            content: `The Visitor Menu is not intended for children under [13/16 – choose according to your law]. We do not knowingly collect personal data from children below the applicable age of digital consent without verifiable parental consent.`,
          },
          {
            id: "s12-p2",
            content: `If you believe that a child has provided us with personal data without appropriate consent, please contact us and we will take steps to delete such data.`,
          },
        ],
      },
      {
        title: "13. Changes to this Policy",
        paragraphs: [
          {
            id: "s13-p1",
            content: `We may update this Privacy Policy from time to time. When we make material changes, we will:

• Update the "Last updated" date at the top, and
• Provide additional notice in the Service where appropriate.`,
          },
          {
            id: "s13-p2",
            content: `We encourage you to review this Policy regularly to stay informed about how we process your data.`,
          },
        ],
      },
      {
        title: "14. Contact us",
        paragraphs: [
          {
            id: "s14-p1",
            content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:

[Data Protection / Privacy Contact]
Email: [privacy email]
Postal address: [postal address]`,
          },
          {
            id: "s14-p2",
            content: `You may also lodge a complaint with your local data protection authority. A list of EU data protection authorities is available on the website of the European Data Protection Board.`,
          },
        ],
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    lastUpdated: "Последнее обновление: 5 декабря 2025",
    intro: [
      {
        id: "intro-1",
        content: `Настоящая Политика конфиденциальности объясняет, как [Название компании] («мы», «нас», «наш») собирает и использует персональные данные, когда вы используете Меню для посетителей нашей системы автоматизации кафе («Сервис»).`,
      },
      {
        id: "intro-2",
        content: `Мы привержены защите вашей конфиденциальности и обработке ваших персональных данных в соответствии с Общим регламентом ЕС по защите данных (GDPR).`,
      },
    ],
    sections: [
      {
        title: "1. Кто отвечает за ваши данные?",
        paragraphs: [
          {
            id: "s1-p1",
            content: `Контролер данных:\n[Название компании]\nЗарегистрированный адрес: [Адрес]\nEmail: [Email для вопросов конфиденциальности]\nТелефон: [Номер телефона]`,
          },
          {
            id: "s1-p2",
            content: `Если мы используем поставщика технологической платформы для размещения и эксплуатации Сервиса, этот поставщик выступает в качестве нашего обработчика данных, обрабатывая персональные данные только по нашим инструкциям.`,
          },
          {
            id: "s1-p3",
            content: `Если это требуется по закону, мы также можем назначить представителя в ЕС/ЕЭЗ и/или сотрудника по защите данных; их контактная информация будет опубликована здесь.`,
          },
        ],
      },
      {
        title: "2. Область применения настоящей Политики",
        paragraphs: [
          {
            id: "s2-p1",
            content: `Настоящая Политика применяется только к разделу меню для посетителей нашего приложения автоматизации кафе — части, которую вы используете для:

• Регистрации и входа в систему
• Просмотра пунктов меню
• Размещения заказов и отправки их официанту
• Создания карикатуры из вашей фотографии
• Просмотра истории заказов и истории общения с заведениями`,
          },
          {
            id: "s2-p2",
            content: `Другие части наших систем (для персонала, поставщиков и т. д.) могут быть охвачены отдельной документацией по конфиденциальности.`,
          },
        ],
      },
      {
        title: "3. Персональные данные, которые мы собираем",
        paragraphs: [
          {
            id: "s3-intro",
            content: `В зависимости от того, как вы используете Сервис, мы можем собирать следующие категории данных:`,
          },
          {
            id: "s3-p1",
            content: `3.1 Регистрационные данные и данные профиля

• Адрес электронной почты и/или номер мобильного телефона
• Предпочитаемое имя или псевдоним (для обращения к вам в приложении и персоналом)
• Данные аутентификации (хеш пароля, токены аутентификации, метки времени входа)`,
          },
          {
            id: "s3-p2",
            content: `3.2 Данные геолокации

• Данные о местоположении устройства (GPS, Wi-Fi, Bluetooth или аналогичные), если вы предоставили нам доступ
• Приблизительное местоположение, полученное из вашего IP-адреса (где это разрешено законом)`,
          },
          {
            id: "s3-p3",
            content: `3.3 Данные о заказах и транзакциях

• Заказанные позиции, время и место заказа
• Номер столика (где применимо)
• Статус заказа и метаданные, связанные с оплатой (мы не обязательно храним полные реквизиты платежной карты — это зависит от интегрированного платежного провайдера; см. их собственную политику конфиденциальности)`,
          },
          {
            id: "s3-p4",
            content: `3.4 Данные фотографий и карикатур

• Фотография, которую вы загружаете или предоставляете через камеру вашего устройства
• Изображение карикатуры, созданное из вашей фотографии
• Технические данные, необходимые для создания и хранения карикатуры (например, внутренние идентификаторы)`,
          },
          {
            id: "s3-p5",
            content: `3.5 Данные об устройстве и технические данные

• Тип устройства, операционная система, размер и ориентация экрана
• Версия браузера или приложения, языковые настройки
• IP-адрес и другие идентификаторы (например, ID устройства или установки)
• Журналы событий приложения (например, открытие страниц, нажатие кнопок), используемые для улучшения производительности и надежности`,
          },
          {
            id: "s3-p6",
            content: `3.6 История использования и данные о коммуникациях

• История ваших заказов в наших кафе
• История ваших взаимодействий с различными заведениями, использующими нашу платформу
• Отзывы, которые вы предоставляете, сообщения, отправленные в заведение через Сервис, запросы в службу поддержки`,
          },
          {
            id: "s3-p7",
            content: `3.7 Аналитические данные

Аналитические данные, собираемые через сторонних провайдеров (Google и Meta/Facebook), такие как:
• Агрегированная статистика использования
• Псевдонимные идентификаторы, используемые для аналитики (не для рекламы)
• События взаимодействия (просмотренные экраны, нажатые кнопки, используемые функции)`,
          },
          {
            id: "s3-p8",
            content: `3.8 Данные о согласиях и предпочтениях

• Ваши согласия и выборы (например, доступ к местоположению, согласие на аналитику)
• Записи ваших запросов относительно ваших данных (доступ, удаление и т. д.)`,
          },
        ],
      },
      {
        title: "4. Цели и правовые основания для обработки",
        paragraphs: [
          {
            id: "s4-intro",
            content: `В соответствии с GDPR мы должны иметь правовое основание для каждой цели обработки. Мы используем ваши данные для:`,
          },
          {
            id: "s4-p1",
            content: `4.1 Предоставление Сервиса

• Создание и управление вашей учетной записью
• Предоставление возможности просматривать меню, размещать заказы и отправлять их официанту
• Отображение истории заказов и истории общения

Правовые основания:
• Исполнение договора (GDPR ст. 6(1)(b)) — для предоставления запрашиваемого вами Сервиса
• Законные интересы (ст. 6(1)(f)) — для работы и улучшения наших услуг кафе`,
          },
          {
            id: "s4-p2",
            content: `4.2 Геолокация

• Показ ближайших заведений или правильного меню для вашего местоположения
• Назначение вашего заказа правильному кафе или столику (где применимо)

Правовые основания:
• Ваше согласие (ст. 6(1)(a)) — когда вы включаете местоположение в приложении или ОС
• Законные интересы (ст. 6(1)(f)) для приблизительного определения местоположения по IP, где это разрешено, для предотвращения мошенничества и злоупотреблений

Вы можете отозвать свое согласие на определение местоположения в любое время через настройки вашего устройства/приложения. Это не повлияет на уже выполненную обработку.`,
          },
          {
            id: "s4-p3",
            content: `4.3 Создание фото-карикатур

• Захват вашей фотографии через камеру или загрузку
• Создание и хранение карикатуры для отображения в Сервисе (например, для развлечения, персонализации или взаимодействия с персоналом)

Правовое основание:
• Ваше согласие (ст. 6(1)(a)) — вы выбираете, предоставлять ли фотографию

Вы можете удалить свою фотографию и карикатуру в любое время через функции профиля / удаления данных или связавшись с нами.`,
          },
          {
            id: "s4-p4",
            content: `4.4 Ведение истории заказов и коммуникаций

• Хранение записей о ваших прошлых заказах для ускорения будущих заказов
• Показ истории ваших взаимодействий с заведениями
• Обработка жалоб, возвратов или споров

Правовые основания:
• Исполнение договора (ст. 6(1)(b))
• Соблюдение правовых обязательств (ст. 6(1)(c)) — например, бухгалтерский учет, налоговое или потребительское законодательство
• Законные интересы (ст. 6(1)(f)) — для улучшения качества обслуживания и разрешения споров`,
          },
          {
            id: "s4-p5",
            content: `4.5 Данные об устройстве и технические данные

• Обеспечение корректного отображения Сервиса на вашем устройстве
• Защита наших систем и предотвращение мошенничества или злоупотреблений
• Диагностика и устранение технических проблем

Правовое основание:
• Законные интересы (ст. 6(1)(f)) — для обеспечения безопасности, производительности и корректной работы Сервиса`,
          },
          {
            id: "s4-p6",
            content: `4.6 Аналитика (Google и Meta/Facebook)

Мы используем аналитические сервисы, предоставляемые Google (например, Google Analytics / Firebase Analytics) и Meta/Facebook (например, инструменты аналитики Meta), чтобы понять, как используется Сервис, и улучшить его.

Цели:
• Измерение того, какие экраны и функции используются
• Понимание общих шаблонов использования (например, пиковое время, типы устройств)
• Улучшение удобства использования и стабильности Сервиса

Важно:
Мы не используем аналитические данные для показа вам рекламы третьих лиц в Меню для посетителей.

Когда это требуется законом, мы получаем ваше согласие перед использованием аналитических файлов cookie или SDK. Вы можете отозвать свое согласие в любое время через настройки приложения или настройки браузера/устройства.

Правовые основания:
• Ваше согласие (ст. 6(1)(a)) для аналитики, где это требуется
• Законные интересы (ст. 6(1)(f)) — на рынках, где аналитика без согласия разрешена законом, для улучшения наших услуг

Google и Meta также могут обрабатывать определенные данные в качестве независимых контролеров; см. их собственные политики конфиденциальности для получения подробностей.`,
          },
        ],
      },
      {
        title: "5. Неиспользование данных для рекламы",
        paragraphs: [
          {
            id: "s5-p1",
            content: `Мы не используем ваши персональные данные из Меню для посетителей для:

• Показа вам рекламы третьих лиц
• Создания рекламных профилей для третьих лиц
• Продажи или аренды ваших данных рекламодателям или брокерам данных`,
          },
          {
            id: "s5-p2",
            content: `Аналитические данные используются только для понимания и улучшения того, как используется Сервис, а не для показа вам таргетированной рекламы внутри Меню для посетителей.`,
          },
        ],
      },
      {
        title: "6. Передача ваших персональных данных",
        paragraphs: [
          {
            id: "s6-p1",
            content: `Мы не передаем ваши персональные данные третьим лицам для их собственных маркетинговых или рекламных целей.`,
          },
          {
            id: "s6-p2",
            content: `Мы можем передавать ваши данные только:

• Нашим поставщикам платформ и хостинга — провайдерам инфраструктуры и облачных сервисов, которые размещают и хранят данные от нашего имени.

• Поставщикам аналитики — Google и Meta/Facebook, для целей аналитики, как описано выше.

• Операторам заведений, использующим нашу платформу — когда вы размещаете заказ или взаимодействуете с конкретным кафе или рестораном, оператор этого заведения получает заказ и связанную информацию, необходимую для вашего обслуживания (например, детали заказа, номер столика, предпочитаемое имя).

• Поставщикам услуг и профессиональным консультантам — ИТ-поддержка, безопасность, аудиторы, юридические или бухгалтерские консультанты, где это необходимо.

• Органам власти и правовым обязательствам — если это требуется по закону, судебному постановлению или компетентному органу, или для защиты наших прав или прав других лиц.`,
          },
          {
            id: "s6-p3",
            content: `Во всех таких случаях мы ограничиваем доступ тем, что необходимо, и обеспечиваем наличие соответствующих соглашений об обработке данных или других гарантий.`,
          },
        ],
      },
      {
        title: "7. Международные передачи данных",
        paragraphs: [
          {
            id: "s7-p1",
            content: `Если ваши персональные данные передаются за пределы Европейской экономической зоны (ЕЭЗ) или Соединенного Королевства, мы обеспечим надлежащий уровень защиты, например, посредством:

• Решения о достаточности Европейской комиссии, или
• Стандартных договорных оговорок (СДО), утвержденных Европейской комиссией, и дополнительных гарантий при необходимости.`,
          },
          {
            id: "s7-p2",
            content: `Подробная информация о таких передачах и гарантиях доступна по запросу.`,
          },
        ],
      },
      {
        title: "8. Хранение данных",
        paragraphs: [
          {
            id: "s8-p1",
            content: `Мы храним ваши персональные данные только в течение времени, необходимого для целей, описанных в настоящей Политике, или в соответствии с требованиями законодательства. В частности:

• Данные учетной записи — хранятся, пока ваша учетная запись активна, и в течение [X] месяцев/лет после вашей последней активности, если вы не запросите более раннее удаление.

• История заказов и коммуникаций — хранится в течение времени, необходимого для бухгалтерских, налоговых и потребительских законодательных целей, обычно [Y] лет (точный период зависит от местного законодательства).

• Фотографии и карикатуры — хранятся до тех пор, пока вы их не удалите, не удалите свою учетную запись или после [Z] месяцев неактивности, если не требуется дольше по юридическим причинам.

• Аналитические данные — хранятся в соответствии с настройками хранения наших поставщиков аналитики, обычно от [A] до [B] месяцев.`,
          },
          {
            id: "s8-p2",
            content: `После того как данные больше не нужны, мы удалим их или анонимизируем, чтобы они больше не могли вас идентифицировать.`,
          },
        ],
      },
      {
        title: "9. Ваши права в соответствии с GDPR",
        paragraphs: [
          {
            id: "s9-p1",
            content: `В соответствии с GDPR у вас есть следующие права в отношении ваших персональных данных:

• Право на доступ — получить подтверждение того, обрабатываем ли мы ваши персональные данные, и получить их копию.

• Право на исправление — исправить неточные или неполные данные.

• Право на удаление («право быть забытым») — запросить удаление ваших персональных данных с учетом требований законодательства о хранении.

• Право на ограничение обработки — запросить ограничение обработки в определенных обстоятельствах.

• Право на переносимость данных — получить определенные данные в структурированном, часто используемом, машиночитаемом формате и передать их другому контролеру.

• Право на возражение — возражать против обработки на основе наших законных интересов, включая профилирование.

• Право отозвать согласие — если обработка основана на согласии, вы можете отозвать его в любое время; это не влияет на обработку, выполненную до отзыва.

• Право подать жалобу — в ваш местный орган по защите данных, если вы считаете, что ваши права были нарушены.`,
          },
          {
            id: "s9-p2",
            content: `Чтобы воспользоваться любым из этих прав, вы можете связаться с нами по адресу [privacy email] или использовать инструменты, описанные ниже.`,
          },
        ],
      },
      {
        title: "10. Страница удаления данных и средства самообслуживания",
        paragraphs: [
          {
            id: "s10-p1",
            content: `Для вашего удобства мы предоставляем специальную функцию «Удалить мои данные»:

В приложении / веб-странице: Вы можете запросить удаление своей учетной записи и связанных персональных данных через нашу страницу удаления данных:
[вставьте ссылку или путь навигации в приложении, например, Настройки → Конфиденциальность → Удалить мои данные]`,
          },
          {
            id: "s10-p2",
            content: `Через эту страницу или через настройки вашей учетной записи вы можете:

• Удалить свою учетную запись и данные профиля
• Удалить фотографии и карикатуры
• Запросить удаление истории заказов и коммуникаций, где это разрешено законом
• Отозвать согласие на аналитику и/или геолокацию`,
          },
          {
            id: "s10-p3",
            content: `Мы обработаем ваш запрос на удаление без неоправданной задержки и в сроки, требуемые GDPR, с учетом законодательных обязательств по хранению (например, нам может потребоваться сохранить некоторые транзакционные данные для налоговых или бухгалтерских целей).`,
          },
        ],
      },
      {
        title: "11. Безопасность",
        paragraphs: [
          {
            id: "s11-p1",
            content: `Мы принимаем соответствующие технические и организационные меры для защиты ваших персональных данных, включая:

• Шифрование при передаче (например, HTTPS/TLS)
• Контроль доступа и аутентификация для персонала и систем
• Регулярные обновления, мониторинг и резервное копирование
• Ограничение доступа к персональным данным только уполномоченным персоналом`,
          },
          {
            id: "s11-p2",
            content: `Однако ни одна система не является полностью безопасной. Если мы узнаем о нарушении персональных данных, которое может привести к высокому риску для ваших прав и свобод, мы уведомим вас и соответствующие органы в соответствии с требованиями законодательства.`,
          },
        ],
      },
      {
        title: "12. Конфиденциальность детей",
        paragraphs: [
          {
            id: "s12-p1",
            content: `Меню для посетителей не предназначено для детей младше [13/16 – выберите в соответствии с вашим законодательством]. Мы сознательно не собираем персональные данные детей младше применимого возраста цифрового согласия без проверяемого родительского согласия.`,
          },
          {
            id: "s12-p2",
            content: `Если вы считаете, что ребенок предоставил нам персональные данные без соответствующего согласия, пожалуйста, свяжитесь с нами, и мы примем меры для удаления таких данных.`,
          },
        ],
      },
      {
        title: "13. Изменения в настоящей Политике",
        paragraphs: [
          {
            id: "s13-p1",
            content: `Мы можем обновлять настоящую Политику конфиденциальности время от времени. Когда мы вносим существенные изменения, мы:

• Обновим дату «Последнее обновление» вверху, и
• Предоставим дополнительное уведомление в Сервисе, где это уместно.`,
          },
          {
            id: "s13-p2",
            content: `Мы рекомендуем вам регулярно просматривать настоящую Политику, чтобы оставаться в курсе того, как мы обрабатываем ваши данные.`,
          },
        ],
      },
      {
        title: "14. Свяжитесь с нами",
        paragraphs: [
          {
            id: "s14-p1",
            content: `Если у вас есть какие-либо вопросы, опасения или запросы относительно настоящей Политики конфиденциальности или наших практик обработки данных, пожалуйста, свяжитесь:

[Контакт по защите данных / конфиденциальности]
Email: [privacy email]
Почтовый адрес: [postal address]`,
          },
          {
            id: "s14-p2",
            content: `Вы также можете подать жалобу в ваш местный орган по защите данных. Список органов по защите данных ЕС доступен на веб-сайте Европейского совета по защите данных.`,
          },
        ],
      },
    ],
  },
  ka: null,
};

export function getPrivacyPolicyContent(language: Language) {
  return (
    privacyPolicyData[language as keyof typeof privacyPolicyData] ||
    privacyPolicyData.en
  );
}
