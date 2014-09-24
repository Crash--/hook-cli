var fs = require('fs'),
    path = require('path'),
    yaml = require('js-yaml'),
    yaml_schema = require('./ext/yaml')(yaml); // register custom yaml types

module.exports = {
  DIRECTORY_NAME: 'hook-ext',
  CONFIG_FILE: '.hook-config',

  getConfigPath: function(concat) {
    return this.root() + "/" + this.CONFIG_FILE;
  },

  getExtDir: function() {
    return this.root(this.DIRECTORY_NAME);
  },

  getExtFile: function(filename) {
    var data,
        local_filename = this.getExtDir() + "/" + filename;
    if (fs.existsSync(local_filename)) {
      data = fs.readFileSync(local_filename);

      // parse YAML file using custom schema
      if (path.extname(local_filename) === '.yaml') {
        data = yaml.load(data, {schema: yaml_schema});
      }

      return data;
    } else {
      return false;
    }
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
  },

  arraySet: function(arr, key, value) {
    var keys = key.split("."),
        last = arr;

    for (var i=0; i<keys.length; i++) {
      if (!last[ keys[i] ]) {
        last[ keys[i] ] = {};
      }

      console.log(keys[i]);
      // current = current[  ] || {}
    }

    current = value;
  }

}
