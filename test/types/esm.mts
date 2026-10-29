import { config, series, text2KeyFont, text2KeyFontBySeries, type Font, type Series, type Options, type FontConfig } from 'calc-key';

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
