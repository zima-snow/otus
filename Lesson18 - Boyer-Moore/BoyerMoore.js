class BoyerMoore {
  constructor(text, mask, name = '') {
    this.text = text;
    this.mask = mask;
    this.name = name;
    this.cmp = 0;
    this.suffix = undefined;
  }

  prepare = () => {
    this.suffix = new Array(this.mask.length);
    this.suffix[0] = 1;

    // совпавший суффикс
    for (let i = 1; i < this.mask.length; i++) {
      // поиск такого же суффикса
      for (let k = 1; k <= this.mask.length; k++) {
        let cnt = 0;

        for (let j = 0; j < i; j++) {
          // количество совпавших символов
          if (j + k + 1 > this.mask.length) {
            // вышли за границы шаблона
            break;
          }

          if (
            this.mask[this.mask.length - 1 - j] !==
            this.mask[this.mask.length - 1 - j - k]
          ) {
            // суффиксы не совпали
            break;
          }

          cnt++;
        }

        if (cnt < i) {
          // сравниваем начало и конец шаблона
          if (k + cnt == this.mask.length) {
            // начало и конец совпали на cnt символов
            this.suffix[i] = k;
            break;
          } else continue;
        }

        this.suffix[i] = k; // i символов совпали, между совпадениями k позиций
        break;
      }
    }
  };

  run = () => {
    this.prepare();
    let t = 0;
    this.cmp = 0;

    while (t <= this.text.length - this.mask.length) {
      let m = this.mask.length - 1;

      while (m >= 0 && this.text[t + m] === this.mask[m]) {
        this.cmp++;
        m--;
      }

      if (m < 0) {
        return t;
      }

      let c = this.mask.length - 1 - m;
      t += this.suffix[c];
    }

    return -1;
  };
}

export default BoyerMoore;
