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
