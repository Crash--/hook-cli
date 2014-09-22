var client = require('../../client'),
    output = require('../../output');

module.exports = {
  command: 'cache:clear',
  description: "Clear application's cache",
  action: function() {
    client.del("apps/cache", function(data) {
      output.json(data);

      output.info();
      if (data.success) {
        output.info("Cache cleared successfully.");
      } else {
        output.error("Some error ocurred when clearing the cache.");
      }
      output.info();
    });
  }
}
