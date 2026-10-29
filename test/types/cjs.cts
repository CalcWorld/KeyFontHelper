import library = require('calc-key');

const font: library.Font = 'cw03';
const group: library.Series = 'cw';
const options: library.Options = { title: true, ariaLabel: true };
const fontConfig: library.FontConfig = library.config[0];
const html: string = library.text2KeyFont(font, '(f(x))', options);
const glyph: string = fontConfig.reverseMapping['[sin]'];
library.text2KeyFontBySeries(group, html);
const tokens: library.Token[] = library.tokenize(font, '(f(x))');
for (const token of library.tokenizeBySeries(group, '[sin]30')) {
  if (token.type === 'key') {
    const key: library.KeyToken = token;
    const glyph: string = key.glyph;
  } else {
    const text: library.TextToken = token;
    const value: string = text.value;
  }
}

// @ts-expect-error CommonJS consumers get the same font-name validation.
library.text2KeyFont('unknown', '');
// @ts-expect-error CommonJS consumers get typed options.
library.text2KeyFontBySeries(group, '', { ariaLabel: 'yes' });
// @ts-expect-error React child arrays are not string input.
library.text2KeyFontBySeries(group, ['[sin]']);
// @ts-expect-error CommonJS tokenizers validate font names.
library.tokenize('unknown', '');
// @ts-expect-error The token union must narrow before accessing key properties.
tokens[0].glyph;
