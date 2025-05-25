import { cw01 } from "./cw01.js";
import { cw02 } from "./cw02.js";
import { cwex } from "./cwex.js";
import { es03 } from "./es03.js";
import { es04 } from "./es04.js";
import { cwde } from "./cwde.js";
import { cwce } from "./cwce.js";
import { cwrs } from "./cwrs.js";
import { cwfr } from "./cwfr.js";
import { keyTextMappingConvert } from "./_common.js";

export const series_cw = 'cw';
export const series_ex = 'ex';
export const series_es = 'es';

export const series = [series_cw, series_ex, series_es];

const config = [
  {
    font: 'cw01',
    family: 'CASIO ClassWiz CW01',
    mapping: cw01,
    series: series_cw,
  },
  {
    font: 'cw02',
    family: 'CASIO ClassWiz CW02',
    mapping: cw02,
    series: series_cw,
  },
  {
    font: 'cwex',
    family: 'CASIO ClassWiz',
    mapping: cwex,
    series: series_ex,
  },
  {
    font: 'cwde',
    family: 'CASIO ClassWiz DE',
    mapping: cwde,
    series: series_ex,
  },
  {
    font: 'cwfr',
    family: 'CASIO ClassWiz Fr',
    mapping: cwfr,
    series: series_ex,
  },
  {
    font: 'cwce',
    family: 'CASIO ClassWiz CE',
    mapping: cwce,
    series: series_ex,
  },
  {
    font: 'cwrs',
    family: 'CASIO ClassWiz RS',
    mapping: cwrs,
    series: series_ex,
  },
  {
    font: 'es03',
    family: 'ES03',
    mapping: es03,
    series: series_es,
  },
  {
    font: 'es04',
    family: 'ES04',
    mapping: es04,
    series: series_es,
  },
].map(i => ({
  ...i,
  reverseMapping: keyTextMappingConvert(i.font, i.mapping),
}));

export { config };
