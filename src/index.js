import { config, series } from "./config/index.js";

/**
 * 将字符串中的正则特殊字符进行转义，使其可安全用于 RegExp 构造中。
 * @param {string} str 要转义的字符串
 * @returns {string} 转义后的字符串，可安全插入到正则表达式中
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 将字符串编码为 HTML Unicode 实体格式：&#xXXXX;
 *
 * @param {string} str 输入字符串
 * @returns {string} 编码后的 HTML 实体串
 */
function toHtmlUnicodeEntities(str) {
  return Array.from(str)
    .map(char => {
      const code = char.codePointAt(0).toString(16).toUpperCase();
      return `&#x${code.padStart(4, '0')};`;
    })
    .join('');
}

/**
 * 生成带字体样式的 span 标签，可选包含 title 和 aria-label 属性
 *
 * @param {string} family 字体族
 * @param {string} content span 内部显示内容
 * @param {string} keyText 原始 key，用于辅助属性
 * @param {Object} [options] 可选设置项
 * @param {boolean} [options.title] 是否添加 title 属性
 * @param {boolean} [options.ariaLabel] 是否添加 aria-label 属性
 * @returns {string} 生成的 HTML 字符串
 */
function renderKeySpan(family, content, keyText, options = {}) {
  const attrs = [`style="font-family:'${family}'"`];

  if (options.title) {
    attrs.push(`title="${toHtmlUnicodeEntities(keyText)}"`);
  }
  if (options.ariaLabel) {
    attrs.push(`aria-label="${toHtmlUnicodeEntities(keyText)}"`);
  }

  return `<span ${attrs.join(' ')}>${content}</span>`;
}

/**
 * 应用映射，将 keyText 替换为包含样式和可选辅助属性的 HTML 标签
 *
 * @param {string} text 原始文本
 * @param {Object} mapping 映射表
 * @param {string} family 字体族
 * @param {Object} [options] 可选设置项
 * @returns {string} 替换后的文本
 */
function applyFontMapping(text, mapping, family, options = {}) {
  const keys = Object.keys(mapping);
  if (keys.length === 0) return text;

  const pattern = new RegExp(keys.map(escapeRegExp).join('|'), 'g');

  return text.replace(pattern, matched => {
    return renderKeySpan(family, mapping[matched], matched, options);
  });
}

/**
 * 将指定字体的 keyText 替换为对应样式的 HTML，支持添加 title/aria-label 属性
 *
 * @param {string} font 字体名称
 * @param {string} text 要处理的文本
 * @param {Object} [options] 可选设置项
 * @returns {string} 替换后的文本
 */
export function text2KeyFont(font, text, options = {}) {
  const keyConfig = config.find(i => i.font === font);
  if (!keyConfig) {
    throw new Error(`Unknown font: ${font}`);
  }
  return applyFontMapping(text, keyConfig.reverseMapping, keyConfig.family, options);
}

/**
 * 根据系列名称替换文本，应用系列下所有字体的映射，可选辅助属性
 *
 * @param {string} seriesKey 系列名称
 * @param {string} text 要处理的文本
 * @param {Object} [options] 可选设置项
 * @returns {string} 替换后的文本
 */
export function text2KeyFontBySeries(seriesKey, text, options = {}) {
  if (!series.includes(seriesKey)) {
    throw new Error(`Unknown series: ${seriesKey}`);
  }

  for (const keyConfig of config) {
    if (keyConfig.series === seriesKey) {
      text = applyFontMapping(text, keyConfig.reverseMapping, keyConfig.family, options);
    }
  }
  return text;
}

export { config, series } from "./config/index.js";
