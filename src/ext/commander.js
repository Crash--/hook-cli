require('../output');

module.exports = function(program) {

  // colored commands and required arguments
  program.commandHelp = function() {
    if (!this.commands.length) return '';
    return [
        ''
      , '  Commands:'
      , ''
      , this.commands.map(function(cmd){
        var args = cmd._args.map(function(arg){
          return arg.required
            ? ('<' + arg.name + '>').error
            : ('[' + arg.name + ']').warn;
        }).join(' ');

        return cmd._name.info
          + (cmd._alias
            ? '|' + cmd._alias
            : '')
          + (cmd.options.length
            ? ' [options]'
            : '') + ' ' + args
          + (cmd.description()
            ? '\n   ' + cmd.description()
            : '')
          + '\n';
      }).join('\n').replace(/^/gm, '    ')
      , ''
    ].join('\n');
  }

};
