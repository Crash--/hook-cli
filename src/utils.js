var fs = require('fs'),
    path = require('path');

module.exports = {
  DIRECTORY_NAME: 'hook-ext',
  CONFIG_FILE: '.hook-config',

  getConfigPath: function() {
    return this.root() + "/" + this.CONFIG_FILE;
  },

  config: function() {
    var configPath = this.getConfigPath();
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath).toString());
    }
    return {};
  },

  root: function(concat) {
    var i,
        scm_list = [this.DIRECTORY_NAME, '.git', '_darcs', '.hg', '.bzr', '.svn'],
        result = process.cwd();

    if (!concat) {
      concat = '';
    }

    while (result !== '/') {
      result +=  '/';

      for(i in scm_list) {
        if (fs.existsSync( result + scm_list[i] )) {
          return result + concat;
        }
      }

      // try parent directory...
      result = path.dirname(result);
    }

    return process.cwd() + '/' + concat;
  }

}
