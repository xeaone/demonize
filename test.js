'use strict';

const Demonize = require('./index.js');

const options = {
	env: { PORT: 4444 },
	cwd: '/Users/Alex/psudo-server/www/node/test/.',
	arg: 'app.js',
	out: __dirname + '/out.log',
	err: 'ignore'
};

const child = Demonize.it(options);

console.log(child);
