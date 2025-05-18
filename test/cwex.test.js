import { keyTextMappingConvert, text2KeyFont } from "../src/index.js";
import { cwex } from "../src/config/cwex.js";

const a = keyTextMappingConvert(cwex);
console.log(a);

console.log(text2KeyFont('cwex', '[tg]'))
console.log(text2KeyFont('cwex', '(d/dx)'))
