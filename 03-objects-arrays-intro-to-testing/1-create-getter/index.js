/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  return function (obj) {
    const pathProps = path.split('.');
    let currentObj = obj;
    for (let prop of pathProps) {
      if (!(prop in currentObj)) {
        return undefined;
      }
      currentObj = currentObj[prop];
    }
    return currentObj;
  };
}
