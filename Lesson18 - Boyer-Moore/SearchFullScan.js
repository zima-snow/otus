class SearchFullScan {
  constructor(text, mask, name = '') {
    this.text = text;
    this.mask = mask;
    this.name = name;
    this.cmp = 0;
  }

  run = () => {
    let t = 0;
    this.cmp = 0;

    while (t <= this.text.length - this.mask.length) {
      let m = 0;

      while (m < this.mask.length) {
        this.cmp++;

        if (this.text[t + m] !== this.mask[m]) {
          break;
        }

        m++;
      }

      if (m === this.mask.length) {
        return t;
      }

      t++;
    }

    return -1;
  };
}

export default SearchFullScan;
