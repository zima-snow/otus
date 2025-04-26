import ListNode from './ListNode.js';

class HashTable {
  constructor(initialSize = 10, loadFactor = 0.75) {
    this.size = initialSize;
    this.loadFactor = loadFactor;
    this.count = 0;
    this.deletedCount = 0;
    this.table = new Array(this.size).fill(null);
  }

  hash = (key, size) => {
    if (typeof key !== 'string') {
      throw new Error('Only string keys are supported');
    }

    let hashValue = 0;

    for (let i = 0; i < key.length; i += 1) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue % size;
  };

  set = (key, value) => {
    if (this.count / this.size >= this.loadFactor) {
      this.rehash();
    }

    const index = this.hash(key, this.size);
    let current = this.table[index];

    while (current !== null) {
      if (current.key === key) {
        if (current.isDeleted) {
          current.value = value;
          current.isDeleted = false;
          this.deletedCount -= 1;
        } else {
          current.value = value;
        }

        return;
      }

      current = current.next;
    }

    const newNode = new ListNode(key, value);
    newNode.next = this.table[index];
    this.table[index] = newNode;
    this.count += 1;
  };

  get = (key) => {
    const index = this.hash(key, this.size);
    let current = this.table[index];

    while (current !== null) {
      if (current.key === key && !current.isDeleted) {
        return current.value;
      }

      current = current.next;
    }

    return null;
  };

  delete = (key) => {
    const index = this.hash(key, this.size);
    let current = this.table[index];

    while (current !== null) {
      if (current.key === key && !current.isDeleted) {
        current.isDeleted = true;
        this.deletedCount += 1;

        return current.value;
      }

      prev = current;
      current = current.next;
    }

    return null;
  };

  has = (key) => {
    const index = this.hash(key, this.size);
    let current = this.table[index];

    while (current !== null) {
      if (current.key === key && !current.isDeleted) {
        return true;
      }

      current = current.next;
    }

    return false;
  };

  rehash = () => {
    const newSize = this.size * 2;
    const newTable = new Array(newSize).fill(null);
    let aliveCount = 0;

    for (let i = 0; i < this.size; i += 1) {
      let current = this.table[i];

      while (current !== null) {
        if (!current.isDeleted) {
          const newIndex = this.hash(current.key, newSize);
          const newNode = new ListNode(current.key, current.value);

          if (newTable[newIndex] === null) {
            newTable[newIndex] = newNode;
          } else {
            newNode.next = newTable[newIndex];
            newTable[newIndex] = newNode;
          }

          aliveCount += 1;
        }

        current = current.next;
      }
    }

    this.size = newSize;
    this.table = newTable;
    this.count = aliveCount;
    this.deletedCount = 0;
  };

  cleanUp = () => {
    for (let i = 0; i < this.size; i += 1) {
      let current = this.table[i];
      let prev = null;

      while (current !== null) {
        if (current.isDeleted) {
          if (prev === null) {
            this.table[i] = current.next;
          } else {
            prev.next = current.next;
          }

          this.count -= 1;
          this.deletedCount -= 1;
        } else {
          prev = current;
        }

        current = current.next;
      }
    }
  };
}

export default HashTable;
