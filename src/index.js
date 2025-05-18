import { config } from "./config/index.js";

export function keyTextMappingConvert(keyMapping) {
  const keyTextBased = {};
  for (let k in keyMapping) {
    for (const keyText of keyMapping[k]) {
      if (!keyTextBased.hasOwnProperty(keyText)) {
        keyTextBased[keyText] = k;
      } else {
        throw new Error(`Duplicate KeyText: ${keyText} at key ${k}`);
      }
    }
  }
  return keyTextBased;
}

export function text2KeyFont(keyName, text) {
  const keyConfig = config.find(i => i.keyName === keyName);
  if (!keyConfig) {
    throw new Error(`Unknown keyName: ${keyName}`);
  }
  const fontName = keyConfig.fontName;
  const keyTextMapping = keyTextMappingConvert(keyConfig.keyMapping);
  for (const keyText in keyTextMapping) {
    text = text.replaceAll(keyText, `<span style="font-family: '${fontName}';">${keyTextMapping[keyText]}</span>`);
  }
  return text;
}
