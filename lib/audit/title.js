const { getElementInfo, auditAttributes } = require('helper/index.js');

/**
 * the checker to check the html rawData of tag with setting. 
 * @param {object} rawData - the specific tag's rawData.
 * @param {object} checkList - the setting for the seo checker to check.
 * @param {string} tag - html element tag. It's the checker to check content this.
 */
const checker = async(rawData, checkList, tag) => {

  for (let menu in checkList) {
    switch (menu) {
      case 'attributes':
        auditAttributes(rawData, checkList, tag);
        break;
      case 'text':
        const content = await getElementInfo(tag, 'text');
        let item = checkList[menu];
        if (item.required) {
          let contentLength = content.length;
          if (contentLength === 0) {
            console.log(`You have html <${tag}> tag, but no content here`)
          } else { 
            if (item.value.length > 0 && item.value.indexOf(data) === -1) { 
              console.log(`text of <${tag}> isn't matched values with SETTINGS`)
            }
            if (item.keywordRequired && KEYWORDS) { 
              let isMatch = content.filter((text) => {
                return (text.match(KEYWORDS))
              });
              if (isMatch.length === 0) { 
                console.log(`text of <${tag}> isn't matched keywords with SETTINGS`)
              }
            }

          }
        }

        break;
      default:
    }
  }
}


const title = async () => {
  // the tag is the issue for the checker
  const tag = 'title';

  // get setting be check list for the checker
  const checkerSettings = SETTINGS[tag];

  // the rawData of the tag
  const rawData = await getElementInfo(tag, 'attributes');

  // if the tag should be checked
  if (checkerSettings.required && rawData.length > 0) {
    await checker(rawData, checkerSettings, tag);
  }

  // but it is not found the rawData from the html
  if (checkerSettings.required && rawData.length === 0) { 
    console.log(`${tag} tag isn't exist in your html`)
  }
}

module.exports = {
  title
}