# Demonize #
Demonize / Daemonize Using Node.js

`Demonize.it(options)` will demonize a program and return the Node.js child process object.

`Demonize.generate(options, callback)` will create a standalone Node.js demon script that can be ran by simply running `node demon.js`


## Examples ##
```JavaScript
const Demonize = require('demonize');

const options = {
	arg: 'app.js',
	err: 'ignore',
	out: __dirname + '/out.log',
	cwd: '/Path/To/Node/Application'
};

const child = Demonize.it(options);

console.log(child);
```

```JavaScript
const Demonize = require('demonize');

const options = {
	env: { PORT: 4444 },
	arg: ['server.js'],
	err: __dirname + '/out.log',
	out: __dirname + '/out.log',
	cwd: '/Path/To/Node/Application',

	fd: '/Path/To/Add/Generated/demon.js'
};

Demonize.generate(options, function (error) {
	if (error) throw error;
	else console.log('Created Standalone Demonize Script');
});
```

## Options ##
* `env: Object` - (Default `{}`)

* `arg: String || Array` - (Default `['index.js']`)

* `cwd: String` - `'/Path/To/Executable'` (Default `process.cwd()`)

* `out: String` - `'/Path/To/File/out.log'`, `'pipe'`, `'ignore'`, or `'inherit'` (Default `'ignore'`)

* `err: String` - `'/Path/To/File/err.log'`, `'pipe'`, `'ignore'`, or `'inherit'` (Default `'ignore'`)

* `fd: String` - `'/Path/To/Add/Generated/demon.js'` (Default `'./demon.js'`)


## TODO ##
* Demonize.me()


## Terms ##
Basically if you modify this project you have to contribute those modifications back to this project.


## License ##

Licensed Under MPL 2.0

Copyright (c) 2016 [Alexander Elias](https://github.com/AlexanderElias/)
