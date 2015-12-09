var should = require('should'),
	bunyan = require('bunyan'),
	logzio = require('logzio-nodejs'),
	Bunyan2Logzio = require('../').Bunyan2Logzio,
	helpers = require('./helpers'),
	config = helpers.loadConfig();

var logzioLogger = logzio.createLogger(config);

describe('bunyan-logzio', function () {

	it('should throw if logger isn\'t provided', function () {

		(function () {
			new Bunyan2Logzio();
		}).should.throw();

	});

	it('should throw if not used as a raw stream', function () {

		var logger = new Bunyan2Logzio(logzioLogger);

		(function () {
			logger.write(JSON.stringify({}))
		}).should.throw();

	});

	it('should send logs', function (done) {

		// give time to flush logs to remote server for manual checking
		this.timeout(5010);
		setTimeout(done, 5000);

		var bunyanLogzio = new Bunyan2Logzio(logzioLogger);
		var logger = bunyan.createLogger({
			name: 'test',
			streams: [bunyanLogzio]
		});

		var log = { time: new Date() };
		logger.info(log);

	});

});
