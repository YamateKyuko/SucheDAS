import validator from 'validator';

const japaneseAlphaRegex = /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Script=Latin}\p{General_Category=Decimal_Number}]*$/u;
type SStr = string;
type SNum = string;
const isSStr = (str: string): str is SStr => validator.matches(str, japaneseAlphaRegex);
export const SStr = (str: string | null | undefined): SStr | null => {
  if (str == null || str == undefined) return null;
  if (!isSStr(str)) return null;
  return str;
};

const isSNum = (str: string): str is SNum => validator.isNumeric(str);
export const SNum = (str: string | null | undefined): number | null => {
  if (str == null || str == undefined) return null;
  if (!isSNum(str)) return null;
  const num = Number(str);
  if (isNaN(num)) return null;
  return num;
};

export const getStrs = <T extends readonly string[]>(params: {[k: string]: string | number | undefined}, ...keys: T): {[K in T[number]]: string} | null => {
  const res: {[k: string]: string} = {};
  for (const key of keys) {
    if (!isStr(params[key])) return null;
    const val = SStr(params[key]);
    if (val == null) return null;
    res[key] = val;
  };
  return res as {[K in T[number]]: string};
};

export const getNumstr = <T extends readonly string[]>(params: {[k: string]: string | undefined}, ...keys: T): {[K in T[number]]: number} | null => {
  const res: {[k: string]: number} = {};
  for (const key of keys) {
    const val = SNum(params[key]);
    if (val == null) return null;
    res[key] = val;
  };
  return res as {[K in T[number]]: number};
};

export const getNum = (str: string | null | undefined | number | string[], isConv?: boolean): number | null => {
  
  if (str == null || str == undefined) return null;
  if (isArr(str)) return null;
  if (isStr(str)) {
    if (!isConv) return null;
    const num = Number(str);
    if (isNaN(num)) return null;
    return num;
  };
  if (isNaN(str)) return null;
  return str;
};
export const getNums = <T extends readonly string[]>(params: {[k: string]: string | undefined | number}, ...keys: T): {[K in T[number]]: number} | null => {
  const res: {[k: string]: number} = {};
  for (const key of keys) {
    const val = getNum(params[key]);
    if (val == null) return null;
    res[key] = val;
  };
  return res as {[K in T[number]]: number};
};

const isStr = (str: unknown): str is string => typeof str == 'string';
const isArr = (arr: unknown): arr is string[] => Array.isArray(arr);

export const getStrArrs = <T extends readonly string[]>(params: {[k: string]: string | undefined | string[]}, ...keys: T): {[K in T[number]]: string[]} | null => {
  const res: {[k: string]: string[]} = {};
  for (const key of keys) {
    const val = params[key];
    if (val == null || val == undefined) return null;
    if (!isArr(val)) return null;
    res[key] = val;
  };
  return res as {[K in T[number]]: string[]};
}