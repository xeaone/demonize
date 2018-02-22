'use strict';

const Fs = require('fs');
const Util = require('util');
const Path = require('path');
const Cp = require('child_process');

const Open = Util.promisify(Fs.open);
const Chmod = Util.promisify(Fs.chmod);
const ReadFile = Util.promisify(Fs.readFile);
const WriteFile = Util.promisify(Fs.writeFile);

const MODE = '777'; // read write execute - all
const ENCODING = 'utf8';
const TEMPLATE = Path.join(__dirname, 'templates', 'demon.js');

const opt = function (options) {
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
};

module.exports.it = async function (options) {
	options = opt(options);

	if (options.out === 'ignore') {
		options.stdio[1] = options.out;
	} else {
		options.stdio[1] = await Open(options.out, 'a');
	}

	if (options.err === 'ignore') {
		options.stdio[2] = options.err;
	} else {
		options.stdio[2] = await Open(options.err, 'a');
	}

	const child = Cp.spawn(options.cmd, options.arg, options);

	child.unref();

	return child;
};

module.exports.generate = async function (options) {
	options = opt(options);

	let data = await ReadFile(TEMPLATE, ENCODING);

	data = data.replace(
		'/*OPTIONS*/',
		JSON.stringify(options, null, '\t')
	);

	await WriteFile(options.fd, data);
	await Chmod(options.fd, MODE);
};
