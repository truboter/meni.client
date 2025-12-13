# AWS Cognito Setup - Complete

## ✅ Настройка завершена

AWS Cognito User Pool успешно настроен для проекта meni-client.

**Важно:** Проект использует **существующие production ресурсы**:

- Cognito User Pool и Identity Pool уже развернуты
- Amplify Sandbox синхронизируется с этими ресурсами, не создавая новые
- Все изменения в `amplify/` применяются к production окружению

## Параметры конфигурации

### User Pool

- **Pool ID**: `eu-central-1_vHbpSrCvL`
- **Name**: `meni-production-users`
- **Region**: `eu-central-1`

### User Pool Client

- **Client ID**: `1cfidd7fmiuvfuitir55v927ol`
- **Client Name**: `meni-web-client`

### Identity Pool

- **Pool ID**: `eu-central-1:8150cddb-da73-483a-8601-95e4fd98411b`
- **Name**: `meni-production-identity`
- **Unauthenticated access**: Enabled

### OAuth Domain

- **Domain**: `meni-client-auth.auth.eu-central-1.amazoncognito.com`
- **Callback URLs**:
  - http://localhost:7003/
  - https://meni.ge/
- **Logout URLs**:
  - http://localhost:7003/
  - https://meni.ge/

## Тестирование

### 1. Запустите приложение

```bash
npm run dev:7003
```

### 2. Откройте браузер

Перейдите на http://localhost:7003

### 3. Протестируйте регистрацию

1. Кликните на кнопку профиля (круглая кнопка в правом верхнем углу)
2. В появившемся диалоге выберите "Sign Up" / "Регистрация"
3. Введите email и пароль (минимум 8 символов, должны быть заглавные, строчные буквы, цифры и символы)
4. Нажмите "Sign Up"
5. Проверьте email - вам придет код подтверждения

### 4. Подтвердите email

После регистрации Cognito отправит код подтверждения на указанный email.

**Важно**: Если email не приходит, проверьте:

- Папку спам
- Настройки SES в AWS (для production нужно вывести из sandbox)

Для тестирования можно использовать AWS Console для подтверждения пользователя вручную:

```bash
aws cognito-idp admin-confirm-sign-up \
  --user-pool-id eu-central-1_vHbpSrCvL \
  --username your-email@example.com
```

### 5. Войдите в систему

После подтверждения email:

1. Вернитесь в приложение
2. Кликните на кнопку профиля
3. Введите email и пароль
4. Нажмите "Sign In"

Если вход успешен, в консоли браузера появится сообщение "Show user profile".

## Проверка в AWS Console

### Просмотр пользователей

```bash
# Список всех пользователей
aws cognito-idp list-users --user-pool-id eu-central-1_g0X3qmr0t

# Информация о конкретном пользователе
aws cognito-idp admin-get-user \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --username your-email@example.com
```

### Удаление тестового пользователя

```bash
aws cognito-idp admin-delete-user \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --username your-email@example.com
```

## Настройка социальных провайдеров (опционально)

Для добавления входа через Google, Facebook или Amazon:

### 1. Получите credentials от провайдеров

См. инструкции в `docs/AUTH_SETUP.md`

### 2. Добавьте Identity Provider в Cognito

#### Google:

```bash
aws cognito-idp create-identity-provider \
  --user-pool-id eu-central-1_vHbpSrCvL \
  --provider-name Google \
  --provider-type Google \
  --provider-details client_id=YOUR_GOOGLE_CLIENT_ID,client_secret=YOUR_GOOGLE_CLIENT_SECRET,authorize_scopes=email,profile,openid \
  --attribute-mapping email=email,username=sub
```

#### Facebook:

```bash
aws cognito-idp create-identity-provider \
  --user-pool-id eu-central-1_vHbpSrCvL \
  --provider-name Facebook \
  --provider-type Facebook \
  --provider-details client_id=YOUR_FACEBOOK_APP_ID,client_secret=YOUR_FACEBOOK_APP_SECRET,authorize_scopes=email,public_profile \
  --attribute-mapping email=email,username=id
```

### 3. Обновите User Pool Client

```bash
aws cognito-idp update-user-pool-client \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --client-id 6l1ukf9vgulfkndr53ltauujo \
  --supported-identity-providers COGNITO Google Facebook
```

### 4. Обновите amplify_outputs.json

Добавьте провайдеров в массив `oauth.identity_providers`:

```json
"identity_providers": ["COGNITO", "Google", "Facebook"]
```

## Настройка email отправки (Production)

По умолчанию Cognito использует Amazon SES в sandbox режиме, который может отправлять письма только на верифицированные адреса.

### Для Production:

1. Запросите вывод из SES Sandbox:
   - Перейдите в AWS SES Console
   - Request production access
   - Укажите use case и ожидаемый объем

2. Настройте custom FROM email:

```bash
aws cognito-idp update-user-pool \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --email-configuration SourceArn=arn:aws:ses:eu-central-1:220427457121:identity/noreply@meni.ge
```

## Мониторинг

### Просмотр логов входа

```bash
aws logs tail /aws/cognito/userpools/eu-central-1_g0X3qmr0t --follow
```

### Метрики

```bash
# Количество пользователей
aws cognito-idp list-users \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --query 'length(Users)'
```

## Troubleshooting

### Ошибка "User is not confirmed"

```bash
aws cognito-idp admin-confirm-sign-up \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --username your-email@example.com
```

### Ошибка "Password does not conform to policy"

Пароль должен содержать:

- Минимум 8 символов
- Заглавные буквы (A-Z)
- Строчные буквы (a-z)
- Цифры (0-9)
- Специальные символы (!@#$%^&\*)

### Ошибка при входе

Проверьте в консоли браузера детали ошибки. Обычные причины:

- Пользователь не подтвержден
- Неправильный пароль
- Пользователь не существует

## Следующие шаги

- [ ] Протестировать регистрацию и вход
- [ ] Добавить функцию восстановления пароля
- [ ] Реализовать страницу профиля пользователя
- [ ] Настроить социальные провайдеры (по желанию)
- [ ] Вывести SES из sandbox для production
- [ ] Настроить MFA (двухфакторную аутентификацию)

## Полезные ссылки

- [AWS Cognito Console](https://eu-central-1.console.aws.amazon.com/cognito/v2/idp/user-pools/eu-central-1_g0X3qmr0t/users)
- [Identity Pool Console](https://eu-central-1.console.aws.amazon.com/cognito/pool/?region=eu-central-1&id=eu-central-1:67cdf6ba-48ad-465b-8c8c-bb1b7135309c)
