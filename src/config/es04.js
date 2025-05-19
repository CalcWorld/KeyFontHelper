import { copy, del, k_abc2dc_, k_adc_, k_pi_, k_sd, update } from "./_common.js";
import { es03 } from "./es03.js";

const es04 = copy(es03);

update(es04, {
  'f': k_abc2dc_,
  't': ['[10^x]', '[10^■]'],
  'I': ['[Rnd]'],
  'T': ['[SETUP]'],
  'U': k_sd.map(i => i.replace('S', 'F')),
  'V': ['[M-]'],
  'Y': k_pi_,
  '"': ['[MODO]'],
  '&': ['[ENC]'],
  '*': k_adc_,
  '#': ['[CLR]'],
  '{': ['(▶%)'],
  ':': ['[RCL M]'],
  ';': ['[STO M]'],
  '`': ['[Ran#]'],
});

del(es04, ['w', 'A', 'B', 'F', 'G', 'H', 'L', 'N', 'S', 'X', 'Z', '\'', '%', '<', '>', '?', '@', '[', '}', ']', '_', '|',]);

export { es04 };
