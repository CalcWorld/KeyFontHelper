import { copy, del, k_pi_, update } from "./_common.js";
import { cwex } from "./cwex.js";

const cwde = copy(cwex);
update(cwde, {
  '{': k_pi_
});
del(cwde, ['t', ']', ';', '_', '`', '|']);
export { cwde };
