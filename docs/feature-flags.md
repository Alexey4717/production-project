# Документация по Feature Flags (Функциональные флаги)

## Введение

Feature Flags (функциональные флаги) — это техника, позволяющая включать/выключать функциональность в приложении без изменения кода.

Основные преимущества:

- Постепенное внедрение новых фич
- A/B тестирование
- Быстрый откат изменений (без необходимости отката на предыдущие ветки) на уровне пользователя (админа)
- Управление доступом к фичам для разных пользователей

----

## Базовое использование

### Хранение флагов

Флаги хранятся в БД для каждого пользователя отдельно (поле features):

```typescript
interface User {
  id: string;
  // ...
  features: {
    isArticleRatingEnabled: boolean;
    isCounterEnabled: boolean;
  };
}
```

### Получение и установка флагов

```tsx
// Установка флагов при аутентификации
setAuthData(user) {
  setFeatureFlags(user.features);
}

// Проверка флага в компоненте
if (getFeatureFlag('isArticleRatingEnabled')) {
  return <ArticleRating />;
}
```

----

## Архитектура решения

### Структура файлов

```sourcegraph
shared/
  lib/
    features/
      toggleFeatures.ts  # Универсальный переключатель
      FeatureToggle.tsx  # Компонент для переключения
      setGetFeatures.ts  # Геттеры/сеттеры
  types/
    featureFlags.ts     # Типы флагов
```

### Основные принципы

1. Не реактивность - флаги не хранятся в состоянии (Redux, MobX и т.п.)
2. Инкапсуляция - прямой доступ к флагам запрещен. Значения флагов читаются при инициализации и не меняются во время сессии
3. Унификация - единый интерфейс работы

----

## Универсальный переключатель (toggleFeatures)

Реализация для безопасного переключения между старой и новой функциональностью:

```tsx
// Использование для компонентов
<ToggleFeatures
  name="isRedesignEnabled"
  on={<NewComponent />}
  off={<OldComponent />}
/>

// Использование для значений
const result = toggleFeatures({
  name: 'isRedesignEnabled',
  on: () => newFeatureValue,
  off: () => oldFeatureValue
});
```

### Автоматическое удаление старых фич

#### Проблема.
Фичи «прорастают» в проект (внутрь селекторов, хелперов, компонентов). После завершения эксперимента — сложно найти, где фича использовалась.

#### Решение.
Запрещаем использовать фиче-флаги вручную.

Все переключения только через toggleFeatures или ToggleFeatures.

Скрипт remove-feature.ts анализирует AST и:

1. Находит все использования toggleFeatures
2. Удаляет неиспользуемую ветку (on/off)
3. Заменяет вызов на итоговое значение
4. Удаляет сам флаг

```bash
npm run remove-feature -- --feature isRedesignEnabled --on
```

Можно дописать ESLint правило, которое будет подсказывать:

- Не объявлять переменные внутри on/off.
- Использовать только внешние стрелочные функции.

----

## Интеграция с UI

### Переключение дизайна

Пример страницы настроек:

```tsx
<Select
  value={isRedesignEnabled ? 'new' : 'old'}
  onChange={(value) => updateFeatureFlag('isRedesignEnabled', value === 'new')}
  options={[
    { value: 'old', content: 'Старый дизайн' },
    { value: 'new', content: 'Новый дизайн' }
  ]}
/>
```

### Принудительное обновление

Для случаев когда нужно обновить интерфейс без перезагрузки:

```tsx
<ForceUpdateProvider>
  <App />
</ForceUpdateProvider>
```

<b>Внимание: Это костыль и в production следует избегать!</b>

----

## Интеграция с тестами и Storybook

### Декоратор для Storybook

```tsx
export const FeaturesFlagsDecorator = (features: FeatureFlags) => (Story) => (
  <div style={{ padding: 20 }}>
    <StoryContext.Provider value={features}>
      <Story />
    </StoryContext.Provider>
  </div>
);

// Использование
export default {
  title: 'Component',
  decorators: [FeaturesFlagsDecorator({ isRedesignEnabled: true })]
};
```

### Тестирование

```tsx
describe('Component', () => {
  it('should render old design', () => {
    setFeatureFlags({ isRedesignEnabled: false });
    render(<Component />);
    expect(screen.getByTestId('old-design')).toBeInTheDocument();
  });
});
```

----

## Json Settings

Дополнительные пользовательские настройки:

```typescript
interface User {
  // ...
  jsonSettings: {
    theme?: AppTheme;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
  };
}
```

Использование:

```typescript
const { theme } = useJsonSettings();
const saveTheme = (newTheme) => updateJsonSettings({ theme: newTheme });
```

----

## Best Practices

1. Именование флагов - используйте префиксы (is*Enabled, has*Feature)
2. Документирование - описывайте назначение каждого флага
3. Очистка - удаляйте флаги после полного внедрения фичи
4. Разделение - не смешивайте флаги дизайна и бизнес-логики
5. Безопасность - ограничьте доступ к критическим флагам

----

## Полезные ссылки

1. [Feature Toggles (Feature Flags)](https://martinfowler.com/articles/feature-toggles.html)
2. [LaunchDarkly - Feature Management Platform](https://launchdarkly.com/)
3. [Optimizely - A/B Testing and Feature Flags](https://www.optimizely.com/)
