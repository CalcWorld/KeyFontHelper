import { cw01 } from "./cw01.js";
import { cw02 } from "./cw02.js";
import { cwex } from "./cwex.js";
import { es03 } from "./es03.js";

export const series_cw = 'cw';
export const series_ex = 'ex';
export const series_es = 'es';

export const series = [series_cw, series_ex, series_es];

export const config = [
  {
    keyName: 'cw01',
    fontName: 'CASIO ClassWiz CW01',
    keyMapping: cw01,
    series: series_cw,
  },
  {
    keyName: 'cw02',
    fontName: 'CASIO ClassWiz CW02',
    keyMapping: cw02,
    series: series_cw,
  },
  {
    keyName: 'cwex',
    fontName: 'CASIO ClassWiz',
    keyMapping: cwex,
    series: series_ex,
  },
  {
    keyName: 'es03',
    fontName: 'ES03',
    keyMapping: es03,
    series: series_es,
  },
];
