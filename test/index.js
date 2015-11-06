/* global it */

'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var requireFromString = require('../');

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
	var file = path.join(__dirname, '/fixture/module.js');
	var code = fs.readFileSync(file, 'utf8');
	var result = requireFromString(code, file);

	assert.ok(result);
	assert.ok(module === result.parent.parent);
});
