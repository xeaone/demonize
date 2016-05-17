'use strict';

const Spawn = require('child_process').spawn;
const Fs = require('fs');

exports.it = function (options) {

	if (options.out === null || options.out === undefined) options.out = 'ignore';
	if (options.out !== 'pipe' && options.out !== 'inherit' && options.out !== 'ignore') options.out = Fs.openSync(options.out, 'a');

	if (options.err === null || options.err === undefined) options.err = 'ignore';
	if (options.err !== 'pipe' && options.err !== 'inherit' && options.err !== 'ignore') options.err = Fs.openSync(options.err, 'a');

	const arg = (Array.isArray(options.arg)) ? options.arg : [options.arg];

	const out = options.out;
	const err = options.err;
	const env = options.env || {};
	const cwd = options.cwd || process.cwd();
	const cmd = options.cmd || process.execPath;


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
