# Calculator Key Font Helper

A JavaScript library for converting calculator key notation into styled calculator font display, with accessibility support.

Demo: [kfh.pages.dev](https://kfh.pages.dev)

GitHub: [CalcWorld/KeyFontHelper](https://github.com/CalcWorld/KeyFontHelper)

## What it does

Calculator Key Font Helper transforms calculator notation like `[sin]30` into properly styled
text (<img src="https://github.com/user-attachments/assets/8339dbb6-950a-4d49-b834-0ba08045c7fc" style="height: 1rem">)
that matches the appearance of actual calculator keys.

## Supported Fonts

- **ClassWiz CW Series**: ClasWiz CW01, CW02, CW03, CW04
- **ClassWiz EX Series**: ClassWiz, DE, Fr, CE, RS
- **fx-ES (PLUS) Series**: ES03, ES04
- **fx-MS Series**: MS01

## Installation

```bash
npm install calc-key
```

The package includes the conversion library and mappings. Font files are not included;
load the corresponding calculator fonts separately to display the generated HTML correctly.

## Quick Start

```javascript
import { text2KeyFont, text2KeyFontBySeries } from 'calc-key';

// Convert text for a specific calculator font
const result1 = text2KeyFont('cw01', '[sin]30[)][+][cos]60');
// <span style="font-family:'CASIO ClassWiz CW01'">j</span>30<span style="font-family:'CASIO ClassWiz CW01'">)</span><span style="font-family:'CASIO ClassWiz CW01'">+</span><span style="font-family:'CASIO ClassWiz CW01'">k</span>60

// Convert text for all fonts in a series
const result2 = text2KeyFontBySeries('cw', '[tg]30[)][+][cos]60');
// <span style="font-family:'CASIO ClassWiz CW02'">:</span>30<span style="font-family:'CASIO ClassWiz CW01'">)</span><span style="font-family:'CASIO ClassWiz CW01'">+</span><span style="font-family:'CASIO ClassWiz CW01'">k</span>60

// [Option] Enable title and aria-label attribute
const result3 = text2KeyFontBySeries('cw', '5[d/c]6', { title: true, ariaLabel: true });
// 5<span style="font-family:'CASIO ClassWiz CW01'" title="&#x005B;&#x0064;&#x002F;&#x0063;&#x005D;" aria-label="&#x005B;&#x0064;&#x002F;&#x0063;&#x005D;">a</span>6
```

### CommonJS

```javascript
const { text2KeyFont, text2KeyFontBySeries, config, series } = require('calc-key');
```

### Browser script

```html
<script src="https://cdn.jsdelivr.net/npm/calc-key/dist/kfh.js"></script>
<script>
  const html = kfh.text2KeyFont('cw01', '[sin]30');
</script>
```

ES modules, CommonJS and browser scripts expose `text2KeyFont`, `text2KeyFontBySeries`,
`tokenize`, `tokenizeBySeries`, `config`, and `series`.

### Structured output

Use `tokenize(font, text)` for a specific font or `tokenizeBySeries(series, text)`
for a series. They use the same matching rules as the HTML functions and return
plain data, with no HTML escaping or markup parsing:

```javascript
import { tokenizeBySeries } from 'calc-key';

tokenizeBySeries('cw', '[sin]30');
// [
//   { type: 'key', font: 'cw01', family: 'CASIO ClassWiz CW01', glyph: 'j', label: '[sin]' },
//   { type: 'text', value: '30' }
// ]
```

Text tokens preserve unmatched content exactly. Key tokens contain the selected
font, its family, the display glyph and the original alias as `label`.
Empty input returns `[]`; unknown font and series names throw, as in the HTML API.

### TypeScript and React

TypeScript declarations are generated from JavaScript and JSDoc, including `Font`,
`Series`, `Options`, `FontConfig`, and the `Token`, `TextToken`, `KeyToken` union types.
In React, render tokens as ordinary text and elements:

```tsx
import { tokenizeBySeries } from 'calc-key';

function CalculatorKeys({ text }: { text: string }) {
  return (
    <span>
      {tokenizeBySeries('cw', text).map((token, index) =>
        token.type === 'text' ? token.value : (
          <span key={index} style={{ fontFamily: token.family }} title={token.label}>
            {token.glyph}
          </span>
        )
      )}
    </span>
  );
}
```

React escapes the token values normally, so input such as `<img>` remains literal
text.

The existing `text2KeyFont` and `text2KeyFontBySeries` functions still return HTML
strings and preserve unmatched HTML. They do not sanitize input; sanitize untrusted
HTML before inserting their result into the page.

Series conversion scans the input once. At each position, longer aliases take priority;
if multiple fonts define the same alias, the first font in `config` is used.

## API Call

### Get Key Config
All key font config
```
GET /api/config
```

Specific font config
```
GET /api/config?type=font&font=cw01
```

Specific series key font config
```
GET /api/config?type=series&series=cw
```

### Convert Key Text
Convert text for a specific calculator font
```
GET /api/html?type=font&font=cw01&text=[sin]30[)][%2B][cos]60
```

Convert text for all fonts in a series
```
GET /api/html?type=series&series=cw&text=[tg]30[)][%2B][cos]60
```

**Note:** 
- Replace the `font` and `series` parameters above according to your actual needs.
- To include optional accessibility attributes, add `&title=1`, `&ariaLabel=1`, or both to the Convert Key Text API URL.

## How it works

The library maps characters to calculator key representations using font-specific configurations. Each calculator font has its own key mapping that defines how text should be styled.

## LICENSE
[GPL-3.0-or-later](LICENSE)
