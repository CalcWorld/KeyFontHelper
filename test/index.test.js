import assert from 'node:assert/strict';
import { test } from 'node:test';
import { config, series, text2KeyFont, text2KeyFontBySeries } from '../src/index.js';

const span = (family, content) => `<span style="font-family:'${family}'">${content}</span>`;

test('every font alias produces its configured glyph', () => {
  for (const font of config) {
    for (const [glyph, aliases] of Object.entries(font.mapping)) {
      for (const alias of aliases) {
        assert.equal(text2KeyFont(font.font, alias), span(font.family, glyph), `${font.font}: ${alias}`);
      }
    }
  }
});

test('every series alias uses the first font that defines it', () => {
  for (const seriesKey of series) {
    const fonts = config.filter(font => font.series === seriesKey);
    const aliases = new Set(fonts.flatMap(font => Object.keys(font.reverseMapping)));
    for (const alias of aliases) {
      const font = fonts.find(font => Object.hasOwn(font.reverseMapping, alias));
      assert.equal(text2KeyFontBySeries(seriesKey, alias), span(font.family, font.reverseMapping[alias]), `${seriesKey}: ${alias}`);
    }
  }
});

test('series conversion preserves the complete (f(x)) key', () => {
  assert.equal(text2KeyFontBySeries('cw', '(f(x))'), span('CASIO ClassWiz CW03', 'r'));
});

test('series conversion mixes fonts and preserves shared-key priority', () => {
  assert.equal(
    text2KeyFontBySeries('cw', '[sin]30[+][tg]'),
    `${span('CASIO ClassWiz CW01', 'j')}30${span('CASIO ClassWiz CW01', '+')}${span('CASIO ClassWiz CW02', ':')}`,
  );
});

test('empty, unknown and surrounding HTML content are preserved', () => {
  for (const text of ['', '30[unknown]', '<b>30</b>', '&lt;30&gt;']) {
    assert.equal(text2KeyFont('cw01', text), text);
    assert.equal(text2KeyFontBySeries('cw', text), text);
  }
  assert.equal(text2KeyFontBySeries('ex', '[S<=>D]'), span('CASIO ClassWiz', 'n'));
});

test('title and aria-label can be enabled independently or together', () => {
  const encoded = '&#x005B;&#x0073;&#x0069;&#x006E;&#x005D;';
  for (const convert of [text => text2KeyFont('cw01', text, { title: true }), text => text2KeyFontBySeries('cw', text, { title: true })]) {
    assert.equal(convert('[sin]'), `<span style="font-family:'CASIO ClassWiz CW01'" title="${encoded}">j</span>`);
  }
  assert.equal(text2KeyFontBySeries('cw', '[sin]', { ariaLabel: true }), `<span style="font-family:'CASIO ClassWiz CW01'" aria-label="${encoded}">j</span>`);
  assert.equal(text2KeyFontBySeries('cw', '[sin]', { title: true, ariaLabel: true }), `<span style="font-family:'CASIO ClassWiz CW01'" title="${encoded}" aria-label="${encoded}">j</span>`);
});

test('cached matchers can be reused across calls', () => {
  for (let i = 0; i < 3; i++) {
    assert.equal(text2KeyFont('cw01', '[sin][sin]'), span('CASIO ClassWiz CW01', 'j').repeat(2));
    assert.equal(text2KeyFontBySeries('cw', '(f(x))'), span('CASIO ClassWiz CW03', 'r'));
  }
});

test('unknown fonts and series keep their existing errors', () => {
  assert.throws(() => text2KeyFont('unknown', '[sin]'), /Unknown font: unknown/);
  assert.throws(() => text2KeyFontBySeries('unknown', '[sin]'), /Unknown series: unknown/);
});
