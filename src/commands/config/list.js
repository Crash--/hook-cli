var client = require('../../client');

module.exports = {
  command: 'config',
  description: 'List application configurations',
  action: function() {
    client.get("apps/configs", function(configs) {

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
