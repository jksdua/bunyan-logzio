'use strict';

var assert = require('assert');

function Bunyan2Logzio (logzioLogger, options) {

	assert(logzioLogger, 'Missing logzio logger');
	this.logzioLogger = logzioLogger;

	this.options = options = options || {};
	// define the buffer count, unless one has already been defined
	this.buffer = options.buffer || 1;
	this._buffer = [];
}

Bunyan2Logzio.prototype.write = function(rec) {

	if (typeof rec !== 'object' && !Array.isArray(rec)) {
		throw new Error('bunyan-logzio requires a raw stream. Please define the type as raw when setting up the bunyan stream.');
	}

	// write to our array buffer
	if (Array.isArray(rec)) {
		this._buffer = this._buffer.concat(rec);
	} else {
		this._buffer.push(rec);
	}

	// check the buffer, we may or may not need to send to logzio
	this.checkBuffer();

};

Bunyan2Logzio.prototype.checkBuffer = function () {

	if (this._buffer.length < this.buffer) {
		return;
	}

	// duplicate the array, because it could be modified before our HTTP call succeeds
	var content = this._buffer.slice();
	this._buffer = [];

	// log multiple (or single) requests with logzio
	for (var i = 0; i < content.length; i++) {
		this.logzioLogger.log(content[i]);
	}

};

module.exports.Bunyan2Logzio = Bunyan2Logzio;
