# Calculator Key Font Helper

A JavaScript library for converting calculator key notation into styled calculator font display, with accessibility support.

Demo: [kfh.pages.dev](https://kfh.pages.dev)

GitHub: [CalcWorld/KeyFontHelper](https://github.com/CalcWorld/KeyFontHelper)

## What it does

Calculator Key Font Helper transforms calculator notation like `[sin]30` into properly styled
text (<img src="https://github.com/user-attachments/assets/8339dbb6-950a-4d49-b834-0ba08045c7fc" style="height: 1rem">)
that matches the appearance of actual calculator keys.

## Supported Fonts

- **ClassWiz CW Series**: ClasWiz CW01, CW02
- **ClassWiz EX Series**: ClassWiz, DE, Fr, CE, RS
- **fx-ES(PLUS) Series**: ES03, ES04

## Quick Start

```javascript
// Convert text for a specific calculator font
const result1 = text2KeyFont('cw01', '[sin]30[)][+][cos]60');
// <span style="font-family:'CASIO ClassWiz CW01'">j</span>30<span style="font-family:'CASIO ClassWiz CW01'">)</span><span style="font-family:'CASIO ClassWiz CW01'">+</span><span style="font-family:'CASIO ClassWiz CW01'">k</span>60

// Convert text for all fonts in a series
const result2 = text2KeyFontBySeries('cw', '[tg]30[)][+][cos]60');
// <span style="font-family:'CASIO ClassWiz CW02'">:</span>30<span style="font-family:'CASIO ClassWiz CW01'">)</span><span style="font-family:'CASIO ClassWiz CW01'">+</span><span style="font-family:'CASIO ClassWiz CW01'">k</span>60

// [Option] Enable title and aria-label attribute
const result2 = text2KeyFontBySeries('cw', '5[d/c]6', { title: true, ariaLabel: true });
// 5<span style="font-family:'CASIO ClassWiz CW01'" title="&#x005B;&#x0064;&#x002F;&#x0063;&#x005D;" aria-label="&#x005B;&#x0064;&#x002F;&#x0063;&#x005D;">a</span>6
```

## Installation

```bash
npm install
npm run build
```

The built library will be available in the `dist/` directory as `kfh.js`.

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
npm run serve  # Start development server without API on localhost:8091
npm run dev  # Start development server with API on localhost:8791
npm run build  # Build for production
```

## How it works

The library maps characters to calculator key representations using font-specific configurations. Each calculator font has its own key mapping that defines how text should be styled.

## Notes

The library includes automated CI/CD through GitHub Actions that builds and publishes to the `dist` branch on every push to master. A demo interface is included in `src/index.html` for testing the conversion functionality and displaying the mapping.

## LICENSE
[GPL-3.0-or-later](LICENSE)
