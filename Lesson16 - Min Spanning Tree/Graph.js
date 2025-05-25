import Edge from './Edge.js';

class Graph {
  constructor(adjacencyVector, size, weights) {
    this.adjacencyVector = adjacencyVector;
    this.size = size;
    this.weights = weights;
  }

  getVertexCount() {
    return this.size;
  }

  getAdjacentVertices(vertex) {
    if (vertex < 0 || vertex >= this.size) {
      throw new Error(`Vertex ${vertex} is out of bounds`);
    }

    return this.adjacencyVector[vertex].filter(
      (v) => v !== null && v !== undefined
    );
  }

  getEdgesWithWeights(vertex) {
    if (vertex < 0 || vertex >= this.size) {
      throw new Error(`Vertex ${vertex} is out of bounds`);
    }

    return this.adjacencyVector[vertex]
      .map((adjacentVertex, index) => ({
        vertex: adjacentVertex,
        weight: this.weights[vertex][index],
      }))
      .filter((edge) => edge.vertex !== null && edge.vertex !== undefined);
  }

  print() {
    for (let i = 0; i < this.size; i++) {
      const adjacentVertices = this.getAdjacentVertices(i);
      console.log(`Vertex ${i}: [${adjacentVertices.join(', ')}]`);
    }
  }

  printWithWeights() {
    for (let i = 0; i < this.size; i++) {
      const edges = this.getEdgesWithWeights(i);
      const edgesStr = edges.map((e) => `${e.vertex}(${e.weight})`).join(', ');
      console.log(`Vertex ${i}: [${edgesStr}]`);
    }
  }

  getEdges() {
    const edges = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.adjacencyVector[i].length; j++) {
        const to = this.adjacencyVector[i][j];

        if (to !== null) {
          const edge = new Edge(i, to, this.weights[i][j]);
          edges.push(edge);
        }
      }
    }

    return edges;
  }

  isConnected() {
    const visited = new Array(this.size).fill(false);
    const stack = [0];
    visited[0] = true;
    let visitedCount = 1;

    while (stack.length > 0) {
      const vertex = stack.pop();
      const neighbors = this.getAdjacentVertices(vertex);

      for (const neighbor of neighbors) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          visitedCount++;
          stack.push(neighbor);
        }
      }
    }

    return visitedCount === this.size;
  }

  kruscal = () => {
    if (!this.isConnected()) {
      throw new Error(
        "Graph is not connected. Kruskal's algorithm requires a connected graph."
      );
    }

    const edges = this.getEdges().sort((a, b) => a.weight - b.weight);
    const parent = new Array(this.size);

    const getParent = (vertex) => {
      while (parent[vertex] !== vertex) {
        vertex = parent[vertex];
      }

      return vertex;
    };

    const union = (x, y) => {
      const rootX = getParent(x);
      const rootY = getParent(y);

      if (rootX !== rootY) {
        parent[rootY] = rootX;
      }
    };

    for (let i = 0; i < this.size; i++) {
      parent[i] = i;
    }

    const mst = [];
    let edgeCount = 0;

    for (const edge of edges) {
      if (edgeCount === this.size - 1) break;

      const rootFrom = getParent(edge.from);
      const rootTo = getParent(edge.to);

      if (rootFrom !== rootTo) {
        mst.push(edge);
        union(rootFrom, rootTo);
        edgeCount++;
      }
    }

    return mst;
  }
}

export default Graph;
