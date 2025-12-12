# Настройка авторизации AWS Amplify

## Обзор

В приложении реализована авторизация пользователей с использованием AWS Amplify Gen 2. Пользователи могут войти через:
- Email и пароль
- Социальные сети (Google, Facebook, Amazon)

## Текущий статус

✅ **Реализовано:**
- Компонент AuthDialog для входа/регистрации
- Интеграция с VenueHeader
- Проверка авторизации при клике на кнопку профиля
- Переводы на грузинский, английский и русский языки
- Инициализация Amplify в приложении

⚠️ **Требуется настройка:**
- Развертывание AWS Amplify backend
- Настройка провайдеров социальных сетей

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Amplify Sandbox

```bash
npx ampx sandbox --identifier meni-client
```

**Важно:** Sandbox работает с **существующими production ресурсами**:
- Cognito User Pool: `eu-central-1_vHbpSrCvL`
- Identity Pool: `eu-central-1:8150cddb-da73-483a-8601-95e4fd98411b`
- S3 bucket для заказов

Sandbox НЕ создает новые ресурсы, а синхронизирует локальные изменения в `amplify/` с существующими AWS ресурсами.

### 3. Автозапуск в VS Code

При открытии проекта в VS Code, Sandbox запускается автоматически. См. `docs/VSCODE_AUTOSTART.md`

## Настройка социальных провайдеров

### Google OAuth

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте проект или выберите существующий
3. Включите Google+ API
4. Создайте OAuth 2.0 Client ID:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.auth.region.amazoncognito.com/oauth2/idpresponse`
5. Сохраните Client ID и Client Secret

### Facebook Login

1. Перейдите в [Facebook Developers](https://developers.facebook.com/)
2. Создайте приложение
3. Добавьте продукт "Facebook Login"
4. Настройте Valid OAuth Redirect URIs: `https://yourdomain.auth.region.amazoncognito.com/oauth2/idpresponse`
5. Сохраните App ID и App Secret

### Amazon Login

1. Перейдите в [Amazon Developer Console](https://developer.amazon.com/)
2. Создайте Security Profile
3. Настройте Allowed Return URLs: `https://yourdomain.auth.region.amazoncognito.com/oauth2/idpresponse`
4. Сохраните Client ID и Client Secret

### Добавление провайдеров в Amplify

Отредактируйте `amplify/auth/resource.ts`:

```typescript
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      facebook: {
        clientId: process.env.FACEBOOK_APP_ID!,
        clientSecret: process.env.FACEBOOK_APP_SECRET!,
      },
      loginWithAmazon: {
        clientId: process.env.AMAZON_CLIENT_ID!,
        clientSecret: process.env.AMAZON_CLIENT_SECRET!,
      },
      callbackUrls: ['http://localhost:7003/', 'https://yourdomain.com/'],
      logoutUrls: ['http://localhost:7003/', 'https://yourdomain.com/'],
    },
  },
});
```

Создайте файл `.env` в корне проекта:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
AMAZON_CLIENT_ID=your_amazon_client_id
AMAZON_CLIENT_SECRET=your_amazon_client_secret
```

## Тестирование

### Локальная разработка

1. Запустите sandbox: `npx ampx sandbox`
2. Запустите приложение: `npm run dev:7003`
3. Откройте браузер и кликните на кнопку профиля
4. Попробуйте зарегистрироваться/войти

### Тестовый пользователь

После регистрации нового пользователя, Amplify отправит письмо с кодом подтверждения на указанный email. В sandbox-режиме письма не отправляются, вместо этого код выводится в консоль.

## Обработка авторизации

### Проверка статуса

```typescript
import { getCurrentUser } from 'aws-amplify/auth';

try {
  const user = await getCurrentUser();
  console.log('User is authenticated:', user);
} catch {
  console.log('User is not authenticated');
}
```

### Выход

```typescript
import { signOut } from 'aws-amplify/auth';

await signOut();
```

### Получение токена

```typescript
import { fetchAuthSession } from 'aws-amplify/auth';

const session = await fetchAuthSession();
const token = session.tokens?.idToken?.toString();
```

## Дальнейшие шаги

- [ ] Добавить страницу профиля пользователя
- [ ] Реализовать восстановление пароля
- [ ] Добавить двухфакторную аутентификацию (2FA)
- [ ] Реализовать изменение email/пароля
- [ ] Добавить функцию удаления аккаунта

## Ссылки

- [AWS Amplify Auth Documentation](https://docs.amplify.aws/gen2/build-a-backend/auth/)
- [Amplify Gen 2 Guide](https://docs.amplify.aws/gen2/)

