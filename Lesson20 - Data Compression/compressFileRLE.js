import { compressRLE } from './compressRLE.js';
import fs from 'fs';

export const compressFileRLE = (inputFilePath, outputFilePath) => {
  try {
    // Чтение файла
    const data = fs.readFileSync(inputFilePath, 'utf-8');

    // Сжатие данных
    const compressedData = compressRLE(data);

    // Запись сжатого файла
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
}
