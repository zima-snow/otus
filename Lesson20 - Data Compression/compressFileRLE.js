import { compressRLE } from './compressRLE.js';
import fs from 'fs';

export const compressFileRLE = (inputFilePath, outputFilePath) => {
  try {
    // 1. Проверяем, существует ли файл
    if (!fs.existsSync(inputFilePath)) {
      throw new Error('Файл не найден');
    }

    // 2. Читаем и чистим данные
    let data = fs.readFileSync(inputFilePath, 'utf-8');
    data = data.replace(/^\uFEFF/, '').trim(); // убираем BOM и лишние пробелы

    if (!data) {
      throw new Error('Файл пуст');
    }

    // 3. Сжимаем
    const compressedData = compressRLE(data);

    // 4. Записываем
    fs.writeFileSync(outputFilePath, compressedData, 'utf-8');

    console.log(`✅ Файл сжат и сохранен как ${outputFilePath}`);
    console.log(`📊 Исходный размер: ${data.length} байт`);
    console.log(`📊 Сжатый размер: ${compressedData.length} байт`);
    console.log(
      `📈 Степень сжатия: ${Math.round((1 - compressedData.length / data.length) * 100)}%`
    );
  } catch (err) {
    console.error('❌ Ошибка:', err.message);
  }
};
