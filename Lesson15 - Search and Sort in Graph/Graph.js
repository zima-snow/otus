class Graph {
  constructor(adjacencyVector, size) {
    this.adjacencyVector = adjacencyVector;
    this.size = size;
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

  print() {
    for (let i = 0; i < this.size; i++) {
      const adjacentVertices = this.getAdjacentVertices(i);
      console.log(`Vertex ${i}: [${adjacentVertices.join(', ')}]`);
    }
  }

  demukron() {
    const inDegree = new Array(this.size).fill(0);

    for (let i = 0; i < this.size; i++) {
      for (const neighbor of this.adjacencyVector[i]) {
        if (neighbor !== null && neighbor !== undefined) {
          inDegree[neighbor]++;
        }
      }
    }

    const levels = [];
    const currentInDegree = [...inDegree];
    let currentLevelVertices = [];

    for (let i = 0; i < this.size; i++) {
      if (currentInDegree[i] === 0) {
        currentLevelVertices.push(i);
      }
    }

    while (currentLevelVertices.length > 0) {
      levels.push([...currentLevelVertices]);
      const nextLevelVertices = [];

      for (const vertex of currentLevelVertices) {
        for (const neighbor of this.adjacencyVector[vertex]) {
          if (neighbor !== null && neighbor !== undefined) {
            currentInDegree[neighbor]--;

            if (currentInDegree[neighbor] === 0) {
              nextLevelVertices.push(neighbor);
            }
          }
        }
      }

      currentLevelVertices = nextLevelVertices;
    }

    const hasCycles = currentInDegree.some((degree) => degree > 0);

    if (hasCycles) {
      throw new Error(
        'Graph contains cycles and cannot be topologically sorted'
      );
    }

    return levels;
  }
}

export default Graph;
