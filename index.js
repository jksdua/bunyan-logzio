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

	this.logzioLogger.log(mutateToLogzioFormat(rec));
};

function Bunyan2Logzio (logzioLogger, options) {
	this.type = 'raw';
	this.stream = new LogzioStream(logzioLogger, options && options.stream);
}

function mutateToLogzioFormat(rec) {
	if (rec.msg) {
		rec = JSON.parse(JSON.stringify(rec));

		rec.message = rec.msg;
		rec.Level = mapLevelToName(rec.level);

		delete rec.msg;
		delete rec.level;
	}

	return rec;
}

// Levels
var TRACE = 10;
var DEBUG = 20;
var INFO = 30;
var WARN = 40;
var ERROR = 50;
var FATAL = 60;

function mapLevelToName(level) {
	switch (level) {
		case TRACE:
			return 'Trace';
		case DEBUG:
			return 'Debug';
		case INFO:
			return 'Info';
		case WARN:
			return 'Warn';
		case ERROR:
			return 'Error';
		case FATAL:
			return 'fatal';
	}
}

module.exports.LogzioStream = LogzioStream;
module.exports.Bunyan2Logzio = Bunyan2Logzio;