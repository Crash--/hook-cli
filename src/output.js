var colors = require('colors')

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// overwrite console.error
var _console_error = console.error;
console.error = function() {
  if (arguments[0] && typeof(arguments[0])!=="object") { arguments[0] = arguments[0].error; }
  _console_error.apply(console, arguments)
}

// overwrite console.info
console.info = function() {
  if (arguments[0] && typeof(arguments[0])!=="object") { arguments[0] = arguments[0].info; }
  console.log.apply(console, arguments)
}

// overwrite console.warn
var _console_warn = console.warn;
console.warn = function() {
  if (arguments[0] && typeof(arguments[0])!=="object") { arguments[0] = arguments[0].warn; }
  _console_warn.apply(console, arguments)
}

// create console.debug
var _console_debug = console.log;
console.debug = function() {
  if (arguments[0] && typeof(arguments[0])!=="object") { arguments[0] = arguments[0].debug; }
  _console_debug.apply(console, arguments)
}

module.exports = {
  log: function() {
    // prevent any output when using JSON mode
    if (program.json) {
      return;
    }
    console.log.apply(console, arguments)
  },

  warn: function() {
    // prevent any output when using JSON mode
    if (program.json) {
      return;
    }
    console.warn.apply(console, arguments)
  },

  info: function() {
    // prevent any output when using JSON mode
    if (program.json) {
      return;
    }
    console.info.apply(console, arguments)
  },

  error: function() {
    // prevent any output when using JSON mode
    if (program.json) {
      return;
    }
    console.error.apply(console, arguments)
  },

  debug: function() {
    // prevent any output when using JSON mode
    if (program.json) {
      return;
    }
    console.debug.apply(console, arguments)
  },

  silly: function(data) { console.log(data.silly) },
  input: function(data) { console.log(data.input) },
  verbose: function(data) { console.log(data.verbose) },
  prompt: function(data) { console.log(data.prompt) },
  data: function(data) { console.log(data.data) },
  help: function(data) { console.log(data.help) },

  json: function(data) {
    if (program.json) {
      console.log(data);
      process.exit();
    }
  }
}
