import process from 'process';

const getLuckyTicketsCount = () => {
  let count = 0;

  for (let a1 = 0; a1 < 10; a1 += 1) {
    for (let a2 = 0; a2 < 10; a2 += 1) {
      for (let a3 = 0; a3 < 10; a3 += 1) {
        const sum = a1 + a2 + a3;

        for (let b1 = 0; b1 < 10; b1 += 1) {
          for (let b2 = 0; b2 < 10; b2 += 1) {
            const b3 = sum - b1 - b2;
            if (b3 >= 0 && b3 < 10) {
              count += 1;
            }
          }
        }
      }
    }
  }

  return count;
};

const main = () => {
  const result = getLuckyTicketsCount();
  console.log(result);
};

main();
