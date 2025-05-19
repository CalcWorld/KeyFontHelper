import { copy, del, k_tg, k_tg1, update } from "./_common.js";
import { cwex } from "./cwex.js";

const cwce = copy(cwex);

update(cwce, {
  'l': k_tg,
  '?': k_tg1,
});

del(cwce, ['t', ']', ':', ';', '_', '`', '|']);

export { cwce };
