import { config, series } from "./config/index.js";

export function text2KeyFont(font, text) {
  const keyConfig = config.find(i => i.font === font);
  if (!keyConfig) {
    throw new Error(`Unknown font: ${font}`);
  }
  const family = keyConfig.family;
  const keyTextMapping = keyConfig.reverseMapping;
  for (const keyText in keyTextMapping) {
    text = text.replaceAll(keyText, `<span style="font-family:'${family}'">${keyTextMapping[keyText]}</span>`);
  }
  return text;
}

export function text2KeyFontBySeries(seriesKey, text) {
  if (!series.includes(seriesKey)) {
    throw new Error(`Unknown series: ${seriesKey}`);
  }

  for (const keyConfig of config) {
    if (keyConfig.series !== seriesKey) continue;

    const family = keyConfig.family;
    const keyTextMapping = keyConfig.reverseMapping;
    for (const keyText in keyTextMapping) {
      text = text.replaceAll(keyText, `<span style="font-family:'${family}'">${keyTextMapping[keyText]}</span>`);
    }
  }
  return text;
}

export { config, series } from "./config/index.js";
