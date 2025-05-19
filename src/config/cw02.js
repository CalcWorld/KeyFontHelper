import { cw01 } from "./cw01.js";
import { copy, del, k_tg, k_tg1, update } from "./_common.js";

const cw02 = copy(cw01);
update(cw02, {
  'b': ['(:)'],
  'f': ['[;]'],
  'r': ['(Arcsen)'],
  't': ['(Arccos)'],
  'y': ['(Arctan)'],
  'D': ['(|__)', '(∟)', '(⌙)'],
  'N': ['(Arcsin)'],
  'S': ['(|-)', '(├)'],
  'Z': ['(Arctg)'],
  '*': ['[7-]'],
  ']': k_tg1,
  ':': k_tg,
  ';': ['[sen]'],
});

del(cw02, ['G', 'H', 'J', 'Y']);

export { cw02 };
