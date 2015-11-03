'use strict';

var Module = module.constructor;

module.exports = function requireFromString(code, filename) {
	if (typeof code !== 'string') {
		throw new Error('code must be a string, not ' + typeof code);
	}

	var m = new Module(filename, module);
	m.paths = module.paths;
	m._compile(code, filename);
	return m.exports;
};
