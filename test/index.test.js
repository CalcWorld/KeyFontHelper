import assert from 'node:assert/strict';
import { test } from 'node:test';
import { config, series, text2KeyFont, text2KeyFontBySeries, tokenize, tokenizeBySeries } from '../src/index.js';

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
  assert.throws(() => tokenize('unknown', '[sin]'), /Unknown font: unknown/);
  assert.throws(() => tokenizeBySeries('unknown', '[sin]'), /Unknown series: unknown/);
});

test('tokenize returns plain text and complete key metadata in order', () => {
  assert.deepEqual(tokenize('cw01', 'before [sin]30[+] after'), [
    { type: 'text', value: 'before ' },
    { type: 'key', font: 'cw01', family: 'CASIO ClassWiz CW01', glyph: 'j', label: '[sin]' },
    { type: 'text', value: '30' },
    { type: 'key', font: 'cw01', family: 'CASIO ClassWiz CW01', glyph: '+', label: '[+]' },
    { type: 'text', value: ' after' },
  ]);
});

test('every font and series alias has the correct token metadata', () => {
  for (const font of config) {
    for (const [glyph, aliases] of Object.entries(font.mapping)) {
      for (const alias of aliases) {
        assert.deepEqual(tokenize(font.font, alias), [
          { type: 'key', font: font.font, family: font.family, glyph, label: alias },
        ], `${font.font}: ${alias}`);
        const first = config.find(candidate => candidate.series === font.series && Object.hasOwn(candidate.reverseMapping, alias));
        assert.deepEqual(tokenizeBySeries(font.series, alias), [
          { type: 'key', font: first.font, family: first.family, glyph: first.reverseMapping[alias], label: alias },
        ], `${font.series}: ${alias}`);
      }
    }
  }
});

test('tokenizeBySeries preserves full aliases and mixes fonts', () => {
  assert.deepEqual(tokenizeBySeries('cw', '(f(x))[sin][tg]'), [
    { type: 'key', font: 'cw03', family: 'CASIO ClassWiz CW03', glyph: 'r', label: '(f(x))' },
    { type: 'key', font: 'cw01', family: 'CASIO ClassWiz CW01', glyph: 'j', label: '[sin]' },
    { type: 'key', font: 'cw02', family: 'CASIO ClassWiz CW02', glyph: ':', label: '[tg]' },
  ]);
});

test('token text and glyphs remain literal rather than HTML-encoded', () => {
  assert.deepEqual(tokenize('cw01', '<img src=x> & [unknown]'), [
    { type: 'text', value: '<img src=x> & [unknown]' },
  ]);
  assert.deepEqual(tokenize('cw01', '(sin^-1)'), [
    { type: 'key', font: 'cw01', family: 'CASIO ClassWiz CW01', glyph: '<', label: '(sin^-1)' },
  ]);
  assert.deepEqual(tokenizeBySeries('ex', '[S<=>D]'), [
    { type: 'key', font: 'cwex', family: 'CASIO ClassWiz', glyph: 'n', label: '[S<=>D]' },
  ]);
  assert.deepEqual(tokenize('cw01', ''), []);
  assert.deepEqual(tokenizeBySeries('cw', ''), []);
});

test('token and HTML calls can be interleaved without sharing mutable results', () => {
  const tokens = tokenizeBySeries('cw', '[sin]');
  tokens[0].glyph = 'changed';
  assert.deepEqual(tokenizeBySeries('cw', '[sin]'), [
    { type: 'key', font: 'cw01', family: 'CASIO ClassWiz CW01', glyph: 'j', label: '[sin]' },
  ]);
  assert.equal(text2KeyFontBySeries('cw', '[sin]'), span('CASIO ClassWiz CW01', 'j'));
  assert.deepEqual(tokenizeBySeries('cw', '30'), [{ type: 'text', value: '30' }]);
});
