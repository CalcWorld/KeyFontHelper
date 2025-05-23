import { cw01 } from "./cw01.js";
import { copy, del, k_7_, k_arccos, k_arcsin, k_arctan, k_arctg, k_sen, k_tg, k_tg1, update } from "./_common.js";

const cw02 = copy(cw01);
update(cw02, {
  'b': ['(:)'],
  'f': ['[;]'],
  'r': ['(Arcsen)'],
  't': k_arccos,
  'y': k_arctan,
  'D': ['(|__)', '(∟)', '(⌙)'],
  'G': ['(Rép)', '(Rep)'],
  'H': ['[e^x]', '[e^■]'],
  'N': k_arcsin,
  'S': ['(|-)', '(├)'],
  'Z': k_arctg,
  '*': k_7_,
  ']': k_tg1,
  ':': k_tg,
  ';': k_sen,
});

del(cw02, ['J', 'Y']);

export { cw02 };
