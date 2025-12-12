# ⚠️ Важно: Production Ресурсы

## Текущая конфигурация

Проект **meni-client** использует **существующие production AWS ресурсы**. Новые ресурсы НЕ создаются при разработке.

## AWS Ресурсы

### Cognito User Pool (Production)

- **Name**: `meni-production-meni`
- **Pool ID**: `eu-central-1_g0X3qmr0t`
- **ARN**: `arn:aws:cognito-idp:eu-central-1:220427457121:userpool/eu-central-1_g0X3qmr0t`
- **Client ID**: `6l1ukf9vgulfkndr53ltauujo`
- **Client Name**: `meni-production-meni`
- **Region**: `eu-central-1`

### Identity Pool (Production)

- **Name**: `meni-client-identity-pool`
- **Pool ID**: `eu-central-1:67cdf6ba-48ad-465b-8c8c-bb1b7135309c`
- **Region**: `eu-central-1`

### S3 Bucket (Production)

- Production S3 bucket для хранения заказов
- Используется как в dev, так и в production

### OAuth Domain

- **Domain**: `eu-central-1g0x3qmr0t.auth.eu-central-1.amazoncognito.com`

## Amplify Sandbox

### Что делает Sandbox?

Amplify Sandbox **НЕ создает новые AWS ресурсы**. Он:

1. **Подключается** к существующим production ресурсам
2. **Синхронизирует** локальные изменения в `amplify/` директории
3. **Применяет изменения** к production Cognito User Pool и другим ресурсам
4. **Генерирует** `amplify_outputs.json` с актуальными параметрами

### Конфигурация

Файл `amplify_outputs.json` содержит:

```json
{
  "version": "1.4",
  "auth": {
    "aws_region": "eu-central-1",
    "user_pool_id": "eu-central-1_g0X3qmr0t",
    "user_pool_client_id": "6l1ukf9vgulfkndr53ltauujo",
    "identity_pool_id": "eu-central-1:67cdf6ba-48ad-465b-8c8c-bb1b7135309c"
  }
}
```

Эти значения указывают на **production ресурсы**.

## ⚠️ Предостережения

### При разработке

1. **Все пользователи** создаются в production Cognito User Pool
2. **Все заказы** сохраняются в production S3 bucket
3. **Все изменения** в `amplify/` применяются к production

### Рекомендации

- ✅ Используйте тестовые email адреса для регистрации
- ✅ Удаляйте тестовых пользователей после тестирования
- ✅ Не создавайте множество тестовых аккаунтов
- ⚠️ Будьте осторожны с изменениями в `amplify/auth/resource.ts`
- ⚠️ Тестируйте критические изменения в отдельном окружении

### Удаление тестовых данных

**Удалить тестового пользователя:**

```bash
aws cognito-idp admin-delete-user \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --username test@example.com
```

**Список всех пользователей:**

```bash
aws cognito-idp list-users \
  --user-pool-id eu-central-1_g0X3qmr0t
```

## Почему не создаем отдельное dev окружение?

### Текущий подход

Проект использует единое production окружение для упрощения:

- ✅ Нет дублирования ресурсов
- ✅ Нет дополнительных затрат на AWS
- ✅ Проще управление (один User Pool, один S3 bucket)
- ✅ Все изменения сразу видны в production

### Если нужно отдельное dev окружение

Для создания отдельного dev окружения потребуется:

1. Создать новый Cognito User Pool для dev
2. Создать новый S3 bucket для dev
3. Обновить `amplify_outputs.json` для переключения между окружениями
4. Настроить переменные окружения (.env.development, .env.production)

## Мониторинг использования

### Количество пользователей

```bash
aws cognito-idp list-users \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --query 'length(Users)'
```

### Проверка активности

```bash
# Последние 10 пользователей
aws cognito-idp list-users \
  --user-pool-id eu-central-1_g0X3qmr0t \
  --limit 10 \
  --query 'Users[*].[Username,UserStatus,UserCreateDate]' \
  --output table
```

## Дополнительная информация

- **Cognito Console**: [User Pool в AWS Console](https://eu-central-1.console.aws.amazon.com/cognito/v2/idp/user-pools/eu-central-1_g0X3qmr0t/users)
- **Identity Pool Console**: [Identity Pool в AWS Console](https://eu-central-1.console.aws.amazon.com/cognito/pool/?region=eu-central-1&id=eu-central-1:67cdf6ba-48ad-465b-8c8c-bb1b7135309c)

## Связанная документация

- `COGNITO_SETUP_SUMMARY.md` - Резюме настройки Cognito
- `docs/COGNITO_SETUP_COMPLETE.md` - Полная документация Cognito
- `docs/TESTING_AUTH.md` - Руководство по тестированию авторизации
- `docs/VSCODE_AUTOSTART.md` - Автозапуск Sandbox в VS Code

