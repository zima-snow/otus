import Edge from './Edge.js';

class Graph {
  constructor(adjacencyVector, size, weights) {
    this.adjacencyVector = adjacencyVector;
    this.size = size;
    this.weights = weights;
  }

  getVertexCount = () => {
    return this.size;
  };

  getAdjacentVertices = (vertex) => {
    if (vertex < 0 || vertex >= this.size) {
      throw new Error(`Vertex ${vertex} is out of bounds`);
    }

    return this.adjacencyVector[vertex].filter(
      (v) => v !== null && v !== undefined
    );
  };

  getEdgesWithWeights = (vertex) => {
    if (vertex < 0 || vertex >= this.size) {
      throw new Error(`Vertex ${vertex} is out of bounds`);
    }

    return this.adjacencyVector[vertex]
      .map((adjacentVertex, index) => ({
        vertex: adjacentVertex,
        weight: this.weights[vertex][index],
      }))
      .filter((edge) => edge.vertex !== null && edge.vertex !== undefined);
  };

  print = () => {
    for (let i = 0; i < this.size; i++) {
      const adjacentVertices = this.getAdjacentVertices(i);
      console.log(`Vertex ${i}: [${adjacentVertices.join(', ')}]`);
    }
  };

  printWithWeights = () => {
    for (let i = 0; i < this.size; i++) {
      const edges = this.getEdgesWithWeights(i);
      const edgesStr = edges.map((e) => `${e.vertex}(${e.weight})`).join(', ');
      console.log(`Vertex ${i}: [${edgesStr}]`);
    }
  };

  minDistanceVertex = (distances, visited) => {
    let minDistance = Infinity;
    let minVertex = -1;

    for (let v = 0; v < this.size; v++) {
      if (!visited[v] && distances[v] <= minDistance) {
        minDistance = distances[v];
        minVertex = v;
      }
    }

    return minVertex;
  };

  deikstra = (startVertex) => {
    if (startVertex < 0 || startVertex >= this.size) {
      throw new Error(`Start vertex ${startVertex} is out of bounds`);
    }

    const distances = new Array(this.size).fill(Infinity);
    const visited = new Array(this.size).fill(false);
    const previous = new Array(this.size).fill(null);
    const shortestPathEdges = [];

    distances[startVertex] = 0;

    for (let i = 0; i < this.size - 1; i++) {
      const currentVertex = this.minDistanceVertex(distances, visited);

      if (currentVertex === -1) break;

      visited[currentVertex] = true;

      if (previous[currentVertex] !== null) {
        shortestPathEdges.push(
          new Edge(
            previous[currentVertex],
            currentVertex,
            distances[currentVertex] - distances[previous[currentVertex]]
          )
        );
      }

      const edges = this.getEdgesWithWeights(currentVertex);

      for (const edge of edges) {
        const neighbor = edge.vertex;
        const newDistance = distances[currentVertex] + edge.weight;

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentVertex;
        }
      }
    }

    for (let v = 0; v < this.size; v++) {
      if (
        v !== startVertex &&
        previous[v] !== null &&
        !shortestPathEdges.some((e) => e.v2 === v)
      ) {
        shortestPathEdges.push(
          new Edge(previous[v], v, distances[v] - distances[previous[v]])
        );
      }
    }

    return shortestPathEdges;
  };
}

export default Graph;
