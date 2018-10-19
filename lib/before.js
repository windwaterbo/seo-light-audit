const fs = require('fs');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');

global._ = require('lodash');
const defaultSetting = require('config/defaultSettings.json');

/**
 * kewords array convert to regular expression.
 * @param {array} keywords - Optional setting. User can provide settings based on rules.
 * origin keywords : ["CHOCO TV","如懿傳"]
 * keyword regex : /CHOCO TV|如懿傳/g
 */
const genKeywordsRegexPattern = (keywords) => {
  let pattern;
  if (keywords) {
    const keywordsLength = keywords.length;
    if (keywordsLength !== 0) {
      let patternStr = '';
      for (const [index, keyword] of keywords.entries()) {
        patternStr += keyword;
        if (index !== keywordsLength - 1) {
          patternStr += '|'
        }
      }
      pattern = new RegExp(patternStr, 'g');
    }
  }
  return pattern;
}

/**
 * Formating the custromer setting that format can fitting default setting and check the important keys such as value, keywordRequired, required.
 * @param {object} customerSetting - Optional setting. User can provide settings based on rules.
 * @param {object} defaultSetting - default setting. default setting for seo checker 
 * origin format - customerSetting
 * {
 *   "keywords":["CHOCO TV","如懿傳"],
 *   "meta.attributes.name.required":false,
 *   "title.attributes.hihi.required":true
 * }
 * after format - customerSetting
 * {
 *   keywords:["CHOCO TV","如懿傳"],
 *   meta:{
 *     attributes:{
 *       name:{
 *         value: ["description"],
 *         required:false,
 *         keywordRequired:false
 *       }
 *     }
 *   },
 *   title:{
 *     attributes:{
 *       hihi:{
 *         value:[],
 *         required:true,
 *         keywordRequired:false
 *       }
 *     }
 *   }
 * }
 */
const userSettingFormating = (customerSetting, defaultSetting) => {
  let userSetting = {};
  for (let list in customerSetting) {
    let keys = list.split('.');
    let last = keys.pop();
    const instance = keys.reduce((obj, key) => {
      return obj[key] = obj[key] || {};
    }, userSetting)[last] = customerSetting[list];
  }
  const tagList = Object.keys(userSetting, defaultSetting)
  tagList.forEach((tag) => {
    let userSettingByTag = userSetting[tag];
    let defaultSettingByTag = defaultSetting[tag];
    if (tag === 'keywords' && (Array.isArray(userSettingByTag) || typeof (userSettingByTag) === 'string')) {
      if (typeof (userSettingByTag) === 'string') {
        userSettingByTag = strToArray(userSettingByTag)
      }
    }
    for (let category in userSettingByTag) {
      let userSettingAttributes = userSettingByTag[category]
      let defaultSettingAttributes = defaultSettingByTag[category]
      if (category === 'text') {
        if (!userSettingAttributes.value) {
          userSettingAttributes.value = defaultSettingAttributes.value || [];
        }
        if (!userSettingAttributes.required) {
          userSettingAttributes.required = defaultSettingAttributes.required || false;
        }
        if (!userSettingAttributes.keywordRequired) {
          userSettingAttributes.keywordRequired = defaultSettingAttributes.keywordRequired || false
        }
      }
      if (category === 'attributes') {
        for (let attr in userSettingAttributes) {
          let defaultSettingItem = defaultSettingAttributes[attr]
          let userSettingItem = userSettingAttributes[attr]
          if (!userSettingItem.value) {
            userSettingItem.value = defaultSettingItem.value || [];
          }
          if (!userSettingItem.required) {
            userSettingItem.required = defaultSettingItem.required || false;
          }
          if (!userSettingItem.keywordRequired) {
            userSettingItem.keywordRequired = defaultSettingItem.keywordRequired || false
          }
        }
      }
    }
  });
  return userSetting;
}

/**
 * convert string to array by specific pattern
 * @param {string} str - kewords.
 * @returns {array} arr - list of kewords
 */
const strToArray = (str) => {
  const regexPattern = /:\s|,\s/;
  const arr = str.split(regexPattern);
  return arr;
}

/**
 * summary of setting for seo checker by merged default setting and userSetting
 * @param {object} defaultSetting - Default setting.
 * @param {object} userSetting - Optional setting. the user setting was formated by "userSettingFormating"
 */
const settingConform = (defaultSetting, userSetting) => {
  let SETTINGS = _.cloneDeep(defaultSetting);
  SETTINGS = _.merge(SETTINGS, userSetting);
  return SETTINGS;
}


/**
 * prepare data before main function excution prgram.
 * @param {object} customerSetting - Optional setting. User can provide settings based on rules
 */
module.exports = (customerSetting, file) => {

  (async () => {
  const dom = htmlparser2.parseDOM(fs.readFileSync(file), {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: true
  });
  global.$ = cheerio.load(dom);
  const userSetting = customerSetting || {};
  const getKeywords = userSetting['keywords'];
  // check setting is correct 
  global.USER_SETTING = userSettingFormating(userSetting, defaultSetting);
  global.SETTINGS = settingConform(defaultSetting, USER_SETTING)
  global.KEYWORDS = genKeywordsRegexPattern(getKeywords); // 修
  // console.log('KEYWORDS:::: ', KEYWORDS)
  // check key
  })();
}