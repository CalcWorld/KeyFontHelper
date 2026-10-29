import { config, series, text2KeyFont, text2KeyFontBySeries, tokenize, tokenizeBySeries, type Font, type Series, type Options, type FontConfig, type Token, type KeyToken, type TextToken } from 'calc-key';

const font: Font = 'cw03';
const group: Series = 'cw';
const options: Options = { title: true, ariaLabel: true };
const html: string = text2KeyFont(font, '(f(x))', options);
const fontConfig: FontConfig = config[0];
const glyph: string = fontConfig.reverseMapping['[sin]'];
const aliases: string[] = fontConfig.mapping['j'];
for (const group of series) text2KeyFontBySeries(group, '[sin]');
for (const font of config) text2KeyFont(font.font, '[sin]');
text2KeyFontBySeries(group, html);
const tokens: Token[] = tokenize(font, '(f(x))');
for (const token of tokenizeBySeries(group, '[sin]30')) {
  if (token.type === 'key') {
    const key: KeyToken = token;
    const glyph: string = key.glyph;
    const sourceFont: Font = key.font;
    // @ts-expect-error A key token does not have a text value.
    token.value;
  } else {
    const text: TextToken = token;
    const value: string = text.value;
    // @ts-expect-error A text token does not have a glyph.
    token.glyph;
  }
}

// @ts-expect-error Font names come from the built-in configuration.
text2KeyFont('unknown', '');
// @ts-expect-error Series names come from the built-in configuration.
text2KeyFontBySeries('unknown', '');
// @ts-expect-error React child arrays are not string input.
text2KeyFontBySeries('cw', ['[sin]']);
// @ts-expect-error Options must retain their declared property types.
text2KeyFont(font, '', { title: 'yes' });
// @ts-expect-error Mapping values are strings, not any.
const invalidGlyph: number = fontConfig.reverseMapping['[sin]'];
// @ts-expect-error Unknown option names should be rejected.
text2KeyFont(font, '', { debug: true });
// @ts-expect-error Tokenizers use the same font names as the HTML API.
tokenize('unknown', '');
// @ts-expect-error Tokenizers accept text strings.
tokenizeBySeries(group, ['[sin]']);
