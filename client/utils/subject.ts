/** A simple Observable/Observer pattern implementation */
export function Subject(): {
  react: (val: any) => void;
  subscribe: (callback: (...args: any[]) => void) => void;
} {
  // list of callbacks to notiffy
  const callbacks = [];
  return {
    // when this is triggered, every callback is triggered with the new value
    react(val: any) {
      callbacks.forEach(cb => cb(val));
    },
    // add a new listener
    subscribe(callback) {
      callbacks.push(callback);
    }
  };
}
