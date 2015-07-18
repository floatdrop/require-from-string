# require-from-string [![Build Status](https://travis-ci.org/floatdrop/require-from-string.svg?branch=master)](https://travis-ci.org/floatdrop/require-from-string)

Load module from string in Node.

## Install

```
$ npm install --save require-from-string
```


## Usage

```js
var requireFromString = require('require-from-string');

requireFromString('module.exports = 1');
//=> 1
```


## API

### requireFromString(code, [filename])

#### code

*Required*  
Type: `string`

Module code.

#### filename
Type: `string`

Optional filename.


## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
