import { cw01 } from './cw01.js';
import {
  b_arccos,
  b_arcsin,
  b_arctan,
  b_arctg,
  b_tg1,
  copy,
  del,
  k_7_,
  k_rep,
  k_sen,
  k_tg,
  update,
} from './_common.js';

const cw02 = copy(cw01);
update(cw02, {
  'b': ['(:)'],
  'f': ['[;]'],
  'r': ['(Arcsen)'],
  't': b_arccos,
  'u': k_rep,
  'y': b_arctan,
  'D': ['(|__)', '(∟)', '(⌙)'],
  'G': ['(Rép)', '(Rep)'],
  'H': ['[e^■]', '[e^x]'],
  'N': b_arcsin,
  'S': ['(|-)', '(├)'],
  'Z': b_arctg,
  '*': k_7_,
  ']': b_tg1,
  ':': k_tg,
  ';': k_sen,
});

del(cw02, ['J', 'Y', '_']);

export { cw02 };
