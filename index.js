require('rootpath')();
const fs = require('fs');
const path = require('path')

module.exports = async (customerSetting, file) => {
  require('lib/before')(customerSetting, file);
  const basename = path.basename(module.filename)

  fs.readdirSync(__dirname + '/lib/audit')
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(async (file) => {
      const moduleName = file.split('.')[0];
      const execuFunction = require(path.join(__dirname + '/lib/audit', file));     
      await execuFunction[moduleName]();
    });
  return;
}