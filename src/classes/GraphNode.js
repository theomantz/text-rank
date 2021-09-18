class GraphNode {
  constructor(val) {
    this.val = val;
    this.children = new Set();
  }
}

module.exports = GraphNode;
