# Calculator Key Font Helper

A JavaScript library that converts calculator key notation into specific calculator font display.

Demo: [kfh.pages.dev](https://kfh.pages.dev)

GitHub: [CalcWorld/KeyFontHelper](https://github.com/CalcWorld/KeyFontHelper)

## What it does

Calculator Key Font Helper transforms calculator notation like `[sin]30` into properly styled text (<img src="https://github.com/user-attachments/assets/8339dbb6-950a-4d49-b834-0ba08045c7fc" style="height: 1rem">) that matches the appearance of actual calculator keys.

## Supported Fonts

- **ClassWiz CW Series**: ClasWiz CW01, CW02
- **ClassWiz EX Series**: ClassWiz, DE, Fr, CE, RS
- **fx-ES(PLUS) Series**: ES03, ES04

## Quick Start

```javascript
// Convert text for a specific calculator font
const result1 = text2KeyFont('cw01', '[sin]30[)][+][cos]60');

// Convert text for all models in a series
const result2 = text2KeyFontBySeries('cw', '[sin]30[)][+][cos]60');
```

## Installation

```bash
npm install
npm run build
```

The built library will be available in the `dist/` directory as `kfh.js`.

## Development

```bash
npm run serve  # Start development server on localhost:8091
npm run build  # Build for production
```

## How it works

The library maps characters to calculator key representations using font-specific configurations. Each calculator font has its own key mapping that defines how text should be styled.

## Notes

The library includes automated CI/CD through GitHub Actions that builds and publishes to the `dist` branch on every push to master. A demo interface is included in `src/index.html` for testing the conversion functionality and displaying the mapping.
