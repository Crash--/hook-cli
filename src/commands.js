module.exports = [
  // application
  require('./commands/app/new'),

  // generators
  // 'generate': require('./commands/generate/available'),
  require('./commands/generate/seed'),
  require('./commands/generate/observer'),
  require('./commands/generate/route'),
  require('./commands/generate/channel'),
  require('./commands/generate/template'),
  require('./commands/generate/schedule'),
  require('./commands/generate/schema'),

  // database
  require('./commands/db/seed'),

  // configurations
  require('./commands/config/list'),
  require('./commands/config/set'),

  // modules
  require('./commands/module/list.js'),
  require('./commands/module/upload.js'),

  // schedule
  require('./commands/schedule/list.js'),
  require('./commands/schedule/upload.js'),

  // cache
  require('./commands/cache/clear.js'),

  // utils
  require('./commands/console'),
  require('./commands/server'),
  require('./commands/deploy')
];
