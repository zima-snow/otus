import TreeNode from './TreeNode.js';

class RandomTree {
  root = undefined;

  constructor() {
    this.root = null;
  }

  insert = (key) => {
    const node = new TreeNode(key);

    if (this.root === null) {
      this.root = node;
      return node;
    }

    let current = this.root;

    while (true) {
      if (key < current.key) {
        if (current.left === null) {
          current.left = node;
          break;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          break;
        }

        current = current.right;
      }
    }

    return node;
  };

  search = (key) => {
    let current = this.root;

    while (current !== null) {
      if (key === current.key) {
        return current;
      }

      current = key < current.key ? current.left : current.right;
    }

    return null;
  };

  searchParent = (node) => {
    if (!node || node === this.root) return null;

    let parent = null;
    let current = this.root;

    while (current && current !== node) {
      parent = current;
      current = node.key < current.key ? current.left : current.right;
    }

    return current === node ? parent : null;
  };

  randomInsert = (key) => {
    const node = this.insert(key);

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber < 30) return node;

    this.splay(node);

    return node;
  };

  randomSearch = (key) => {
    let node = this.root;
    let parent = null;

    while (node !== null && node.key !== key) {
      parent = node;
      node = key < node.key ? node.left : node.right;
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber < 30) return node;

    if (node !== null) {
      this.splay(node);
    } else if (parent !== null) {
      this.splay(parent);
    }

    return node;
  };

  splay(node) {
    while (node !== this.root) {
      const parent = this.searchParent(node);

      if (!parent) break;

      const grandParent = this.searchParent(parent);

      if (!grandParent) {
        if (parent.left === node) {
          this.rotateRight(parent);
        } else {
          this.rotateLeft(parent);
        }

        break;
      }

      const parentIsLeftChild = grandParent.left === parent;
      const nodeIsLeftChild = parent.left === node;

      if (parentIsLeftChild === nodeIsLeftChild) {
        if (nodeIsLeftChild) {
          this.rotateRight(grandParent);
          this.rotateRight(parent);
        } else {
          this.rotateLeft(grandParent);
          this.rotateLeft(parent);
        }
      } else {
        if (nodeIsLeftChild) {
          this.rotateRight(parent);
          this.rotateLeft(grandParent);
        } else {
          this.rotateLeft(parent);
          this.rotateRight(grandParent);
        }
      }
    }
  }

  rotateLeft(node) {
    if (!node || !node.right) return;

    const newParent = node.right;
    node.right = newParent.left;
    newParent.left = node;

    this.updateParentReference(node, newParent);
  }

  rotateRight(node) {
    if (!node || !node.left) return;

    const newParent = node.left;
    node.left = newParent.right;
    newParent.right = node;

    this.updateParentReference(node, newParent);
  }

  updateParentReference(oldChild, newChild) {
    if (oldChild === this.root) {
      this.root = newChild;
    } else {
      const parent = this.searchParent(oldChild);

      if (parent) {
        if (parent.left === oldChild) {
          parent.left = newChild;
        } else {
          parent.right = newChild;
        }
      }
    }
  }
}

export default RandomTree;
