import library = require('calc-key');

const font: library.Font = 'cw03';
const group: library.Series = 'cw';
const options: library.Options = { title: true, ariaLabel: true };
const fontConfig: library.FontConfig = library.config[0];
const html: string = library.text2KeyFont(font, '(f(x))', options);
const glyph: string = fontConfig.reverseMapping['[sin]'];
library.text2KeyFontBySeries(group, html);

// @ts-expect-error CommonJS consumers get the same font-name validation.
library.text2KeyFont('unknown', '');
// @ts-expect-error CommonJS consumers get typed options.
library.text2KeyFontBySeries(group, '', { ariaLabel: 'yes' });
// @ts-expect-error React child arrays are not string input.
library.text2KeyFontBySeries(group, ['[sin]']);
