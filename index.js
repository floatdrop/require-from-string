'use strict';

var Module = module.constructor;
var path = require('path');
var assert = require('assert');

module.exports = requireFromString;
module.exports.load = load;

function requireFromString(code, filename, opts) {
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}

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

	var requireHook = opts.require;

	if (requireHook) {
		m.require = function (path) {
			assert(typeof path === 'string', 'path must be a string');
			assert(path, 'missing path');
			return requireHook.call(this, path);
		}
	}
	m.filename = filename;
	m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
	return m;
}
