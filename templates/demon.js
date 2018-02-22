#!/usr/bin/env node

const Cp = require('child_process');
const Path = require('path');
const Fs = require('fs');

const options = /*OPTIONS*/;

options.stdio[1] = options.out === 'ignore' ? options.out : Fs.openSync(options.out, 'a');
options.stdio[2] = options.err === 'ignore' ? options.err : Fs.openSync(options.err, 'a');

const child = Cp.spawn(options.cmd, options.arg, options);

child.unref();
