export function numKey(keyMapping) {
  for (let i = 0; i < 10; i++) {
    keyMapping[`${i}`] = [`[${i}]`];
  }
  return keyMapping;
}

export const k_frac = ['[d/c]', '[■/□]'];
export const k_eng = ['[ENG]'];
export const k_eq = ['[=]'];
export const k_log = ['(log)'];
export const k_square = ['[x^2]', '[■²]', '[x²]'];
export const k_log_ = ['[log]'];
export const k_logab = ['[log(a,b)]', '[logab]', '[log(■,□)]'];
export const k_sin = ['[sin]'];
export const k_cos = ['[cos]'];
export const k_tan = ['[tan]'];
export const k_minus = ['[-]'];
export const k_sqrt = ['[Square Root]', '[√(■)]', '[sqrt]'];
export const k_neg = ['[(-)]'];
export const k_exe = ['[EXE]'];
export const k_ac = ['[AC]'];
export const k_up = ['[Up]', '[↑]'];
export const k_nsqrt = ['(nth Root)', '(n sqrt a)', '(■√(□))'];
export const k_ans = ['[Ans]'];
export const k_multi = ['[*]', '[×]'];
export const k_division = ['[/]', '[÷]'];
export const k_down = ['[Down]', '[↓]'];
export const k_i = ['(i)'];
export const k_ddx = ['(d/dx)'];
export const k_arg = ['(∠)', '(arg)'];
export const k_left = ['[Left]', '[←]'];
export const k_right = ['[Right]', '[→]'];
export const k_approx = ['(≈)', '(approx)'];
export const k_open = ['[(]'];
export const k_close = ['[)]'];
export const k_plus = ['[+]'];
export const k_dot = ['[.]'];
export const k_comma = ['(,)'];
export const k_divisionr = ['(÷R)', '(/R)'];
export const k_reciprocal = ['(x⁻¹)', '(x^-1)'];
export const k_comma_ = ['[,]'];
export const k_pi = ['(Pi)', '(π)'];
export const k_sin1 = ['(sin⁻¹)', '(sin^-1)'];
export const k_cos1 = ['(cos⁻¹)', '(cos^-1)'];
export const k_tan1 = ['(tan⁻¹)', '(tan^-1)'];
export const k_rec = ['((rec))', '((■))'];
export const k_rec_ = ['(rec^-)', '(■^-)'];
export const k_rec__ = ['(rec^.)', '(■^.)'];


export const commonKeys = {
  frac: ['[d/c]', '[■/□]'],
  eng: ['[ENG]'],
  eq: ['[=]'],
  log: ['(log)'],
  square: ['[x^2]', '[■²]', '[x²]'],
  log_: ['[log]'],
  logab: ['[log(a,b)]', '[logab]', '[log(■,□)]'],
  sin: ['[sin]'],
  cos: ['[cos]'],
  tan: ['[tan]'],
  minus: ['[-]'],
  sqrt: ['[Square Root]', '[√(■)]', '[sqrt]'],
  neg: ['[(-)]'],
  exe: ['[EXE]'],
  ac: ['[AC]'],
  up: ['[Up]', '[↑]'],
  nsqrt: ['(nth Root)', '(n sqrt a)', '(■√(□))'],
  ans: ['[Ans]'],
  multi: ['[*]', '[×]'],
  division: ['[/]', '[÷]'],
  down: ['[Down]', '[↓]'],
  i: ['(i)'],
  ddx: ['(d/dx)'],
  arg: ['(∠)', '(arg)'],
  left: ['[Left]', '[←]'],
  right: ['[Right]', '[→]'],
  approx: ['(≈)', '(approx)'],
  open: ['[(]'],
  close: ['[)]'],
  plus: ['[+]'],
  dot: ['[.]'],
  comma: ['(,)'],
  divisionr: ['(÷R)', '(/R)'],
  reciprocal: ['(x⁻¹)', '(x^-1)'],
  comma_: ['[,]'],
  pi: ['(Pi)', '(π)'],
  sin1: ['(sin⁻¹)', '(sin^-1)'],
  cos1: ['(cos⁻¹)', '(cos^-1)'],
  tan1: ['(tan⁻¹)', '(tan^-1)'],
  rec: ['((rec))', '((■))'],
  rec_: ['(rec^-)', '(■^-)'],
  rec__: ['(rec^.)', '(■^.)'],
};