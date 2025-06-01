import { config, series } from "./config/index.js";

/**
 * 生成带字体样式的 span 标签
 * @param {string} family 字体族
 * @param {string} content 要包裹的内容
 * @returns {string} HTML 字符串
 */
function renderKeySpan(family, content) {
  return `<span style="font-family:'${family}'">${content}</span>`;
}

/**
 * 将指定映射应用到文本中
 * @param {string} text 原始文本
 * @param {Object} mapping 替换映射表
 * @param {string} family 字体族
 * @returns {string} 替换后的文本
 */
function applyFontMapping(text, mapping, family) {
  const keys = Object.keys(mapping);
  if (keys.length === 0) return text;

  const pattern = new RegExp(keys.map(escapeRegExp).join('|'), 'g');

  return text.replace(pattern, matched => {
    return renderKeySpan(family, mapping[matched]);
  });
}

/**
 * 将字符串中的正则特殊字符进行转义，使其可安全用于 RegExp 构造中。
 * @param {string} str 要转义的字符串
 * @returns {string} 转义后的字符串，可安全插入到正则表达式中
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 根据指定字体替换文本
 * @param {string} font 字体名称
 * @param {string} text 原始文本
 * @returns {string} 替换后的文本
 */
export function text2KeyFont(font, text) {
  const keyConfig = config.find(i => i.font === font);
  if (!keyConfig) {
    throw new Error(`Unknown font: ${font}`);
  }
  return applyFontMapping(text, keyConfig.reverseMapping, keyConfig.family);
}

/**
 * 根据系列名称对匹配字体进行替换
 * @param {string} seriesKey 系列名称
 * @param {string} text 原始文本
 * @returns {string} 替换后的文本
 */
export function text2KeyFontBySeries(seriesKey, text) {
  if (!series.includes(seriesKey)) {
    throw new Error(`Unknown series: ${seriesKey}`);
  }

  for (const keyConfig of config) {
    if (keyConfig.series === seriesKey) {
      text = applyFontMapping(text, keyConfig.reverseMapping, keyConfig.family);
    }
  }
  return text;
}

export { config, series } from "./config/index.js";
