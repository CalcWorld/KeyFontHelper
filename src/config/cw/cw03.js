import { cw01 } from './cw01.js';
import {
  b_abs_cw,
  b_arccos,
  b_arcsen,
  b_arctan,
  b_en,
  b_es_divisionr,
  b_fx,
  b_integral_cw,
  copy,
  del,
  k_dms,
  k_sen,
  update,
} from '../_common.js';

const cw03 = copy(cw01);
update(cw03, {
  'f': k_sen,
  'r': b_fx,
  't': b_arcsen,
  'u': b_arctan,
  'y': b_arccos,
  'D': b_abs_cw,
  'H': b_en,
  'J': b_integral_cw,
  'S': k_dms,
  '-': b_es_divisionr,
  ';': ['(S+)'],
});

del(cw03, ['G', '*', ']']);

export { cw03 };
