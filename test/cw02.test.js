import { text2KeyFont } from '../src/index.js';
import { cw02 } from '../src/config/cw/cw02.js';
import { keyTextMappingConvert } from '../src/config/_common.js';

const a = keyTextMappingConvert('cw02', cw02);
console.log(a);

console.log(text2KeyFont('cw02', '[tg]'));
console.log(text2KeyFont('cw01', '[tg]'));
console.log(text2KeyFont('cw02', '(d/dx)'));
console.log(text2KeyFont('cw01', '(d/dx)'));
