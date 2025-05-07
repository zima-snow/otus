var Trie = function () {
  this.root = this.createNode();
};

/**
 * @return {[children, isEnd]}
 */
Trie.prototype.createNode = function () {
  const children = new Array(26).fill(null);

  return [children, false];
};

/**
 * @param {char} char
 * @return {number}
 */
Trie.prototype.charToIndex = function (char) {
  return char.charCodeAt(0) - 'a'.charCodeAt(0);
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let node = this.root;

  for (const char of word) {
    const index = this.charToIndex(char);

    if (!node[0][index]) {
      node[0][index] = this.createNode();
    }

    node = node[0][index];
  }

  node[1] = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let node = this.root;

  for (const char of word) {
    const index = this.charToIndex(char);

    if (!node[0][index]) {
      return false;
    }

    node = node[0][index];
  }

  return node[1];
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let node = this.root;

  for (const char of prefix) {
    const index = this.charToIndex(char);

    if (!node[0][index]) {
      return false;
    }

    node = node[0][index];
  }

  return true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.remove = function (word) {
  let node = this.root;

  for (const char of word) {
    const index = this.charToIndex(char);

    if (!node[0][index]) {
      return false;
    }

    node = node[0][index];
  }

  if (!node[1]) {
    return false;
  }

  node[1] = false;

  return true;
};

export default Trie;
