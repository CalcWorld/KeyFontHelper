import { keyTextMappingConvert, text2KeyFont } from "../src/index.js";
import { cw01 } from "../src/config/cw01.js";

const a = keyTextMappingConvert(cw01);
console.log(a);

console.log(text2KeyFont('cw01', '1[+]1'))
console.log(text2KeyFont('cw01', '1[+][+]1'))
console.log(text2KeyFont('cw01', '1[+]1[=]2'))
console.log(text2KeyFont('cw01', '1[+]1[=]2[tan]'))
console.log(text2KeyFont('cw01', '[开机][主屏幕][↑]'))
console.log(text2KeyFont('cw01', '[开机][主屏幕][↑][↟上翻][设置][返回][←][OK][→][↡下翻][SHIFT][变量][f(x)][↓][目录][工具][x][■/□][√(■)][■^□][■²][log(■,□)][(-)][sin][cos][tan][(][)][7][8][9][⌫][AC][4][5][6][×][÷][1][2][3][+][-][0][.][×10^■][格式][EXE]'))
