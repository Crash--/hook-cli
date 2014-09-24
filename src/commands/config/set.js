var fs = require('fs'),
    parsers = require('../../cli/parsers'),
    client = require('../../client'),
    utils = require('../../utils'),
    output = require('../../output');

module.exports = {
  command: 'config:set <name=value> [name=value]',
  description: 'Set application configuration',
  parser: parsers.collect,
  action: function() {
    var args = program.rawArgs.splice(3),
        config = utils.getExtFile('config.yaml') || {},
        configsToAdd = [];

    console.log(config)

    for (var i in args) {
      var values = args[i].split(/=/),
          name = values[0],
          value = values[1];

      // skip invalid values
      if (value.length == 0) continue;

      if (fs.existsSync(value)) {

      } else {

      }

      configsToAdd.push({name: name, value: value});
    }

    for (var i=0; i<configsToAdd.length; i++) {
      utils.arraySet(config, configsToAdd[i].name, configsToAdd[i].value);
    }

    console.log(config)

		// foreach($configs_to_add as $config) {
		// 	Utils::array_set($configs, $config['name'], $config['value']);
		// }
    //
		// $dumper = new Symfony\Component\Yaml\Dumper();
		// file_put_contents($config_file, str_replace("  ", " ", $dumper->dump($configs, 10)));
    //
		// Console::output("Written successfully at: '{$config_file}'");

		// $configs_to_add = array();
		// foreach($args as $arg) {
		// 	if (!is_null($arg) && preg_match('/=/', $arg)) {
		// 		$config = preg_split('/=/', $arg);
		// 		$name = $config[0];
		// 		$value = $config[1];
    //
		// 		//
		// 		// Read or extract certificate file
		// 		// --------------------------------
		// 		//
		// 		if (file_exists($value)) {
		// 			Console::output("Reading certificate file...");
    //
		// 			$ext = pathinfo($value, PATHINFO_EXTENSION);
		// 			if ($ext == 'p12') {
		// 				$results = array();
		// 				$worked = openssl_pkcs12_read(file_get_contents($value), $results, null);
		// 				if ($worked) {
		// 					$value = $results['cert'] . $results['pkey'];
		// 				} else {
		// 					Console::error(openssl_error_string());
		// 				}
		// 			} else if ($ext == 'pem') {
		// 				$value = file_get_contents($value);
		// 			}
		// 		}
    //
		// 		array_push($configs_to_add, array(
		// 			'name' => $name,
		// 			'value' => $value
		// 		));
		// 	}
		// }
    //
		// foreach($configs_to_add as $config) {
		// 	Utils::array_set($configs, $config['name'], $config['value']);
		// }
    //
		// $dumper = new Symfony\Component\Yaml\Dumper();
		// file_put_contents($config_file, str_replace("  ", " ", $dumper->dump($configs, 10)));
    //
		// Console::output("Written successfully at: '{$config_file}'");

  }
}
