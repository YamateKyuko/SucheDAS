// function escapeHtml(unsafe) {
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }


function isEscapeNeeded(str: string): boolean {
  const bool = /&|<|>|"|'/.test(str);
  return !bool;
}

function escaped(unsafe: string): string | null {
  return isEscapeNeeded(unsafe) ? unsafe : null;
}

export function getStrFromObj<K extends string[]>(obj: sthObj, ...args: K): {[U in K[number]]: string} | null {
  const newObj = {} as sthObj;
  for (const arg of args) {
    const str = obj[arg];
    if (!isStr(str)) return null;
    const esc = escaped(str);
    if (!esc) return null;
    newObj[arg] = esc;
  }
  return newObj as unknown as {[U in K[number]]: string};
}

type sthObj = {[k: string]: string | number | undefined | string[] | null};
const isStr = (str: string | number | undefined | string[] | null): str is string => typeof str === 'string';