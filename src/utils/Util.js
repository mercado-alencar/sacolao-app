/* eslint-disabled */
const moneyRegex = /(\R\$) \d+(?:\.\d{3})*?,\d{2}/gm;
export const copy = (origin) => Object.assign({}, origin);
export const defined = (obj, undefined) => obj !== undefined;
export const isUndefined = (obj, undefined) => obj == undefined;
export const merge = (first, second) => Object.assign({}, first, second);
export const uniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
export const clearMoney = (str) => str.replace(moneyRegex, '');