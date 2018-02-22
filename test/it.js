const Demonize = require('../index.js');
const Path = require('path');

const options = {
	env: { PORT: 8000 },
	arg: 'server.js',
	cwd: __dirname,
	out: Path.join(__dirname, 'out.log'),
	err:  Path.join(__dirname, 'err.log')
};

(async function () {

	const child = await Demonize.it(options);

	console.log(child);

})().catch(function (error) {
	console.error(error);
});
