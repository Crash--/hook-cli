//
// YAML Custom Types
// Example: https://github.com/nodeca/js-yaml/blob/master/examples/custom_types.js#L36
//
module.exports = function(yaml) {
  // define !upload
  var UploadYamlType = new yaml.Type('!upload', {
    kind: 'scalar',
    resolve: function (data) { return data !== null; },
    construct: function (data) { return data; },
    represent: function (data) { return data; },
    instanceOf: String,
  });

  // return schema
  return yaml.Schema.create([ UploadYamlType ]);
}
