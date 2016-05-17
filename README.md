# Demonize #
Demonize / Daemonize Using Node.js


## Example ##
```JavaScript
const Demonize = require('demonize');

const options = {
	env: { PORT: 4444 },
	cwd: '/Users/Alex/psudo-server/www/node/test/.',
	arg: 'app.js',
	out: __dirname + '/out.log',
	err: 'ignore'
};

const child = Demonize.it(options);

console.log(child);
```

## Options ##
* `env: Object` - '{ YOUR: 'ENVS'}' (Default `{}`)
* `cwd: String` - '/Path/To/Executable' (Default `process.cwd()`)
* `arg: String || Array` -  'app.js' || ['index.js']
* `out: String` - '/Path/To/File/out.log' || 'pipe' || 'ignore' || 'inherit' (Default `'ignore'`)
* `err: String` - '/Path/To/File/err.log' || 'pipe' || 'ignore' || 'inherit' (Default `'ignore'`)


## TODO ##
* Demonize.me()


## Terms ##
Basically if you modify this project you have to contribute those modifications back to this project.


## License ##

Licensed Under MPL 2.0

Copyright (c) 2016 [Alexander Elias](https://github.com/AlexanderElias/)
