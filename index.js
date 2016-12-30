const ChildProcess = require('child_process');
const Fs = require('fs');

const UTF8 = 'utf8';
const TEMPLATE = __dirname + '/templates/demon.js';

function getStd (std) {
	if (!std) return 'ignore';
	else return Fs.openSync(std, 'a');
}

function getStdToString (std) {
	if (!std) return 'ignore';
	else return 'Fs.openSync(\'' + std + '\', \'a\')';
}

module.exports.it = function (options) {
	var arg = null;

	var out = getStd(options.out);
	var err = getStd(options.err);
	var env = options.env || {};
	var cwd = options.cwd || process.cwd();
	var cmd = options.cmd || process.execPath;

	arg = options.arg ? options.arg : 'index.js';
	arg = Array.isArray(options.arg) ? options.arg : [options.arg];

	var opt = {
		env: env,
		cwd: cwd,
		detached: true,
		stdio: ['ignore', out, err]
	};

	var child = ChildProcess.spawn(cmd, arg, opt);

	child.unref();

	return child;
};

module.exports.generate = function (options, callback) {
	var mode = '777'; // read write execute - all

	Fs.readFile(TEMPLATE, UTF8, function (error, file) {
		if (error) return callback(error);

		var out = null;
		var err = null;
		var env = null;
		var arg = null;
		var cwd = null;
		var cmd = null;

		try {
			env = (typeof options.env === 'string') ? options.env : JSON.stringify(options.env);

			arg = (options.arg) ? options.arg : 'index.js';
			arg = (Array.isArray(options.arg)) ? JSON.stringify(options.arg) : JSON.stringify([options.arg]);

			cwd = JSON.stringify(options.cwd || process.cwd());
			cmd = JSON.stringify(options.cmd || process.execPath);

			out = getStdToString(options.out);
			err = getStdToString(options.err);
		} catch (e) {
			return callback(e);
		}

		file = file.replace('/*OUT*/', out);
		file = file.replace('/*ERR*/', err);
		file = file.replace('/*ENV*/', env);
		file = file.replace('/*ARG*/', arg);
		file = file.replace('/*CWD*/', cwd);
		file = file.replace('/*CMD*/', cmd);

		var path = (options.fd) ? options.fd : process.cwd() + '/demon.js';

		Fs.writeFile(path, file, function (error) {
			if (error) return callback(error);

			Fs.chmod(path, mode, function (error) {
				if (error) return callback(error);
				return callback();
			});
		});

	});
};
