import TreeNode from './TreeNode.js';

class BinarySearchTree {
  root = undefined;

  constructor() {
    this.root = null;
  }

  insert = (key, current = null) => {
    const node = new TreeNode(key);

    if (this.root === null) {
      this.root = node;

      return;
    }

    if (current === null) {
      current = this.root;
    }

    if (key < current.key) {
      if (current.left === null) {
        current.left = node;
      } else {
        this.insert(key, current.left);
      }
    } else {
      if (current.right === null) {
        current.right = node;
      } else {
        this.insert(key, current.right);
      }
    }
  };

  search = (key, current = null) => {
    if (this.root === null) return null;

    if (current === null) {
      current = this.root;
    }

    if (key === current.key) {
      return current;
    }

    if (key < current.key) {
      return this.search(key, current.left);
    }

    return this.search(key, current.right);
  };

  searchParent = (node, current) => {
    if (node === null) return null;

    if (current === null) return null;

    if (current.key === node.key) return null;

    if (current.left !== null) {
      if (node.key === current.left.key) {
        return current;
      }
    }

    if (current.right !== null) {
      if (node.key === current.right.key) {
        return current;
      }
    }

    if (node.key < current.key) {
      return this.searchParent(node, current.left);
    }

    return this.searchParent(node, current.right);
  };

  removeNodeWithoutRightChild = (parent, node) => {
    if (parent !== null) {
      if (parent.left === node) {
        parent.left = node.left;
      } else {
        parent.right = node.left;
      }
    } else {
      this.root = node.left;
    }
  };

  removeNode = (node) => {
    const parent = this.searchParent(node, this.root);

    if (node.right === null) {
      this.removeNodeWithoutRightChild(parent, node);

      return;
    }

    let min = node.right;
    let minParent = node;

    while (min.left !== null) {
      minParent = min;
      min = min.left;
    }

    if (parent !== null) {
      if (parent.left === node) {
        parent.left = min;
      } else {
        parent.right = min;
      }
    } else {
      this.root = min;
    }

    if (min !== node.right) {
      minParent.left = min.right;
      min.right = node.right;
    }

    min.left = node.left;
  };

  remove = (key) => {
    const node = this.search(key);

    if (node === null) return;

    this.removeNode(node);
  };

  print = (node) => {
    if (node === null) return;

    this.print(node.left);

    console.log(`${node.key.toString()} `);

    this.print(node.right);

    return;
  };
}

export default BinarySearchTree;
