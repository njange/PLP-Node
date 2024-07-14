function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.time('Fibonacci');
const fibNumber = fibonacci(40); // This is a CPU-intensive task.
console.timeEnd('Fibonacci');
console.log(`Fibonacci(40): ${fibNumber}`);

const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  console.time('FibonacciWorker');
  const worker = new Worker(__filename);
  worker.on('message', (msg) => {
    console.timeEnd('FibonacciWorker');
    console.log(`Fibonacci(40) with Worker: ${msg}`);
  });
  worker.postMessage(40);
} else {
  parentPort.on('message', (n) => {
    parentPort.postMessage(fibonacci(n));
  });
}