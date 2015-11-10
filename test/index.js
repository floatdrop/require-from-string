/* global it */

'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var requireFromString = require('../');

function getFixture(file) {
	file = path.join(__dirname, 'fixture', file);
	var code = fs.readFileSync(file, 'utf8');

	return {file: file, code: code};
}

it('should accept only string as code', function () {
	assert.throws(function () {
		requireFromString();
	}, /code must be a string, not undefined/);
});

it('should require from string', function () {
	assert.equal(requireFromString('module.exports = 1;'), 1);
});

it('should accept filename', function () {
	assert.throws(function () {
		requireFromString('module.exports = ', 'bug.js');
	}, /bug\.js|Unexpected token }/);
});

it('should work with relative require in file', function () {
	var fixture = getFixture('module.js');
	var result = requireFromString(fixture.code, fixture.file);

	assert.ok(result);
	assert.ok(module === result.parent.parent);
});

it('should have appended and preppended paths', function () {
	var fixture = getFixture('submodule.js');
	var result = requireFromString(fixture.code, fixture.file, {
		appendPaths: ['append'],
		prependPaths: ['prepend']
	});

	assert.ok(result);
	assert.equal(result.paths.indexOf('append'), result.paths.length - 1);
	assert.equal(result.paths.indexOf('prepend'), 0);
});

it('should allow modification of other required modules via callback', function () {
	var fixture = getFixture('greet-james.js');
	var Module = module.constructor;

	function transform(code) {
		return code.replace('James', 'Jim');
	}

	function requireHook(path) {
		var file = Module._resolveFilename(path, this);
		var code = fs.readFileSync(file, 'utf8');
		return requireFromString(transform(code), file, {require: requireHook});
	}

	var result = requireFromString(fixture.code, fixture.file, {require: requireHook});

	assert.equal(result(), 'Hello Jim');
});

it('transforms should be doable even as relative directory changes', function () {
	var fixture = getFixture('depth0.js');
	var Module = module.constructor;

	function transform(code) {
		return code.replace('FOO', 'BAR');
	}

	function requireHook(path) {
		var file = Module._resolveFilename(path, this);
		var code = fs.readFileSync(file, 'utf8');
		return requireFromString(transform(code), file, {require: requireHook});
	}

	var result = requireFromString(fixture.code, fixture.file, {require: requireHook});

	assert.equal(result, 'BAR - depth2');
});
