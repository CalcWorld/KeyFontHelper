import { copy, del, k_abc2dc, k_adc, k_fd, k_mminus, k_pi, update } from '../_common.js';
import { es03 } from './es03.js';

const es04 = copy(es03);

update(es04, {
  'f': k_abc2dc,
  't': ['[10^■]', '[10^x]'],
  'I': ['[Rnd]'],
  'T': ['[SETUP]'],
  'U': k_fd,
  'V': k_mminus,
  'Y': k_pi,
  '"': ['[MODO]'],
  '&': ['[ENC]'],
  '*': k_adc,
  '#': ['[CLR]'],
  '{': ['(▶%)'],
  ':': ['[RCL M]'],
  ';': ['[STO M]'],
  '`': ['[Ran#]'],
});

del(es04, ['w', 'A', 'B', 'F', 'G', 'H', 'L', 'N', 'S', 'X', 'Z', '\'', '%', '<', '>', '?', '@', '[', '}', ']', '_', '|']);

export { es04 };
