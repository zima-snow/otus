import crypto from 'crypto';

export class BloomFilter {
  constructor(size = 10_000_000, hashFunctions = 5) {
    this.size = size;
    this.bitArray = new Array(size).fill(false);
    this.hashFunctions = hashFunctions;
  }

  // Добавление элемента
  add = (item) => {
    for (let i = 0; i < this.hashFunctions; i++) {
      const hash = this._getHash(item, i);
      this.bitArray[hash] = true;
    }
  }

  // Проверка элемента
  mightContain = (item) => {
    for (let i = 0; i < this.hashFunctions; i++) {
      if (!this.bitArray[this._getHash(item, i)]) {
        return false;
      }
    }

    return true;
  }

  // Хеш-функция (использует SHA-256 для равномерного распределения)
  _getHash = (item, seed) => {
    const hash = crypto
      .createHash('sha256')
      .update(item + seed.toString())
      .digest('hex');

    return parseInt(hash.slice(0, 8), 16) % this.size;
  }

  // Очистка фильтра
  clear = () => {
    this.bitArray = new Array(this.size).fill(false);
  }
}
