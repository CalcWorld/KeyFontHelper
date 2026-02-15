import { b_tg1, copy, del, k_tg, update } from './_common.js';
import { cwex } from './cwex.js';

const cwce = copy(cwex);

update(cwce, {
  'l': k_tg,
  '?': b_tg1,
});

del(cwce, ['t', ']', ':', ';', '_', '`', '|']);

export { cwce };
