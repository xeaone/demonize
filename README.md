# Demonize
Demonize / Daemonize With Node.js

This library will demonize a program and return the child process. It can also create a standalone demonizable script that can be started just like a bash script `./demon.js`


## Examples
```js
const Demonize = require('demonize');

const options = {
	arg: 'server.js',
	env: { PORT: 8000 },
	err: __dirname + '/out.log',
	out: __dirname + '/out.log'
};

const child = Demonize.it(options);

console.log(child);
```
```js
const Demonize = require('demonize');

const options = {
	env: { PORT: 8000 },
	arg: ['server.js'],
	err: __dirname + '/out.log',
	out: __dirname + '/out.log',

	fd: '/Path/To/Add/Generated/demon.js'
};

Demonize.generate(options, function (error) {
	if (error) throw error;
	else console.log('Created Standalone Demonize Script');
});
```

## API
- `Demonize.it`
	- `options: Object` **required**

- `Demonize.generate`
	- `options: Object` **required**
	- `callback: Function` If a callback is not provided the generator will output a file synchronously. Other wise it will be asynchronous.


## Options
The same options that are available to the Node.js `ChildProcess.spawn` are also available as options.

- `arg: String || Array` A string or array of arguments. Alias for `args`.
- `env: Object` (Defaults `{}`)

- `cmd: String` The path to the executable (Default `process.execPath`)
- `cwd: String` The path to the current working directory (Default `process.cwd()`)

- `out: String` The path to a file `/path/out.log` or `ignore` (Defaults to `ignore`)
- `err: String` The path to a file `/path/err.log` or `ignore` (Defaults to `ignore`)

- `fd: String` The path to output a generated demon file (Default `./demon.js`)

## Authors
[AlexanderElias](https://github.com/AlexanderElias)

## License
[Why You Should Choose MPL-2.0](http://veldstra.org/2016/12/09/you-should-choose-mpl2-for-your-opensource-project.html)
This project is licensed under the MPL-2.0 License
