#!/usr/bin/node

const Spawn = require('child_process').spawn;
const Fs = require('fs');

const options = /*OPTIONS*/;

options.stdio[1] = options.out === 'ignore' ? options.out : Fs.openSync(options.out, 'a');
options.stdio[2] = options.err === 'ignore' ? options.err : Fs.openSync(options.err, 'a');

const child = Spawn(options.cmd, options.arg, options);

child.unref();
