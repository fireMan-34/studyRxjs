export function sleep (time: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/** @name ref 代理访问 */
export function createRefProxy<T extends { ref: unknown }> (target: T) {
  type IRefT = T & T['ref'];
  return new Proxy<IRefT>(target, {
    get(target, p, receiver) {
      if (p !== 'ref') {
        if (target.ref[p]) {
          return Reflect.get(target.ref as object, p, receiver);
        }
      }
      return Reflect.get(target, p, receiver);
    },
  });
};