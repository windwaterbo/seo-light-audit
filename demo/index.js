require('rootpath')()
const path = require('path')
const fs = require('fs')
const seoAudit = require('index.js');
const userSetting = {
  "keywords": ["CHOCO TV", "如懿傳"],
  "title.text.keywordRequired": true
}
const basename = path.basename(module.filename)
const getFiles = () => {
  return fs.readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === '.html')
    })
}

async function main() {
  const files = await getFiles()
  // console.log('files ',files)
  for await (const file of files) {
    console.log(`######### SEO Audit : ${file} ###########`)
    const filePath = path.join(__dirname + '/' + file);
    await seoAudit(userSetting, filePath);
  }
}


main()

// for await (const file of fs.readFile(file, 'utf8')) {
//   console.log(contents)
// }
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === '.html')
//   })
//   .forEach(async (file) => {
//     const filePath = path.join(__dirname + '/' + file);
//     await seoAudit(userSetting, filePath);
//   });