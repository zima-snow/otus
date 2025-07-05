class PriorityQueue {
  constructor() {
    this.queues = [];
  }

  enqueue(priority, item) {
    if (priority < 0) {
      throw new Error('Priority must be a non-negative number');
    }

    if (!this.queues[priority]) {
      this.queues[priority] = [];
    }

    this.queues[priority].push(item);
  }

  dequeue() {
    for (let i = 0; i < this.queues.length; i++) {
      const queue = this.queues[i];

      if (queue && queue.length > 0) {
        return queue.shift();
      }
    }

    return undefined;
  }

  isEmpty() {
    return this.queues.every((queue) => !queue || queue.length === 0);
  }

  size() {
    return this.queues.reduce((sum, queue) => sum + (queue?.length || 0), 0);
  }
}

export default PriorityQueue;
