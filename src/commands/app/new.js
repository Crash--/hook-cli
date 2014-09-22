var fs = require('fs'),
    client = require('../../client'),
    output = require('../../output'),
    utils = require('../../utils');

module.exports = {
  command: 'app:new <name>',
  description: "Create a new application.",
  action: function(name) {

    client.post('apps', {
      app: { name: name }
    }, function(data) {
      output.json(data);

      // write application configuration file
      fs.writeFileSync(utils.getConfigPath(), JSON.stringify({
        name: data.name,
        app_id: data.keys[0].app_id,
        key: data.keys[0].key,
        endpoint: client.endpoint
      }));

      output.warn("application keys for:");
      output.log(data.name);
      output.info();
      for(var i in data.keys) {
        output.info(data.keys[i].type);
        output.log("app_id: " + data.keys[i].app_id);
        output.log("key: " + data.keys[i].key);
        output.info();
      }

    });

  }
}
