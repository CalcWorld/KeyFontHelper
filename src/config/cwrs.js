import { b_arccos, b_arcsin, b_arctg, copy, update } from './_common.js';
import { cwce } from './cwce.js';

const cwrs = copy(cwce);

update(cwrs, {
  '<': b_arcsin,
  '>': b_arccos,
  '?': b_arctg,
});

// del(cwrs, []);

export { cwrs };
