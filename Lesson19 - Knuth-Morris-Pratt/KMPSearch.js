class KMPSearch {
  constructor(text, pattern, name = '') {
    this.name = name;
    this.cmp = 0;
    this.setText(text).setPattern(pattern);
    this.lps = [];
  }

  setText(text) {
    if (typeof text !== 'string') {
      throw new Error('Text must be a string');
    }

    this.text = text;
    return this;
  }

  setPattern(pattern) {
    if (typeof pattern !== 'string') {
      throw new Error('Pattern must be a string');
    }

    this.pattern = pattern;
    this.cmp = 0;
    return this;
  }

  computeLPSArray() {
    const pattern = this.pattern;
    const len = pattern.length;
    this.lps = new Array(len).fill(0);
    let length = 0; // Длина текущего самого длинного префикса-суффикса
    let i = 1;

    while (i < len) {
      this.cmp++;

      if (pattern[i] === pattern[length]) {
        length++;
        this.lps[i] = length;
        i++;
      } else {
        if (length !== 0) {
          length = this.lps[length - 1];
        } else {
          this.lps[i] = 0;
          i++;
        }
      }
    }
  }

  run() {
    if (!this.pattern || !this.text) return -1; // Проверка на пустые строки

    const text = this.text;
    const pattern = this.pattern;
    const textLen = text.length;
    const patternLen = pattern.length;

    this.cmp = 0;
    this.computeLPSArray(); // Строим префикс-функцию

    let i = 0; // Индекс для текста
    let j = 0; // Индекс для паттерна

    while (i < textLen) {
      this.cmp++;

      if (text[i] === pattern[j]) {
        i++;
        j++;
      }

      // Если весь паттерн совпал
      if (j === patternLen) {
        return i - j; // Возвращаем начальный индекс подстроки
      }
      // Если не совпало и текст ещё не закончился
      else if (i < textLen && text[i] !== pattern[j]) {
        if (j !== 0) {
          j = this.lps[j - 1]; // Сдвигаем паттерн на lps[j-1]
        } else {
          i++; // Просто двигаемся по тексту
        }
      }
    }

    return -1; // Подстрока не найдена
  }
}

export default KMPSearch;
