import { config, series } from "./config/index.js";

export const keyTextMappingCache = {};

export function keyTextMappingConvert(keyName, keyMapping) {
  if (keyTextMappingCache[keyName]) {
    return keyTextMappingCache[keyName];
  }
  const keyTextBased = {};
  for (let k in keyMapping) {
    for (const keyText of keyMapping[k]) {
      if (keyTextBased.hasOwnProperty(keyText)) {
        throw new Error(`Duplicate KeyText: ${keyText} at key ${k} of ${keyName}`);
      }
      keyTextBased[keyText] = k;
    }
  }
  keyTextMappingCache[keyName] = keyTextBased;
  return keyTextBased;
}

export function text2KeyFont(keyName, text) {
  const keyConfig = config.find(i => i.keyName === keyName);
  if (!keyConfig) {
    throw new Error(`Unknown keyName: ${keyName}`);
  }
  const fontName = keyConfig.fontName;
  const keyTextMapping = keyTextMappingConvert(keyConfig.keyName, keyConfig.keyMapping);
  for (const keyText in keyTextMapping) {
    text = text.replaceAll(keyText, `<span style="font-family:'${fontName}'">${keyTextMapping[keyText]}</span>`);
  }
  return text;
}

export function text2KeyFontBySeries(seriesKey, text) {
  if (!series.includes(seriesKey)) {
    throw new Error(`Unknown series: ${seriesKey}`);
  }

  for (const keyConfig of config) {
    if (keyConfig.series !== seriesKey) continue;

    const fontName = keyConfig.fontName;
    const keyTextMapping = keyTextMappingConvert(keyConfig.keyName, keyConfig.keyMapping);
    for (const keyText in keyTextMapping) {
      text = text.replaceAll(keyText, `<span style="font-family:'${fontName}'">${keyTextMapping[keyText]}</span>`);
    }
  }
  return text;
}

export { config, series } from "./config/index.js";
