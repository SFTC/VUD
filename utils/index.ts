// 下划线转换驼峰
export function toCamel (str: string) {
  // eslint-disable-line
  return str.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

export function toCapital (str: string) {
  return str.replace(/^\S/, s => s.toUpperCase())
}

export const throttle = (fn: { apply: (arg0: any, arg1: IArguments) => void }, delay: number) => {
  let last = 0;
  return function (this: any, ...args: any) {
    const curr = +new Date();
    if (curr - last > delay) {
      fn.apply(this, args);
      last = curr;
    }
  };
};
