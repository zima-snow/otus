import { compressRLEArray } from './compressRLEArray.js';
import { compressRLE } from './compressRLE.js';
import { compressFileRLE } from './compressFileRLE.js';
import { decompressFileRLE } from './decompressFileRLE.js';

const main = () => {
  const originalArray = [1, 1, 2, 3, 3, 3, 4, 4, 5];
  console.log('Check array compress');
  console.log(originalArray);

  const compressedArray = compressRLEArray(originalArray);
  console.log('Result is');
  console.log(compressedArray);

  const originalString = "AAABBBCCCD";
  console.log(`\nCheck string compress - ${originalString}`);
  const compressedString = compressRLE(originalString);
  console.log(`Result is ${compressedString}`);

  const inputFile = 'input.txt';
  const outputFile = 'compressed.txt';

  console.log(`\nCheck file compress - ${inputFile}`);
  compressFileRLE(inputFile, outputFile);
  console.log(`Compressed file - ${outputFile}`);

  const decompressedFile = 'decompressed.txt';
  console.log(`\nCheck file decompress - ${outputFile}`);
  decompressFileRLE(outputFile, decompressedFile);
  console.log(`Decompressed file - ${decompressedFile}`);
};

main();
