const ChildProcess = require('child_process');
const Path = require('path');
const Fs = require('fs');

const MODE = '777'; // read write execute - all
const UTF8 = 'utf8';
const TEMPLATE = Path.join(__dirname, 'templates', 'demon.js');

function opt (options) {
	options = options || {};

	options.detached = true;
	options.env = options.env || {};
	options.cwd = options.cwd || process.cwd();
	options.cmd = options.cmd || process.execPath;

	options.arg = options.args || options.arg;
	options.arg = typeof options.arg === 'string' ? [options.arg] : options.arg;

	options.out = options.out ? options.out : 'ignore';
	options.err = options.err ? options.out : 'ignore';

	options.stdio = [
		'ignore',
		'ignore',
		'ignore'
	];

	options.fd = options.fd ? options.fd : Path.join(process.cwd(), 'demon.js');

	return options;
}

module.exports.it = function (options) {
	options = opt(options);

	options.stdio[1] = options.out === 'ignore' ? options.out : Fs.openSync(options.out, 'a');
	options.stdio[2] = options.err === 'ignore' ? options.err : Fs.openSync(options.err, 'a');

	var child = ChildProcess.spawn(options.cmd, options.arg, options);

	child.unref();

	return child;
};

module.exports.generate = function (options, callback) {
	options = opt(options);

	if (callback) {
		Fs.readFile(TEMPLATE, UTF8, function (error, data) {
			if (error) return callback(error);

			try {
				data = data.replace(
					'/*OPTIONS*/',
					JSON.stringify(options, null, '\t')
				);
			} catch (e) {
				return callback(e);
			}

			Fs.writeFile(options.fd, data, function (error) {
				if (error) return callback(error);

				Fs.chmod(options.fd, MODE, function (error) {
					if (error) return callback(error);

					return callback();
				});
			});
		});
	} else {
		var data = Fs.readFileSync(TEMPLATE, UTF8);

		data = data.replace(
			'/*OPTIONS*/',
			JSON.stringify(options, null, '\t')
		);

		Fs.writeFileSync(options.fd, data);
		Fs.chmodSync(options.fd, MODE);
	}

};
