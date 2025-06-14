class AutoSearch {
  constructor(text, pattern, name = '') {
    this.name = name;
    this.cmp = 0;
    this.setText(text).setPattern(pattern);
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
    this.length = pattern.length;
    this.alphabet = this.createAlphabet();
    this.delta = this.createDelta();
    this.cmp = 0;
    return this;
  }

  createAlphabet() {
    return [...new Set(this.pattern)].sort();
  }

  createDelta() {
    const delta = new Array(this.length + 1);
    const pattern = this.pattern;

    for (let i = 0; i <= this.length; i++) {
      delta[i] = new Array(this.alphabet.length);

      for (let j = 0; j < this.alphabet.length; j++) {
        const c = this.alphabet[j];
        let line = pattern.substring(0, i) + c;
        let k = Math.min(i + 1, this.length);

        while (k > 0) {
          this.cmp++;
          if (pattern.substring(0, k) === line.substring(line.length - k)) {
            break;
          }
          k--;
        }

        delta[i][j] = k;
      }
    }

    return delta;
  }

  run() {
    this.cmp = 0;
    let state = 0;
    const charMap = new Map(this.alphabet.map((c, i) => [c, i]));

    for (let i = 0; i < this.text.length; i++) {
      const char = this.text[i];

      if (!charMap.has(char)) {
        state = 0;
        continue;
      }

      const charIndex = charMap.get(char);
      state = this.delta[state][charIndex];
      this.cmp++;

      if (state === this.length) {
        return i - this.length + 1;
      }
    }

    return -1;
  }
}

export default AutoSearch;
