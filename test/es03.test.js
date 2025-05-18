import { keyTextMappingConvert, text2KeyFont } from "../src/index.js";
import { es03 } from "../src/config/es03.js";

const a = keyTextMappingConvert(es03);
console.log(a);

console.log(text2KeyFont('es03', '1[+]1'))
console.log(text2KeyFont('es03', '1(Conv)'))
