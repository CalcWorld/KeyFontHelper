export function numKey(mapping) {
  for (let i = 0; i < 10; i++) {
    mapping[`${i}`] = [`[${i}]`];
  }
  return mapping;
}

export function copy(mapping) {
  return JSON.parse(JSON.stringify(mapping))
}

export function update(mapping, updateObject) {
  Object.assign(mapping, updateObject)
}

/**
 * @param {*} mapping
 * @param {string[]} delKey
 */
export function del(mapping, delKey) {
  delKey.forEach(e => delete mapping[e]);
}

export function keyTextMappingConvert(font, mapping) {
  const keyTextBased = {};
  for (let k in mapping) {
    for (const keyText of mapping[k]) {
      if (keyTextBased.hasOwnProperty(keyText)) {
        throw new Error(`Duplicate KeyText: ${keyText} at key ${k} of ${font}`);
      }
      keyTextBased[keyText] = k;
    }
  }
  return keyTextBased;
}

export const k_frac = ['[d/c]', '[■/□]'];
export const k_eng = ['[ENG]'];
export const k_eq = ['[=]'];
export const k_log = ['(log)'];
export const k_square = ['[x^2]', '[x²]', '[■²]'];
export const k_log_ = ['[log]'];
export const k_logab = ['[log(a,b)]', '[logab]', '[log(■,□)]'];
export const k_sin = ['[sin]'];
export const k_cos = ['[cos]'];
export const k_tan = ['[tan]'];
export const k_minus = ['[-]'];
export const k_sqrt = ['[Square Root]', '[sqrt]', '[√(■)]'];
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
export const k_divisionr = ['[÷R]', '[/R]'];
export const k_reciprocal = ['(x⁻¹)', '(x^-1)', '(■⁻¹)'];
export const k_reciprocal_ = ['[x⁻¹]', '[x^-1]'];
export const k_comma_ = ['[,]'];
export const k_pi = ['(Pi)', '(π)'];
export const k_pi_ = ['[Pi]', '[π]'];
export const k_sin1 = ['(sin⁻¹)', '(sin^-1)'];
export const k_cos1 = ['(cos⁻¹)', '(cos^-1)'];
export const k_tan1 = ['(tan⁻¹)', '(tan^-1)'];
export const k_rec = ['((rec))', '((■))'];
export const k_rec_ = ['(rec^-)', '(■^-)'];
export const k_rec__ = ['(rec^.)', '(■^.)'];
export const k_abs = ['[Abs]'];
export const k_ln = ['[ln]'];
export const k_mplus = ['[M+]'];
export const k_sd = ['[S<>D]', '[S⇔D]', '[SD]', '[S<=>D]'];
export const k_del = ['[DEL]'];
export const k_shift = ['[SHIFT]'];
export const k_calc = ['[CALC]'];
export const k_dms = ['[\'\'"]', '[DMS]', '[°\'"]'];
export const k_integral = ['[Integral]', '[∫]'];
export const _adc = ['ad/c', 'a d/c', '■(□/□)'];
export const k_adc = _adc.map(i => `(${i})`);
export const k_adc_ = _adc.map(i => `[${i}]`);
export const k_cube = ['[x^3]', '[x³]'];
export const k_10n = ['(10^x)', '(10^■)'];
export const k_en = ['(e^x)', '(e^■)'];
export const k_sigma = ['(Σ)', '(Sigma)'];
export const k_sci = ['[*10^x]', '[×10^x]'];
const _abc2dc = ['a(b/c)⇔d/c', 'a(b/c)<>d/c', 'a(b/c)<=>d/c', 'a b/c⇔d/c', 'a b/c<>d/c', 'a b/c<=>d/c'];
export const k_abc2dc = _abc2dc.map(i => `(${i})`);
export const k_abc2dc_ = _abc2dc.map(i => `[${i}]`);
export const k_alpha = ['[ALPHA]'];
export const k_3sqrt = ['(3rd Root)', '(3 sqrt a)', '(³√(■))'];
export const k_on = ['[ON]'];
export const k_left_ = ['(Left)', '(←)'];
export const k_xf = ['[x!]'];
export const k_power = ['[^]', '[■^□]', '[x^■]'];
export const k_simp = ['[Simp]'];
export const k_product = ['(Π)', '(Product)'];
export const k_per = ['(%)'];
export const k_per_ = ['[%]'];
export const k_tg = ['[tg]'];
export const k_tg1 = ['(tg⁻¹)', '(tg^-1)'];
export const k_7_ = ['[7-]'];
export const k_suppr = ['[SUPPR]'];
export const k_seconde = ['[SECONDE]'];
export const k_a10x = ['(a*10^x)', '(a×10^x)'];
export const k_rep = ['[Rép]', '[Rep]'];
export const k_fr_divisionr = ['[|-]', '[├]'];
export const k_arcsin = ['(Arcsin)'];
export const k_arccos = ['(Arccos)'];
export const k_arctan = ['(Arctan)'];
export const k_arctg = ['(Arctg)'];
export const k_sen = ['[sen]'];
