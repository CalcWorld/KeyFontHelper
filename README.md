# Calculator Key Font Helper

A JavaScript library for converting calculator key notation into styled calculator font display, with accessibility support.

Demo: [kfh.pages.dev](https://kfh.pages.dev)

GitHub: [CalcWorld/KeyFontHelper](https://github.com/CalcWorld/KeyFontHelper)

## Installation

```bash
npm install calc-key
```

The package includes the conversion library and mappings. Font files are not included;
load the corresponding calculator fonts separately to display the generated HTML correctly.

## What it does

Calculator Key Font Helper transforms calculator notation like `[sin]30` into properly styled
text (<img src="https://github.com/user-attachments/assets/8339dbb6-950a-4d49-b834-0ba08045c7fc" style="height: 1rem">)
that matches the appearance of actual calculator keys.

## Supported Fonts

- **ClassWiz CW Series**: ClasWiz CW01, CW02, CW03, CW04
- **ClassWiz EX Series**: ClassWiz, DE, Fr, CE, RS
- **fx-ES (PLUS) Series**: ES03, ES04
- **fx-MS Series**: MS01

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
<script src="https://cdn.jsdelivr.net/npm/calc-key@1.0.0/dist/kfh.js"></script>
<script>
  const html = kfh.text2KeyFont('cw01', '[sin]30');
</script>
```

ES modules and CommonJS expose `text2KeyFont`, `text2KeyFontBySeries`, `config`, and `series`.

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

## Development

```bash
npm ci
npm run serve  # Start development server without API on localhost:8091
npm run dev  # Start development server with API on localhost:8791
npm run build  # Build the demo and all library formats
npm run build:lib  # Build only the library formats
npm pack --dry-run  # Build and inspect the npm package contents
```

Library builds produce `dist/kfh.js` (UMD, browser global `kfh`), `dist/kfh.mjs`
(ES module), and `dist/kfh.cjs` (CommonJS). `prepack` builds them automatically
before packing or publishing. Library source files are included in the package.

## How it works

The library maps characters to calculator key representations using font-specific configurations. Each calculator font has its own key mapping that defines how text should be styled.

## Notes

A demo interface is included in `src/index.html` for trying the conversion functionality
and displaying the mapping. Pushes to `master` synchronize mappings to MediaWiki.

## npm publishing

The first release is published locally with an authenticated npm account:

```bash
npm login --registry=https://registry.npmjs.org/
npm publish
```

For subsequent releases, configure the package's Trusted Publisher on npmjs.com
for GitHub Actions with owner `CalcWorld`, repository `KeyFontHelper`, workflow
filename `publish.yml`, no environment, and direct `npm publish` permission.
Then push a new version tag, for example:

```bash
git tag v1.0.1
git push origin v1.0.1
```

The workflow derives the npm version from the tag and publishes using OIDC without
an npm token. Each release must use a version that has not already been published.

## LICENSE
[GPL-3.0-or-later](LICENSE)
