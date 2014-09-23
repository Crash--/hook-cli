var client = require('../../client'),
    utils = require('../../utils'),
    output = require('../../output');

module.exports = {
  command: 'config',
  description: 'List application configurations',
  action: function() {
    var config = utils.config();
    client.get("apps/configs", function(data) {
      output.json(data);

      output.log();
      if (data.length == 0) {
        output.warn("No configurations found for: " + config.name);
      } else {
        output.info("Configurations for '"+config.name+"'");
        output.log("app_id: ".warn + config.app_id);
        output.log("key: ".warn + config.key);
        output.log('---');
        output.log();
        for(var name in data) {
          var value = data[name].value.match(/[^\n]+/)[0];
          output.log(data[name].name.warn + ': ' + value);
        }
      }
      output.log();

      // project = Project::getConfig();
      //
      // if (!args['json']) {
      //   foreach(project as key => value) {
      //     Console::output(key . ': ' . value);
      //   }
      //   Console::output(str_repeat('-', 37));
      //   if (configs) {
      //     foreach(configs as config) {
      //       preg_match('/([^|\n]+)/', config.value, value);
      //       Console::output(config.name . ': ' . alue[1]);
      //     }
      //   } else {
      //     Console::output("No configurations found for: '{$project['name']}'.");
      //   }
      // }

    });


  }
}
