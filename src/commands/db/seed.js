var fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    output = require('../../output'),
    client = require('../../client'),
    utils = require('../../utils'),
    parsers = require('../../cli/parsers'),
    yaml = require('js-yaml'),
    yaml_schema = require('../../ext/yaml')(yaml); // register custom yaml types

module.exports = {
  command: 'db:seed [collections]',
  description: 'Seed collections from YAML files.',
  parser: parsers.collect,
  action: function() {
    var collections = program.rawArgs.splice(3);

    if (collections.length == 0) {
      collections = ['*'];
    }

    glob(utils.getExtDir() + "/seeds/" + collections.join(',') + ".{yml,yaml}", function(err, files) {
      for (var i=0;i<files.length;i++) {
        var options = yaml.load( fs.readFileSync(files[i]).toString() ),
            name = path.basename(files[i]).match(/[^\.]+/)[0],
            populate = function() {
              for (var j=0; j<options.data.length; j++) {
                console.log()
                client.post('collection/' + name, options.data[i], function(response) {
                  output.info("created", response)
                });
              }
            };

        if (options.truncate) {
          client.del('collection/' + name, function(response) {
            if (response.success) {
              output.info(name + ": truncated successfully.");
            } else {
              output.warn(name + ": nothing to truncate.");
            }
            populate();
          });

        } else {
        }

      }
    })

		// $client = new Client();
		// foreach(Utils::glob(Project::root(Project::DIRECTORY_NAME) . '/seeds/' . $seed_file) as $yaml_file) {
		// 	$collection = basename($yaml_file, '.yaml');
    //
		// 	$parser = new Symfony\Component\Yaml\Parser();
		// 	$options = $parser->parse(file_get_contents($yaml_file));
    //
		// 	if (isset($options['truncate']) && $options['truncate']) {
		// 		echo "Truncating '{$collection}'... ";
		// 		$truncate = $client->delete('collection/' . $collection);
		// 		if (count($truncate)>0) {
		// 			echo "ok.";
		// 		}
		// 		echo PHP_EOL;
		// 	}
    //
		// 	if (isset($options['data']) && $options['data']) {
		// 		$current_row = 0;
		// 		$total_rows = count($options['data']);
		// 		foreach($options['data'] as $data) {
    //
		// 			// Look for special data fields
		// 			foreach($data as $field => $value) {
		// 				if (preg_match('/\!upload ([^$]+)/', $value, $file)) {
		// 					$filepath = Project::DIRECTORY_NAME . '/seeds/' . $file[1];
    //
		// 					// stop when file doens't exists
		// 					if (!file_exists($filepath)) {
		// 						Client\Console::error("File not found: '{$filepath}'");
		// 						die();
		// 					}
    //
		// 					$mime_type = Utils::mime_type($filepath);
		// 					$data[$field] = 'data:' . $mime_type . ';base64,' . base64_encode(file_get_contents($filepath));
		// 				}
		// 			}
    //
		// 			$client->post('collection/' . $collection, array('data' => $data));
		// 			$current_row += 1;
		// 			$percent = round(($current_row / $total_rows)*100);
		// 			echo "Seeding '{$collection}': " . "{$percent}%" . str_repeat("\r", strlen($percent)+1);
		// 		}
		// 	}
    //
		// 	echo PHP_EOL;
		// }
		// echo "Done." . PHP_EOL;

  }
}


