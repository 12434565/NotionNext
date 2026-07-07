/**
 * 截取page-id的语言前缀
 * notionPageId的格式可以是 en:xxxxx
 * @param {*} str
 * @returns en|zh|xx
 */
function extractLangPrefix(str) {
  const match = str.match(/^(.+?):/)
  if (match?.[1]) {
    return match[1]
  } else {
    return ''
  }
}

/**
 * 截取page-id的id
 * notionPageId的格式可以是 en:xxxxx   * @param {*} str
 * @returns xxxxx
 */
function extractLangId(str) {
  // 使用正则表达式匹配字符串
  const match = str.match(/:\s*(.+)/)
  // 如果匹配成功，则返回匹配到的内容
  if (match?.[1]) {
    return match[1]
  } else {
    // 如果没有匹配到，则返回空字符串或者其他你想要返回的值
    return str
  }
}

/**
 * 列表中用过来区分page只需要端的id足够
 */

function getShortId(uuid) {
  if (!uuid?.includes('-')) {
    return uuid
  }
  return uuid.substring(14)
}

function normalizeLocale(locale) {
  return typeof locale === 'string' ? locale.trim().replace('_', '-') : ''
}

function getLocaleLanguage(locale) {
  return normalizeLocale(locale).split('-')[0]
}

function getLocaleAliases(locale) {
  const normalized = normalizeLocale(locale)
  if (!normalized) {
    return []
  }

  const language = getLocaleLanguage(normalized)
  return language && language !== normalized
    ? [normalized, language]
    : [normalized]
}

function localeMatchesPrefix(locale, prefix) {
  const normalizedLocale = normalizeLocale(locale).toLowerCase()
  const normalizedPrefix = normalizeLocale(prefix).toLowerCase()
  if (!normalizedLocale || !normalizedPrefix) {
    return false
  }

  if (normalizedLocale === normalizedPrefix) {
    return true
  }

  const localeParts = normalizedLocale.split('-')
  const prefixParts = normalizedPrefix.split('-')

  return (
    localeParts[0] === prefixParts[0] &&
    (localeParts.length === 1 || prefixParts.length === 1)
  )
}

module.exports = {
  extractLangPrefix,
  extractLangId,
  getShortId,
  getLocaleAliases,
  localeMatchesPrefix
}
