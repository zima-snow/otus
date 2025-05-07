var TrieMap = function () {
  this.root = this.createNode();
};

/**
 * @return {[children, value]}
 */
TrieMap.prototype.createNode = function () {
  const children = new Array(26).fill(null);

  return [children, undefined];
};

/**
 * @param {char} char
 * @return {number}
 */
TrieMap.prototype.charToIndex = function (char) {
  return char.charCodeAt(0) - 'a'.charCodeAt(0);
};

/**
 * @param {string} key
 * @param {any} value
 * @return {void}
 */
TrieMap.prototype.insert = function (key, value) {
  let node = this.root;

  for (const char of key) {
    const index = this.charToIndex(char);

    if (!node[0][index]) {
      node[0][index] = this.createNode();
    }

    node = node[0][index];
  }

  node[1] = value;
};

/**
 * @param {string} key
 * @return {any}
 */
TrieMap.prototype.get = function (key) {
  let node = this.root;

  for (const char of key) {
    const index = this.charToIndex(char);

    if (!node[0][index]) {
      return undefined;
    }

    node = node[0][index];
  }

  return node[1];
};

/**
 * @param {string} key
 * @return {boolean}
 */
TrieMap.prototype.remove = function (key) {
  let node = this.root;

  for (const char of key) {
    const index = this.charToIndex(char);

    if (!node[0][index]) {
      return false;
    }

    node = node[0][index];
  }

  if (node[1] === undefined) {
    return false;
  }

  node[1] = undefined;

  return true;
};

/**
 * @param {string} key
 * @return {boolean}
 */
TrieMap.prototype.has = function (key) {
  return this.get(key) !== undefined;
};

export default TrieMap;
