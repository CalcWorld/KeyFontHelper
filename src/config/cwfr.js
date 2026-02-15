import {
  b_a10n,
  b_arccos,
  b_arcsin,
  b_arctan,
  copy,
  del,
  k_7_,
  k_fr_divisionr,
  k_rep,
  k_seconde,
  k_suppr,
  update,
} from './_common.js';
import { cwex } from './cwex.js';

const cwfr = copy(cwex);

update(cwfr, {
  '7': k_7_,
  'o': k_suppr,
  'q': k_seconde,
  't': b_a10n,
  'L': ['(CONFIG)'],
  'M': k_rep,
  '-': k_fr_divisionr,
  '<': b_arcsin,
  '>': b_arccos,
  '?': b_arctan,
  '`': ['(Décomp)', '(Decomp)'],
});

del(cwfr, ['#', ']', ':', ';', '_', '|']);

export { cwfr };
