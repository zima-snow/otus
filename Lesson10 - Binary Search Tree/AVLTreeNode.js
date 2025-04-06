class AVLTreeNode {
  key = undefined;
  left = null;
  right = null;
  height = undefined;

  constructor(key) {
    this.key = key;
    this.height = 0;
  }
}

export default AVLTreeNode;
