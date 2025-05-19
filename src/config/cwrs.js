import { copy, update } from "./_common.js";
import { cwce } from "./cwce.js";

const cwrs = copy(cwce);

update(cwrs, {
  '<': ['(Arcsin)'],
  '>': ['(Arccos)'],
  '?': ['(Arctg)'],
});

// del(cwrs, []);

export { cwrs };
