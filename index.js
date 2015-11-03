'use strict';

var Module = module.constructor;
var path = require('path');

module.exports = function requireFromString(code, filename) {
	if (typeof code !== 'string') {
		throw new Error('code must be a string, not ' + typeof code);
	}

	var m = new Module(filename, module);
	m.filename = filename;
	m.paths = Module._nodeModulePaths(path.dirname(filename));
	m._compile(code, filename);
	return m.exports;
};
