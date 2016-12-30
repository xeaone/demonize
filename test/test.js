const Demonize = require('../index.js');

const options = {
	env: {},
	cwd: '/Users/Alex/psudo-server/www/node/test/.',
	arg: 'app.js',
	out: __dirname + '/out.log',
	err: 'ignore'
};

const child = Demonize.it(options);

console.log(child);

// const options = {
// 	// env: { PORT: 4444 },
//
// 	err: 'ignore',
// 	out: __dirname + '/out.log',
//
// 	arg: 'app.js',
// 	cwd: '/Users/Alex/psudo-server/www/node/test'
// };
//
// Demonize.generate(options, function (error) {
// 	if (error) throw error;
// 	else console.log('Created Standalone Demonize Script');
// });
