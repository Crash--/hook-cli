var rest = require('restler'),
    utils = require('./utils');

module.exports = {
  endpoint: 'http://hook-master.dev/index.php/',
  debug: false,

  setEndpoint: function(endpoint) {
    this.endpoint = endpoint;
  },

  getEndpoint: function() {
    return this.endpoint;
  },

  get: function(segments, callback) {
    return this.parse(this.request('get', segments), callback);
  },

  del: function(segments, callback) {
    return this.parse(this.request('del', segments), callback);
  },

  post: function(segments, data, callback) {
    return this.parse(this.request('post', segments, data), callback);
  },

  request: function(method, segments, data) {
    if (!data) {
      data = {};
    }
    return rest[method](this.endpoint + segments, {
      data: data,
      headers: this.getHeaders()
    });
  },

  getHeaders: function() {
    config = utils.config();
    return {
      'Content-Type': 'application/json',
      // 'X-Public-Key' => urlencode(file_get_contents(_SERVER['HOME'] . '/.ssh/id_rsa.pub')),
      'User-Agent': 'hook-cli',
      'X-App-Id': config['app_id'],
      'X-App-Key': config['key']
    };
  },

  parse: function(request, callback) {
    return request.on('complete', function(data) {
      if (data instanceof Error || data.error) {
        try { data = JSON.parse(data); } catch (e) {}
        console.error();
        console.error(data.error || data.message);
        console.error();
        process.exit(1);
      } else {
        callback.apply(null, [data]);
      }
    });
  },

}
