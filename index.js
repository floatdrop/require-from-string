'use strict';

var Module = module.constructor;
var path = require('path');

module.exports = requireFromString;
module.exports.load = load;

function requireFromString(code, filename, opts) {
	if (typeof code !== 'string') {
		throw new Error('code must be a string, not ' + typeof code);
	}

	var m = load(filename, opts);

	m._compile(code, filename);

	return m.exports;
}

function load(filename, opts) {
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}

	opts = opts || {};

	opts.appendPaths = opts.appendPaths || [];
	opts.prependPaths = opts.prependPaths || [];

	var paths = Module._nodeModulePaths(path.dirname(filename));

	var m = new Module(filename, module.parent);
	if (opts.require) {
		m.require = function (path) {
			return opts.require.call(this, path);
		}
	}
	m.filename = filename;
	m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
	return m;
}
