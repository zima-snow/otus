// Структура с оглавлением
const linearAdjacency = [
  /* u1 */ 3, 4,   // v1, v2
  /* u2 */ 4, 5,   // v2, v3
  /* u3 */ 6,      // v4
  /* v1 */ 0,      // u1
  /* v2 */ 0, 1,   // u1, u2
  /* v3 */ 1,      // u2
  /* v4 */ 2       // u3
];

const header = [
  0,  // u1
  2,  // u2
  4,  // u3
  5,  // v1
  6,  // v2
  8,  // v3
  9   // v4
];

// Список вершин и список ребер
class Vertex {
  constructor(name) {
    this.name = name;       // Имя вершины ('u1', 'v2' и т.д.)
    this.firstEdge = null;  // Указатель на первое инцидентное ребро
    this.nextVertex = null; // Указатель на следующую вершину в списке
  }
}

class Edge {
  constructor(vertex1, vertex2) {
    this.vertex1 = vertex1;  // Первая инцидентная вершина
    this.vertex2 = vertex2;  // Вторая инцидентная вершина
    this.nextEdge1 = null;   // Следующее ребро для vertex1
    this.nextEdge2 = null;   // Следующее ребро для vertex2
  }
}

const u1 = new Vertex('u1');
const u2 = new Vertex('u2');
const u3 = new Vertex('u3');
const v1 = new Vertex('v1');
const v2 = new Vertex('v2');
const v3 = new Vertex('v3');
const v4 = new Vertex('v4');

// Связываем вершины в список (u1 → u2 → u3 → v1 → v2 → v3 → v4)
u1.nextVertex = u2;
u2.nextVertex = u3;
u3.nextVertex = v1;
v1.nextVertex = v2;
v2.nextVertex = v3;
v3.nextVertex = v4;

// Создаём рёбра и связываем их с вершинами
const e1 = new Edge(u1, v1);
const e2 = new Edge(u1, v2);
const e3 = new Edge(u2, v2);
const e4 = new Edge(u2, v3);
const e5 = new Edge(u3, v4);

// Связываем рёбра с вершинами u1-u3
u1.firstEdge = e1;
e1.nextEdge1 = e2;

u2.firstEdge = e3;
e3.nextEdge1 = e4;

u3.firstEdge = e5;

// Связываем рёбра с вершинами v1-v4
v1.firstEdge = e1;

v2.firstEdge = e2;
e2.nextEdge2 = e3;

v3.firstEdge = e4;
v4.firstEdge = e5;
