/* global it */

'use strict';

var assert = require('assert');
var requireFromString = require('./');

it('should accept only string as code', function () {
	assert.throws(function () {
		requireFromString();
	}, /code must be a string, not undefined/);
});

it('should require from string', function () {
	assert.strictEqual(requireFromString('module.exports = 1;'), 1);
});

it('should accept filename', function () {
	assert.throws(function() {
		requireFromString('module.exports = ', 'bug.js');
	}, /bug\.js|Unexpected token }/);
});
