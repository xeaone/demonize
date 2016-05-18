#!/usr/bin/env node

'use strict';

const Spawn = require('child_process').spawn;
const Fs = require('fs');

const env = /*ENV*/;

const arg = /*ARG*/;

const cwd = /*CWD*/;

const cmd = /*CMD*/;

const out = /*OUT*/;
const err = /*ERR*/;

const opt = {
	env: env,
	cwd: cwd,
	detached: true,
	stdio: ['ignore', out, err]
};

Spawn(cmd, arg, opt).unref();
