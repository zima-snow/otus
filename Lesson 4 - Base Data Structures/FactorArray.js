class FactorArray {
  constructor(factor) {
    this.array = [];
    this.factor = factor;
    this.size = 0;
  }

  isEmpty = () => {
    return this.size === 0;
  };

  resize = () => {
    const newArray = Array.from({ length: this.size * this.factor });

    for (let i = 0; i < this.size; i += 1) {
      newArray[i] = this.array[i];
    }

    this.array = newArray;
  };

  put = (item) => {
    if (this.size === this.array.length) {
      this.resize();
    }

    this.array[this.size++] = item;
  }

  add = (item, index) => {
    while (this.size < index) {
      this.resize();
    }

    this.array[index] = item;
  };

  get = (index) => {
    if (this.size < index) {
      throw Error(`Array element with index ${index} does not exists`);
    }

    return this.array[index];
  };

  remove = (index) => {
    if (this.size < index) {
      throw Error(`Array element with index ${index} does not exists`);
    }

    const removedItem = this.array[index];
    this.array[index] = undefined;

    return removedItem;
  };
}

export default FactorArray;
