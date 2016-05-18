'use strict';

const Spawn = require('child_process').spawn;
const Fs = require('fs');

const UTF8 = 'utf8';
const TEMPLATE = __dirname + '/templates/demon.js';

exports.it = function (options) {
	var arg = null;

	const out = getStd(options.out);
	const err = getStd(options.err);
	const env = options.env || {};
	const cwd = options.cwd || process.cwd();
	const cmd = options.cmd || process.execPath;

	arg = (options.arg) ? options.arg : 'index.js';
	arg = (Array.isArray(options.arg)) ? options.arg : [options.arg];

	const opt = {
		env: env,
		cwd: cwd,
		detached: true,
		stdio: ['ignore', out, err]
	};

	// spawn unref return
	const child = Spawn(cmd, arg, opt);

	child.unref();

	return child;
};

exports.generate = function (options, callback) {
	const mode = '777'; // read write execute - all

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

		const path = (options.fd) ? options.fd : process.cwd() + '/demon.js';

		Fs.writeFile(path, file, function (error) {
			if (error) return callback(error);

			Fs.chmod(path, mode, function (error) {
				if (error) return callback(error);
				return callback();
			});
		});

	});
};

function getStd (std) {
	if (std === null || std === undefined) return 'ignore';

	const isPath = isStdPath(std);

	if (!isPath) return std;
	if (isPath) return Fs.openSync(std, 'a');
}

function getStdToString (std) {
	if (std === null || std === undefined) return JSON.stringify('ignore');

	const isPath = isStdPath(std);

	if (!isPath) return JSON.stringify(std);
	if (isPath) return 'Fs.openSync(\'' + std + '\', \'a\')';
}

function isStdPath (std) {
	return (std !== 'pipe' || std !== 'inherit' || std !== 'ignore') ? true : false;
}