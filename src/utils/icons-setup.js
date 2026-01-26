import { addCollection } from '@iconify/react';

// Імпортуємо json як об'єкти (не просто side-effect import)
import bi from '@iconify-json/bi/icons.json';
import solar from '@iconify-json/solar/icons.json';
import lucide from '@iconify-json/lucide/icons.json';
import ph from '@iconify-json/ph/icons.json';
import hugeicons from '@iconify-json/hugeicons/icons.json';
import ion from '@iconify-json/ion/icons.json';

// Реєструємо колекції один раз
addCollection(bi);
addCollection(solar);
addCollection(lucide);
addCollection(ph);
addCollection(hugeicons);
addCollection(ion);

export {}; // щоб файл вважався модулем