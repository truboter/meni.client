# Автозапуск Amplify Sandbox в VS Code

## ✅ Настройка завершена

При открытии проекта в VS Code автоматически запускаются:

1. **Frontend сервер** (Vite) на порту 7003
2. **Amplify Sandbox** для синхронизации backend ресурсов

## ⚠️ Важно: Работа с Production ресурсами

**Amplify Sandbox подключается к существующим production AWS ресурсам:**

- **Cognito User Pool**: `eu-central-1_vHbpSrCvL` (meni-production-users)
- **Identity Pool**: `eu-central-1:8150cddb-da73-483a-8601-95e4fd98411b`
- **S3 bucket**: production bucket для заказов

**Sandbox НЕ создает новые AWS ресурсы!** Он только синхронизирует локальные изменения в директории `amplify/` с существующими ресурсами.

**Будьте осторожны**: все изменения применяются к production окружению.

## Как это работает

### Автоматический запуск задач

Файл `.vscode/tasks.json` содержит две задачи с параметром `"runOn": "folderOpen"`:

#### 1. Start Frontend (Port 7003)

Запускает Vite dev server:

```bash
npm run dev:7003
```

#### 2. Start Amplify Sandbox

Запускает Amplify sandbox в watch режиме:

```bash
npx ampx sandbox --identifier meni-client
```

**Важно:** Sandbox подключается к **существующим production AWS ресурсам**:

- Cognito User Pool: `eu-central-1_vHbpSrCvL` (meni-production-users)
- Identity Pool: `eu-central-1:8150cddb-da73-483a-8601-95e4fd98411b`
- S3 bucket для заказов

Sandbox **НЕ создает новые ресурсы**, а синхронизирует локальные изменения в `amplify/` с существующими AWS ресурсами.

### Настройки VS Code

Файл `.vscode/settings.json` содержит:

```json
{
  "task.allowAutomaticTasks": "on"
}
```

Это разрешение позволяет VS Code автоматически запускать задачи при открытии папки.

## Проверка работы

### При открытии проекта

1. Откройте папку проекта в VS Code
2. В панели терминала (Terminal) автоматически появятся две вкладки:
   - **Start Frontend (Port 7003)** - Vite сервер
   - **Start Amplify Sandbox** - Amplify backend

### Ожидаемый вывод

**Frontend:**

```
VITE v6.4.1  ready in 13282 ms
➜  Local:   http://localhost:7003/
```

**Amplify Sandbox:**

```
Amplify Sandbox

Setting up and watching for changes...
[Sandbox] Deploying changes...
Successfully generated outputs
```

## Управление задачами

### Просмотр запущенных задач

1. Откройте Command Palette: `Ctrl+Shift+P` (Windows/Linux) или `Cmd+Shift+P` (Mac)
2. Введите: `Tasks: Show Running Tasks`

### Остановка задачи

1. Откройте Command Palette
2. Введите: `Tasks: Terminate Task`
3. Выберите задачу для остановки

### Ручной запуск задачи

1. Откройте Command Palette
2. Введите: `Tasks: Run Task`
3. Выберите нужную задачу:
   - `Start Frontend (Port 7003)`
   - `Start Amplify Sandbox`

## Отключение автозапуска

Если нужно временно отключить автозапуск:

### Метод 1: Через настройки VS Code

В `.vscode/settings.json` измените:

```json
{
  "task.allowAutomaticTasks": "off"
}
```

### Метод 2: Удалить runOptions из задач

В `.vscode/tasks.json` удалите блок:

```json
"runOptions": {
  "runOn": "folderOpen"
}
```

из нужных задач.

## Troubleshooting

### Задачи не запускаются автоматически

**Проблема:** При открытии проекта задачи не стартуют.

**Решение:**

1. Проверьте `.vscode/settings.json`:
   ```json
   "task.allowAutomaticTasks": "on"
   ```
2. Перезапустите VS Code
3. При первом открытии VS Code может запросить разрешение на запуск задач - нажмите "Allow"

### Amplify Sandbox не запускается

**Проблема:** Ошибки при запуске sandbox.

**Решение:**

1. Проверьте AWS credentials:
   ```bash
   aws sts get-caller-identity
   ```
2. Убедитесь, что установлен `@aws-amplify/backend-cli`:
   ```bash
   npm install
   ```
3. Проверьте логи в терминале sandbox

### Порт 7003 уже занят

**Проблема:** Frontend не запускается, порт занят.

**Решение:**

1. Найдите процесс на порту 7003:

   ```bash
   # Linux/Mac
   lsof -i :7003

   # Windows
   netstat -ano | findstr :7003
   ```

2. Остановите процесс или измените порт в `package.json`:
   ```json
   "dev:7003": "vite --port 7004"
   ```

### Несколько экземпляров sandbox

**Проблема:** Запущено несколько sandbox одновременно.

**Решение:**

1. Остановите все задачи: `Tasks: Terminate Task`
2. Убедитесь, что не запущен sandbox в другом терминале:
   ```bash
   ps aux | grep "ampx sandbox"
   ```
3. Запустите sandbox заново

## Полезные команды VS Code

| Команда                                        | Описание                         |
| ---------------------------------------------- | -------------------------------- |
| `Ctrl+Shift+P` → `Tasks: Show Running Tasks`   | Показать запущенные задачи       |
| `Ctrl+Shift+P` → `Tasks: Terminate Task`       | Остановить задачу                |
| `Ctrl+Shift+P` → `Tasks: Restart Running Task` | Перезапустить задачу             |
| `Ctrl+Shift+P` → `Tasks: Run Task`             | Запустить задачу вручную         |
| `Ctrl+``                                       | Открыть/закрыть панель терминала |

## Рекомендации

### Для разработки

Оставьте автозапуск **включенным** - это удобно для быстрого старта работы.

### Для медленных машин

Если компьютер работает медленно, отключите автозапуск Amplify Sandbox и запускайте его вручную только когда нужно работать с backend.

### Для работы offline

Отключите автозапуск Amplify Sandbox, так как он требует подключения к AWS.

## Дополнительная информация

- Amplify Sandbox автоматически синхронизирует изменения в `amplify/` директории
- Frontend hot-reload работает автоматически при изменении файлов
- Оба процесса работают в фоновом режиме и перезапускаются при необходимости

## Связанные документы

- `docs/TESTING_AUTH.md` - Руководство по тестированию авторизации
- `docs/COGNITO_SETUP_COMPLETE.md` - Полная документация Cognito
- `COGNITO_SETUP_SUMMARY.md` - Краткое резюме настройки
