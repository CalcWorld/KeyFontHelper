import { cw01 } from './cw01.js';
import {
  b_ans,
  b_arccos,
  b_arcsen,
  b_arcsin,
  b_arctan,
  b_arctg,
  b_es_divisionr,
  b_format,
  b_fr_divisionr,
  b_tg1,
  copy,
  k_7_,
  k_rep,
  k_sen,
  k_tg,
  update,
} from '../_common.js';

const cw02 = copy(cw01);
update(cw02, {
  'b': ['(:)'],
  'f': ['[;]'],
  'r': b_arcsen,
  't': b_arccos,
  'u': k_rep,
  'y': b_arctan,
  'D': b_fr_divisionr,
  'G': ['(Rép)', '(Rep)'],
  'H': ['[e^■]', '[e^x]'],
  'J': b_ans,
  'N': b_arcsin,
  'S': b_es_divisionr,
  'Y': b_format,
  'Z': b_arctg,
  '*': k_7_,
  ']': b_tg1,
  ':': k_tg,
  ';': k_sen,
});

export { cw02 };
