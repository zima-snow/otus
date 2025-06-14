import AutoSearch from './AutoSearch.js';
import KMPSearch from './KMPSearch.js';

const TEXTS = [
  'KOLKOKOLOKOLL',
  'BC-ABC-BC-AC-ABCBC-ABC-BC-C-ABC-ABC-BC-C-ABC',
  'abacabadabacabae',
  'ABCD',
  '', // Пустая строка (краевой случай)
];
const MASKS = [
  'KOLOKOL',
  'BC-ABC-BC-C-ABC',
  'abacab',
  '1', // Паттерна нет в тексте
  '',  // Пустой паттерн (краевой случай)
];

const main = () => {
  const searches = [
    new AutoSearch('', '', 'AutoSearch'),
    new KMPSearch('', '', 'KMPSearch'),
  ];

  console.log(`Texts: ${TEXTS.map(t => t || '""').join(', ')}`);
  console.log(`Patterns: ${MASKS.map(m => m || '""').join(', ')}\n`);

  for (const searcher of searches) {
    if (!searcher) continue;

    console.log('-'.repeat(40));
    console.log(`Algorithm: ${searcher.name}\n`);

    for (let i = 0; i < Math.min(TEXTS.length, MASKS.length); i++) {
      const text = TEXTS[i];
      const pattern = MASKS[i];

      // Проверка, что методы setText и setPattern не ломаются
      try {
        searcher.setText(text).setPattern(pattern);
      } catch (e) {
        console.error(`Error in ${searcher.name}:`, e.message);
        continue;
      }

      console.log(`Searching "${pattern}" in "${text}"`);

      // Запускаем поиск несколько раз для более точного замера времени
      const startTime = performance.now();
      const position = searcher.run();
      const endTime = performance.now();

      console.log(`Time: ${(endTime - startTime).toFixed(3)} ms`);
      console.log(`Result: ${position !== -1 ? `Found at ${position}` : 'Not found'}`);
      console.log(`Comparisons: ${searcher.cmp}\n`);
    }
  }
};

main();