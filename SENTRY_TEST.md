# 🧪 SENTRY TEST INSTRUCTIONS

## Quick Test (3 минуты)

### 1. Включите Sentry в development

**PowerShell:**
```powershell
cd C:\GitHub\meni_client
$env:VITE_SENTRY_ENABLED="true"
npm run dev
```

**CMD:**
```cmd
cd C:\GitHub\meni_client
set VITE_SENTRY_ENABLED=true
npm run dev
```

### 2. Откройте тестовую страницу

```
http://localhost:7003/sentry-test
```

### 3. Нажмите "Break the world 🔥"

Это вызовет тестовую ошибку.

### 4. Проверьте Sentry Dashboard

1. Откройте https://sentry.io
2. Перейдите в раздел **Issues**
3. Вы должны увидеть новую ошибку: **"This is your first error!"**

### 5. Проверьте детали ошибки

В Sentry вы должны увидеть:

✅ **Stack trace** - где произошла ошибка  
✅ **Breadcrumbs** - действия перед ошибкой  
✅ **Device info** - браузер, ОС  
✅ **User context** - НЕ должно быть email/IP (privacy!)  
✅ **Environment** - development  

---

## Дополнительные тесты

На странице `/sentry-test` есть дополнительные кнопки:

- **Test Exception Capture** - тест ручного захвата ошибок
- **Test Message** - тест отправки сообщений

---

## ✅ Что проверить

- [ ] Ошибка появилась в Sentry
- [ ] Stack trace читаемый
- [ ] НЕТ email адресов
- [ ] НЕТ IP адресов
- [ ] НЕТ cookies
- [ ] Environment = development
- [ ] Timestamp корректный

---

## 🔥 Production Test (после деплоя)

1. Задеплойте приложение: `npm run build`
2. Перейдите на production URL
3. Добавьте `?test=sentry` в URL (или откройте /sentry-test)
4. Нажмите тестовую кнопку
5. Проверьте в Sentry: Environment = production

---

## 🗑️ После тестирования

**ВАЖНО:** Удалите тестовый маршрут перед production!

В `src/main.tsx` удалите строку:
```typescript
<Route path="/sentry-test" element={<SentryTestPage />} />
```

Или удалите файл:
```
src/components/SentryTest.tsx
```

---

## 🎯 Expected Result

После успешного теста вы увидите в Sentry:

```
Issue: This is your first error!
Type: Error
Status: Unresolved
First seen: [timestamp]
Last seen: [timestamp]
Events: 1
Users affected: 1

Stack Trace:
  at onClick (SentryTest.tsx:18:15)
  at HTMLUnknownElement.callCallback (react-dom.js:...)
  ...

Breadcrumbs:
  [console] 🧪 [Sentry Test] Throwing test error...
  [ui.click] button.Break the world
```

---

## 🚀 Ready!

Если тест прошёл успешно:

✅ Sentry настроен корректно  
✅ Ошибки отслеживаются  
✅ Privacy соблюдена  
✅ Готово к production  

**Next:** Удалите тестовую страницу и задеплойте!
