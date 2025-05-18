import { cw01 } from "./cw01.js";

const cw02 = JSON.parse(JSON.stringify(cw01));
cw02['b'] = ['(:)'];
cw02['f'] = ['[;]'];
cw02['r'] = ['(Arcsen)'];
cw02['t'] = ['(Arccos)'];
cw02['y'] = ['(Arctan)'];
cw02['D'] = ['(|__)', '(∟)', '(⌙)'];
cw02['N'] = ['(Arcsin)'];
cw02['S'] = ['(|-)', '(├)'];
cw02['Z'] = ['(Arctg)'];
cw02['*'] = ['[7-]'];
cw02[']'] = ['(tg⁻¹)', '(tg^-1)'];
cw02[':'] = ['[tg]'];
cw02[';'] = ['[sen]'];
delete cw02['G'];
delete cw02['H'];
delete cw02['J'];
delete cw02['Y'];

export { cw02 };
