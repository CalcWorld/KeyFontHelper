import {
  copy,
  del,
  k_7_,
  k_a10x,
  k_arccos,
  k_arcsin,
  k_arctan,
  k_fr_divisionr,
  k_rep,
  k_seconde,
  k_suppr,
  update
} from "./_common.js";
import { cwex } from "./cwex.js";

const cwfr = copy(cwex);

update(cwfr, {
  '7': k_7_,
  'o': k_suppr,
  'q': k_seconde,
  't': k_a10x,
  'L': ['(CONFIG)'],
  'M': k_rep,
  '-': k_fr_divisionr,
  '<': k_arcsin,
  '>': k_arccos,
  '?': k_arctan,
  '`': ['(Decomp)', '(Décomp)'],
});

del(cwfr, ['#', ']', ':', ';', '_', '|']);

export { cwfr };
