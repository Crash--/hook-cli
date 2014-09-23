var client = require('../../client'),
    utils = require('../../utils'),
    output = require('../../output');

function collect(val, memo) {
  memo.push(val);
  return memo;
}

module.exports = {
  command: 'config:set <name=value> [name=value]',
  description: 'Set application configuration',
  parser: collect,
  action: function() {
    var args = program.rawArgs.splice(3),
        config = utils.getExtFile('config.yaml'),
        configsToAdd = [];

    for (var i in args) {
      args[i].match(/=/)
    }

  }
}
