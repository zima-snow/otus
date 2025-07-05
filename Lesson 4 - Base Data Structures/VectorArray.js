class VectorArray {
  constructor(vector = 10) {
    this.array = [];
    this.vector = vector;
    this.size = 0;
  }

  isEmpty = () => {
    return this.size === 0;
  };

  resize = () => {
    const newArray = new Array(this.size + this.vector);

    for (let i = 0; i < this.size; i++) {
      newArray[i] = this.array[i];
    }

    this.array = newArray;
  };

  put = (item) => {
    if (this.size === this.array.length) {
      this.resize();
    }

    this.array[this.size++] = item;
  };

  add = (item, index = this.size) => {
    if (index < 0) {
      throw Error(`Index ${index} is negative!`);
    }

    while (index >= this.array.length) {
      this.resize();
    }

    this.array[index] = item;
    this.size = Math.max(this.size, index + 1);
  };

  get = (index) => {
    if (index < 0 || index >= this.size) {
      throw Error(`Array element with index ${index} does not exists`);
    }

    return this.array[index];
  };

  remove = (index) => {
    if (index < 0 || index >= this.size) {
      throw Error(`Array element with index ${index} does not exist`);
    }

    const removedItem = this.array[index];

    for (let i = index; i < this.size - 1; i++) {
      this.array[i] = this.array[i + 1];
    }

    this.array[this.size - 1] = undefined;
    this.size--;

    return removedItem;
  };
}

export default VectorArray;
