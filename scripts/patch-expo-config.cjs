const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'node_modules', '@expo', 'config', 'build', 'index.js');
if (fs.existsSync(indexPath)) {
  let source = fs.readFileSync(indexPath, 'utf8');
  if (!source.includes('getPlatformsFromConfig')) {
    source = source.replace('exports.__esModule = true;', 'exports.__esModule = true;\nexports.getPlatformsFromConfig = function(projectRoot, exp) { return (exp && exp.platforms) || exports.getSupportedPlatforms(projectRoot); };');
    fs.writeFileSync(indexPath, source);
  }
}
