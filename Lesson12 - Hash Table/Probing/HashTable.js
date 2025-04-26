class HashTable {
  constructor(initialSize = 10, loadFactor = 0.75) {
    this.size = initialSize;
    this.loadFactor = loadFactor;
    this.count = 0;
    this.deletedCount = 0;
    this.table = new Array(this.size).fill(null);
    this.DELETED = {};
  }

  hash = (key, size) => {
    if (typeof key !== 'string') {
      throw new Error('Only string keys are supported');
    }
    
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % size;
  };

  findSlot = (key) => {
    let index = this.hash(key, this.size);
    let deletedSlot = null;
    let probe = 1;

    while (true) {
      const item = this.table[index];
      
      if (item === null) {
        return deletedSlot !== null ? deletedSlot : index;
      }
      
      if (item === this.DELETED) {
        if (deletedSlot === null) {
          deletedSlot = index;
        }
      } else if (item.key === key) {
        return index;
      }

      index = (index + probe * probe) % this.size;
      probe += 1;

      if (probe > this.size) {
        return deletedSlot !== null ? deletedSlot : -1;
      }
    }
  };

  resize = (newSize) => {
    const oldTable = this.table;
    this.size = newSize;
    this.count = 0;
    this.deletedCount = 0;
    this.table = new Array(this.size).fill(null);

    for (const item of oldTable) {
      if (item && item !== this.DELETED) {
        this.set(item.key, item.value);
      }
    }
  };

  set = (key, value) => {
    const load = (this.count + this.deletedCount) / this.size;

    if (load > this.loadFactor) {
      this.resize(this.size * 2);
    }

    const index = this.findSlot(key);

    if (index === -1) {
      throw new Error('Hash table is full');
    }

    if (this.table[index] === null || this.table[index] === this.DELETED) {
      this.count += 1;

      if (this.table[index] === this.DELETED) {
        this.deletedCount -= 1;
      }
    }

    this.table[index] = { key, value };
  }

  get = (key) => {
    const index = this.findSlot(key);

    if (index === -1 || this.table[index] === null || this.table[index] === this.DELETED) {
      return undefined;
    }

    return this.table[index].value;
  }

  delete = (key) => {
    const index = this.findSlot(key);

    if (index === -1 || this.table[index] === null || this.table[index] === this.DELETED) {
      return false;
    }

    this.table[index] = this.DELETED;
    this.count -= 1;
    this.deletedCount += 1;

    return true;
  }

  has = (key) => {
    return this.get(key) !== undefined;
  }
}

export default HashTable;
