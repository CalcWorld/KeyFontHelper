import { copy, k_arccos, k_arcsin, k_arctg, update } from './_common.js';
import { cwce } from './cwce.js';

const cwrs = copy(cwce);

update(cwrs, {
  '<': k_arcsin,
  '>': k_arccos,
  '?': k_arctg,
});

// del(cwrs, []);

export { cwrs };
