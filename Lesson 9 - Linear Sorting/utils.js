import fs from 'fs';

export const generateArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    const item = Math.floor(Math.random() * 999) + 1;
    arr.push(item);
  }

  return arr;
};

export const generateBinaryFile = (filename, count, runSorting) => {
  const fileSize = count * 2;
  console.log(
    `Creating file ${filename} with ${count} numbers (${fileSize} byte)`
  );

  const writeStream = fs.createWriteStream(filename);

  const chunkSize = 1000000;
  let generated = 0;

  function writeChunk() {
    let canContinue = true;

    while (generated < count && canContinue) {
      const remaining = count - generated;
      const currentChunkSize = Math.min(chunkSize, remaining);
      const buffer = Buffer.alloc(currentChunkSize * 2);

      for (let i = 0; i < currentChunkSize; i++) {
        const num = Math.floor(Math.random() * 65536);
        buffer.writeUInt16LE(num, i * 2);
      }

      canContinue = writeStream.write(buffer);
      generated += currentChunkSize;

      if (generated % 100000000 === 0) {
        console.log(
          `Generated ${generated} numbers (${Math.round((generated / count) * 100)}%)`
        );
      }
    }

    if (generated < count) {
      writeStream.once('drain', writeChunk);
    } else {
      writeStream.end();
      console.log('Generating completed');
    }
  }

  writeStream.on('finish', () => {
    console.log('File created');
    runSorting();
  });

  writeStream.on('error', (err) => {
    console.error('Error while writing in file:', err);
  });

  writeChunk();
};
