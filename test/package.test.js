import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import * as esm from 'calc-key';
import * as source from '../src/index.js';

const require = createRequire(import.meta.url);
const browser = {};
runInNewContext(readFileSync(new URL('../dist/kfh.js', import.meta.url), 'utf8'), browser);

for (const [name, library] of [['ESM', esm], ['CommonJS', require('calc-key')], ['browser', browser.kfh]]) {
  test(`${name} package exposes the public API and matches source conversion`, () => {
    assert.deepEqual(Object.keys(library).sort(), Object.keys(source).sort());
    for (const font of source.config) {
      for (const alias of Object.keys(font.reverseMapping)) {
        assert.equal(library.text2KeyFont(font.font, alias), source.text2KeyFont(font.font, alias));
        assert.equal(library.text2KeyFontBySeries(font.series, alias), source.text2KeyFontBySeries(font.series, alias));
        // The browser bundle runs in another realm; compare serialized token values.
        assert.equal(JSON.stringify(library.tokenize(font.font, alias)), JSON.stringify(source.tokenize(font.font, alias)));
        assert.equal(JSON.stringify(library.tokenizeBySeries(font.series, alias)), JSON.stringify(source.tokenizeBySeries(font.series, alias)));
      }
    }
    assert.equal(
      library.text2KeyFontBySeries('cw', '(f(x))[sin][tg]', { title: true, ariaLabel: true }),
      source.text2KeyFontBySeries('cw', '(f(x))[sin][tg]', { title: true, ariaLabel: true }),
    );
  });
}
