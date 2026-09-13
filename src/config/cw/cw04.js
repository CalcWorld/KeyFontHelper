import {
  b_abs_cw,
  b_integral_cw,
  b_ncr,
  b_npr,
  b_power_cw,
  b_product,
  b_ran,
  b_sen1,
  b_tg1,
  b_xf_cw,
  copy,
  del,
  k_ddx,
  k_per,
  k_pi,
  k_ran,
  k_sen,
  k_sigma,
  k_tg,
  update,
} from '../_common.js';
import { cw01 } from './cw01.js';

const cw04 = copy(cw01);
update(cw04, {
  'b': b_ncr,
  'f': k_sen,
  'r': b_power_cw,
  't': b_sen1,
  'v': b_npr,
  'y': b_ran,
  'D': b_abs_cw,
  'G': k_ddx,
  'H': b_xf_cw,
  'J': b_integral_cw,
  'S': k_pi,
  'Y': ['(RanInt)'],
  'Z': k_per,
  '-': k_sigma,
  '~': b_product,
  '}': k_tg,
  ']': b_tg1,
  ';': k_ran,
});

del(cw04, ['g', 'u']);

export { cw04 };
