import { config, series } from './config/index.js';

/**
 * @typedef {import('./config/index.js').Font} Font
 * @typedef {import('./config/index.js').Series} Series
 * @typedef {import('./config/index.js').FontConfig} FontConfig
 * @typedef {Object} Options
 * @property {boolean} [title] 添加按键名称提示
 * @property {boolean} [ariaLabel] 添加按键无障碍标签
 * @typedef {{ type: 'text', value: string }} TextToken
 * @typedef {{ type: 'key', font: Font, family: string, glyph: string, label: string }} KeyToken
 * @typedef {TextToken | KeyToken} Token
 */

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
 * @param {Options} [options] 可选设置项
 * @returns {string} 生成的 HTML 字符串
 */
function renderKeySpan(family, content, keyText, options = {}) {
  const attrs = [`style="font-family:'${family}'"`];
  if (options.title || options.ariaLabel) {
    const keyTextEncode = toHtmlUnicodeEntities(keyText);
    if (options.title) attrs.push(`title="${keyTextEncode}"`);
    if (options.ariaLabel) attrs.push(`aria-label="${keyTextEncode}"`);
  }

  return `<span ${attrs.join(' ')}>${content}</span>`;
}

/**
 * 合并字体映射并缓存匹配规则。同名别名保留配置中第一个字体。
 *
 * @param {FontConfig[]} keyConfigs 要使用的字体配置
 * @returns {{ html: (text: string, options?: Options) => string, tokenize: (text: string) => Token[] }} 转换函数
 */
function createConverter(keyConfigs) {
  const keys = new Map();
  for (const keyConfig of keyConfigs) {
    for (const [keyText, content] of Object.entries(keyConfig.reverseMapping)) {
      if (!keys.has(keyText)) {
        keys.set(keyText, { font: keyConfig.font, family: keyConfig.family, glyph: content });
      }
    }
  }

  const alternatives = [...keys.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(alternatives.map(escapeRegExp).join('|'), 'g');

  // HTML 和 token 共用匹配规则，只扫描原始输入。
  return {
    html: (text, options = {}) => text.replace(pattern, matched => {
      const { family, glyph } = keys.get(matched);
      return renderKeySpan(family, glyph, matched, options);
    }),
    tokenize(text) {
      /** @type {Token[]} */
      const tokens = [];
      let offset = 0;
      for (const match of text.matchAll(pattern)) {
        if (match.index > offset) {
          tokens.push({ type: 'text', value: text.slice(offset, match.index) });
        }
        tokens.push({ type: 'key', ...keys.get(match[0]), label: match[0] });
        offset = match.index + match[0].length;
      }
      if (offset < text.length) {
        tokens.push({ type: 'text', value: text.slice(offset) });
      }
      return tokens;
    },
  };
}

const fontConverters = new Map(config.map(keyConfig => [keyConfig.font, createConverter([keyConfig])]));
const seriesConverters = new Map(series.map(seriesKey => [
  seriesKey,
  createConverter(config.filter(keyConfig => keyConfig.series === seriesKey)),
]));

/**
 * 将指定字体的 keyText 替换为对应样式的 HTML，支持添加 title/aria-label 属性
 *
 * @param {Font} font 字体名称
 * @param {string} text 要处理的文本
 * @param {Options} [options] 可选设置项
 * @returns {string} 替换后的文本
 */
export function text2KeyFont(font, text, options = {}) {
  const convert = fontConverters.get(font);
  if (!convert) {
    throw new Error(`Unknown font: ${font}`);
  }
  return convert.html(text, options);
}

/**
 * 根据系列名称替换文本，同名按键使用配置中的第一个字体，可选辅助属性
 *
 * @param {Series} seriesKey 系列名称
 * @param {string} text 要处理的文本
 * @param {Options} [options] 可选设置项
 * @returns {string} 替换后的文本
 */
export function text2KeyFontBySeries(seriesKey, text, options = {}) {
  const convert = seriesConverters.get(seriesKey);
  if (!convert) {
    throw new Error(`Unknown series: ${seriesKey}`);
  }

  return convert.html(text, options);
}

/**
 * 将指定字体的按键标记拆分为文本和按键数据，不生成 HTML。
 *
 * @param {Font} font 字体名称
 * @param {string} text 要处理的文本
 * @returns {Token[]} 文本和按键 token
 */
export function tokenize(font, text) {
  const convert = fontConverters.get(font);
  if (!convert) {
    throw new Error(`Unknown font: ${font}`);
  }
  return convert.tokenize(text);
}

/**
 * 根据系列拆分文本和按键数据，字体优先级与 HTML 转换相同。
 *
 * @param {Series} seriesKey 系列名称
 * @param {string} text 要处理的文本
 * @returns {Token[]} 文本和按键 token
 */
export function tokenizeBySeries(seriesKey, text) {
  const convert = seriesConverters.get(seriesKey);
  if (!convert) {
    throw new Error(`Unknown series: ${seriesKey}`);
  }
  return convert.tokenize(text);
}

export { config, series } from './config/index.js';
