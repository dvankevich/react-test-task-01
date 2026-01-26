Ось **повна, покрокова інструкція** для стабільного варіанту з використанням `@iconify/react` + локальних колекцій через `addCollection` (саме той, який у тебе вже спрацював). Це найнадійніший офлайн-режим без додаткових плагінів (Vite, React, 2026 рік).

### Крок 1: Встанови потрібні пакети (якщо ще не зроблено)
```bash
npm install @iconify/react

# Колекції, які використовуєш у компоненті
npm install -D \
  @iconify-json/bi \
  @iconify-json/solar \
  @iconify-json/lucide \
  @iconify-json/ph \
  @iconify-json/hugeicons \
  @iconify-json/ion
```

### Крок 2: Створи файл для реєстрації іконок
Створи новий файл, наприклад:

`src/iconify-setup.ts` (або `src/utils/iconify-setup.ts`)

```ts
// src/iconify-setup.ts
import { addCollection } from '@iconify/react';

// Імпортуємо JSON-файли колекцій як об'єкти
import biData from '@iconify-json/bi/icons.json';
import solarData from '@iconify-json/solar/icons.json';
import lucideData from '@iconify-json/lucide/icons.json';
import phData from '@iconify-json/ph/icons.json';
import hugeiconsData from '@iconify-json/hugeicons/icons.json';
import ionData from '@iconify-json/ion/icons.json';

// Реєструємо кожну колекцію
addCollection(biData);
addCollection(solarData);
addCollection(lucideData);
addCollection(phData);
addCollection(hugeiconsData);
addCollection(ionData);

// Якщо в майбутньому додаси нові колекції — просто додавай імпорт + addCollection

export {}; // робить файл модулем (потрібно для TypeScript/Vite)
```

### Крок 3: Підключи цей файл один раз на весь додаток
У головному файлі входу (зазвичай `src/main.tsx` або `src/index.tsx`):

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Додаємо саме тут (до рендеру додатка)
import './iconify-setup';   // або повний шлях, якщо файл в іншій папці

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

Це гарантує, що колекції зареєстровані глобально ще до першого рендеру будь-якого компонента.

### Крок 4: Твій компонент (майже без змін)
```tsx
// src/components/MyIconsComponent.tsx
import { Icon } from '@iconify/react';

const MyIconsComponent = () => {
  return (
    <>
      <div>
        <img src="/IconsFigma.png" alt="Figma icons" />
      </div>

      <div style={{ display: 'flex', gap: '20px', fontSize: '32px' }}>
        {/* Map */}
        <Icon icon="bi:map" />
      </div>

      <div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '32px' }}>
          {/* Звичайні іконки */}
          <Icon icon="bi:display" />
          <Icon icon="bi:wind" />
          <Icon icon="bi:diagram-3" />
          <Icon icon="bi:cup-hot" />
          <Icon icon="ph:shower" />
          <Icon icon="bi:grid-1x2" />
          <Icon icon="bi:grid" />
          <Icon icon="bi:grid-3x3-gap" />
          <Icon icon="bi:ui-radios" />
          <Icon icon="bi:fuel-pump" />
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '32px' }}>
          {/* Побутова техніка */}
          <Icon icon="solar:fridge-outline" />
          <Icon icon="lucide:microwave" />
          <Icon icon="hugeicons:gas-stove" />
          <Icon icon="ion:water-outline" />
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '32px' }}>
          {/* Інтерактивні */}
          <Icon icon="bi:heart" color="var(--button)" />
          <Icon icon="bi:heart" color="var(--main)" />

          <br />

          <Icon icon="bi:star-fill" color="var(--badges)" />
          <Icon icon="bi:star-half" color="var(--rating)" />
          <Icon icon="bi:star-fill" color="var(--rating)" />
        </div>
      </div>
    </>
  );
};

export default MyIconsComponent;
```

### Крок 5: Очисти кеш та перевір
Після всіх змін виконай:

```bash
# Очисти Vite-кеш (дуже важливо!)
rm -rf node_modules/.vite

# Перезапусти dev-сервер
npm run dev
```

- Відкрий браузер → DevTools → Network
- Фільтр: `api.iconify` → має бути **порожньо**
- Якщо запити все ж є — перевір консоль браузера на помилки та переконайся, що `import './iconify-setup';` дійсно виконується (можна тимчасово додати `console.log('Iconify collections loaded')` у `iconify-setup.ts`).

### Додаткові поради
- Якщо додаси нову колекцію (наприклад `@iconify-json/mdi`) — просто додай імпорт + `addCollection(mdiData)` у `iconify-setup.ts`.
- Розмір бандла: ці json-файли не дуже великі (по 100–500 KB на колекцію), але якщо хочеш мінімізувати — реєструй тільки ті колекції, які реально використовуєш.
- Для продакшену (`npm run build`) все працює так само — локально, без мережі.

Цей підхід стабільно працює без магії плагінів і side-effect імпортів, які іноді ламаються в Vite.

Якщо щось піде не так — просто скажи, що саме бачиш у консолі/Network.