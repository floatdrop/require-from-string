'use strict';

var Module = module.constructor;
var path = require('path');

module.exports = function requireFromString(code, filename, opts) {
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}

	opts = opts || {};

	opts.appendPaths = opts.appendPaths || [];
	opts.prependPaths = opts.prependPaths || [];

	if (typeof code !== 'string') {
		throw new Error('code must be a string, not ' + typeof code);
	}

	var paths = Module._nodeModulePaths(path.dirname(filename));

	var m = new Module(filename, module.parent);
	m.filename = filename;
	m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
	m._compile(code, filename);

	return m.exports;
};
