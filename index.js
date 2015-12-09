'use strict';

var assert = require('assert');
var stream = require('stream');

function LogzioStream(logzioLogger, options) {
	stream.Writable.call(this, options);

	assert(logzioLogger, 'Missing logzio logger');
	this.logzioLogger = logzioLogger;
}

LogzioStream.prototype = Object.create(stream.Writable.prototype);

LogzioStream.prototype.write = function(rec) {

	if (typeof rec !== 'object' && !Array.isArray(rec)) {
		throw new Error('bunyan-logzio requires a raw stream. Please define the type as raw when setting up the bunyan stream.');
	}

	this.logzioLogger.log(rec);

};

function Bunyan2Logzio (logzioLogger, options) {
	this.type = 'raw';
	this.stream = new LogzioStream(logzioLogger, options && options.stream);
}

module.exports.LogzioStream = LogzioStream;
module.exports.Bunyan2Logzio = Bunyan2Logzio;
