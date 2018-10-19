/**
 * get html rawData with cheerio. the option parameter 
 * @param {string} tag - html element tag, etc a, meta, title, strong...
 * @param {string} option - option value is "text", "attributes". This parameter determines the rawdata obtained.
 */
const getElementInfo = (tag, option) => {
  return new Promise((resolve, reject) => {
    const info = [];
    $(tag).each((index, element) => {
      if (option === 'text') {
        info.push($(element).text());
      } else {
        info.push(element.attribs)
      }
    });
    resolve(info);
  });
}

/**
 * check the attributes value with the checkList in the tag of html
 * @param {object} rawData - the specific tag's rawData.
 * @param {object} checkList - the setting for the seo checker to check.
 * @param {string} tag - html element tag. It's the checker to check content this.
 */
const auditAttributes = (rawData, checkList, tag) => {
  let attributes = checkList['attributes'];
  if (attributes) {
    for (let attr in attributes) {
      let item = attributes[attr];
      if (item.required) {
        // check attribut the {tag:meta} not 
        let dataMap = _.map(rawData, attr);
        let initResult = {
          isExist: false,
          isValueMatch: (item.value && item.value.length > 0) ? false : true,
          isKeywordsMatch: (KEYWORDS && item.keywordRequired) ? false : true
        };
        const inspectResult = dataMap.reduce((result, data) => {
          if (item.keywordRequired && KEYWORDS && data && data.match(KEYWORDS)) {
            result.isKeywordsMatch = true
          }
          if (item.value.length > 0 && item.value.indexOf(data) > -1) {
            result.isValueMatch = true;
          }
          if (data) {
            result.isExist = true
          }
          return result
        }, initResult);

        if (!inspectResult.isExist) {
          console.log(`html tag "${tag}" -> ${attr} Attributes is not exist`)
        }
        if (!inspectResult.isValueMatch) {
          console.log(`html tag "${tag}" -> ${attr} Attributes' value isn't matched`);
        }
        if (!inspectResult.isKeywordsMatch) {
          console.log(`html tag "${tag}" -> ${attr} Attributes' value isn't matched keywords`);
        }
      }
    }

  }
}

module.exports = {
  getElementInfo,
  auditAttributes
}