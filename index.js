'use strict';

var assert = require('assert');

function Bunyan2Logzio (logzioLogger) {
	assert(logzioLogger, 'Missing logzio logger');
	this.logzioLogger = logzioLogger;
}

Bunyan2Logzio.prototype.write = function(rec) {

	if (typeof rec !== 'object' && !Array.isArray(rec)) {
		throw new Error('bunyan-logzio requires a raw stream. Please define the type as raw when setting up the bunyan stream.');
	}

	// write to our array buffer
	if (Array.isArray(rec)) {
		rec.forEach(this.logzioLogger.log, this.logzioLogger);
	} else {
		this.logzioLogger.log(rec);
	}

};

module.exports.Bunyan2Logzio = Bunyan2Logzio;
