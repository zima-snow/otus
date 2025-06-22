import { decompressRLEString } from './decompressRLE.js';
import fs from 'fs';

export const decompressFileRLE = (inputFilePath, outputFilePath) => {
  try {
    // Чтение сжатого файла
    const compressedData = fs.readFileSync(inputFilePath, 'utf-8');
    
    // Распаковка данных
    const decompressedData = decompressRLEString(compressedData);
    
    // Запись распакованного файла
    fs.writeFileSync(outputFilePath, decompressedData, 'utf-8');
    
    console.log(`✅ Файл распакован и сохранён как ${outputFilePath}`);
    console.log(`📊 Размер сжатого файла: ${compressedData.length} байт`);
    console.log(`📊 Размер распакованного файла: ${decompressedData.length} байт`);
  } catch (err) {
    console.error('❌ Ошибка:', err.message);
  }
}
