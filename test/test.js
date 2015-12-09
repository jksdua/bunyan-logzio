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

	describe('when using the buffer', function () {

		var logger,
			loggerBufferFive,
			log;

		before(function () {

			logger = new Bunyan2Logzio(logzioLogger);

			loggerBufferFive = new Bunyan2Logzio(logzioLogger, { buffer: 5 });

			log = {
				time: new Date()
			};

		});

		it('should default to sending logs upon every write', function () {

			logger._buffer.should.have.lengthOf(0);
			logger.write(log);
			logger._buffer.should.have.lengthOf(0);

		});

		it('should allow buffering', function () {

			loggerBufferFive._buffer.should.have.lengthOf(0);

			loggerBufferFive.write(log);
			loggerBufferFive._buffer.should.have.lengthOf(1);

			loggerBufferFive.write(log);
			loggerBufferFive._buffer.should.have.lengthOf(2);

			loggerBufferFive.write(log);
			loggerBufferFive._buffer.should.have.lengthOf(3);

			loggerBufferFive.write(log);
			loggerBufferFive._buffer.should.have.lengthOf(4);

			loggerBufferFive.write(log);
			loggerBufferFive._buffer.should.have.lengthOf(0);

		})

	})

});
