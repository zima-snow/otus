import AVLTreeNode from './AVLTreeNode.js';

class AVLTree {
  root = undefined;

  constructor() {
    this.root = null;
  }

  updateHeight = (node) => {
    if (node === null) return;

    const left = node.left === null ? -1 : node.left.height;
    const right = node.right === null ? -1 : node.right.height;
    node.height = 1 + Math.max(left, right);
  }

  insert = (key, current = null) => {
    const node = new AVLTreeNode(key);

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

    this.updateHeight(current.left);
    this.updateHeight(current.right);

    current.left = this.rebalance(current.left);
    current.right = this.rebalance(current.right);
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

  rebalanceAfterRemoveNode = (node) => {
    do {
      this.updateHeight(node);

      if (node === null) {
        break;
      }

      if (node.left !== null) {
        node.left = this.rebalance(node.left);
      }

      if (node.right !== null) {
        node.right = this.rebalance(node.right);
      }

      node = this.searchParent(node, this.root);
    } while (node !== null);
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

    if (node === minParent) {
      node = min;
    } else {
      node = minParent;
    }

    this.rebalanceAfterRemoveNode(node);
  };

  remove = (key) => {
    const node = this.search(key);

    if (node === null) return;

    this.removeNode(node);
  };

  minLeftRotation = (node) => {
    const oldRight = node.right;
    node.right = oldRight.left;
    oldRight.left = node;

    if (this.root === node) {
      this.root = oldRight;
    }

    this.updateHeight(node);
    this.updateHeight(oldRight);

    return oldRight;
  }

  minRightRotation = (node) => {
    const oldLeft = node.left;
    node.left = oldLeft.right;
    oldLeft.right = node;

    if (this.root === node) {
      this.root = oldLeft;
    }

    this.updateHeight(node);
    this.updateHeight(oldLeft);

    return oldLeft;
  }

  maxLeftRotation = (node) => {
    node.right = this.minRightRotation(node.right);
    node = this.minLeftRotation(node);
    this.updateHeight(node);
    return node;
  }

  maxRightRotation = (node) => {
    node.left = this.minLeftRotation(node.left);
    node = this.minRightRotation(node);
    this.updateHeight(node);
    return node;
  }

  rebalance = (node = null) => {
    if (node === null) {
      return null;
    }

    const left = node.left === null ? -1 : node.left.height;
    const right = node.right === null ? -1 : node.right.height;
    const balance = left - right;

    if (Math.abs(balance) < 2) {
      return node;
    }

    if (balance > 1) {
      const oldLeft = node.left;
      const left = oldLeft.left === null ? -1 : oldLeft.left.height;
      const right = oldLeft.right === null ? -1 : oldLeft.right.height;

      if (left - right >= 0) {
        node = this.minRightRotation(node);
      } else {
        node = this.maxRightRotation(node);
      }
    } else {
      const oldRight = node.right;
      const left = oldRight.left === null ? -1 : oldRight.left.height;
      const right = oldRight.right === null ? -1 : oldRight.right.height;

      if (left - right <= 0) {
        node = this.minLeftRotation(node);
      } else {
        node = this.maxLeftRotation(node);
      }
    }

    return node;
  }
}

export default AVLTree;
