export const countUnitsInBinaryByBitMask = (n) => {
  let count = 0;
  let current = n;

  while (current > 0) {
    if (current & 0x01 > 0) {
      count += 1;
    }

    current = current >> 1;
  }

  return count;
};

const units = Array.from({ length: 256 }).fill(0)
  .map((_, index) => countUnitsInBinaryByBitMask(index));

const countUnitsInBinaryByCache = (n) => {
  return units[n];
};

const main = () => {
  const resultCountUnitsInBinaryByCache = countUnitsInBinaryByCache(254);
  console.log(resultCountUnitsInBinaryByCache);
};

main();
