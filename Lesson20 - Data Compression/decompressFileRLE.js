import { decompressRLEString } from './decompressRLE.js';
import fs from 'fs';
import path from 'path';

export const decompressFileRLE = (inputFilePath, outputFilePath) => {
  try {
    // Проверка существования файла
    if (!fs.existsSync(inputFilePath)) {
      throw new Error(`Файл ${inputFilePath} не найден`);
    }

    // Чтение с удалением BOM и лишних пробелов
    let compressedData = fs
      .readFileSync(inputFilePath, 'utf-8')
      .replace(/^\uFEFF/, '') // Удаление BOM
      .trim(); // Удаление лишних пробелов

    // Проверка на пустые данные
    if (!compressedData) {
      throw new Error('Файл пуст или содержит только пробелы');
    }

    // Распаковка с обработкой ошибок
    let decompressedData;
    try {
      decompressedData = decompressRLEString(compressedData);
    } catch (err) {
      throw new Error(`Ошибка распаковки: ${err.message}`);
    }

    // Проверка возможности записи
    const outputDir = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Запись с обработкой ошибок
    fs.writeFileSync(outputFilePath, decompressedData, 'utf-8');

    // Детальное логирование
    const compressionRatio = Math.round(
      (1 - compressedData.length / decompressedData.length) * 100
    );

    console.log(`✅ Файл успешно распакован`);
    console.log(`📂 Исходный файл: ${inputFilePath}`);
    console.log(`📂 Выходной файл: ${outputFilePath}`);
    console.log(`📊 Размер сжатых данных: ${compressedData.length} байт`);
    console.log(
      `📊 Размер распакованных данных: ${decompressedData.length} байт`
    );
    console.log(`📈 Степень сжатия: ${compressionRatio}%`);
  } catch (err) {
    console.error('❌ Критическая ошибка:', err.message);
    process.exitCode = 1; // Установка кода ошибки
  }
};
