export function PromiseQueue() {
  let queue = Promise.resolve();

  function add<T>(operation: (value: T | void) => PromiseLike<T>) {
    return new Promise((resolve, reject) => {
      queue = queue.then(operation).then(resolve).catch(reject);
    });
  }

  return { queue, add };
}
