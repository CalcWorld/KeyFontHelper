import { keyTextMappingConvert, text2KeyFont } from "../src/index.js";
import { cw02 } from "../src/config/cw02.js";

const a = keyTextMappingConvert('cw02', cw02);
console.log(a);

console.log(text2KeyFont('cw02', '[tg]'))
console.log(text2KeyFont('cw01', '[tg]'))
console.log(text2KeyFont('cw02', '(d/dx)'))
console.log(text2KeyFont('cw01', '(d/dx)'))
