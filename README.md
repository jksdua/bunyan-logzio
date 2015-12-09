bunyan-logzio
=============

A bunyan stream to send logs through to logzio.

## Configuration

When configuring bunyan-logzio as a stream for bunyan, you need to pass in a logzio logger.

For example:

```javascript
var logzioLogger = logzio.createLogger({
	protocol: 'https',
	token: config.get('logzio.token'),
	type: config.get('logzio.type.events')
});
```
> Please note: auth values are NOT required to simply send logs through to logzio.

## Usage

This is a basic usage example.

```javascript
var bunyan = require('bunyan'),
	Bunyan2Logzio = require('bunyan-logzio').Bunyan2Logzio,
	logger;

// create the logger
logger = bunyan.createLogger({
	name: 'logziolog',
	streams: [
		{
			type: 'raw',
			stream: new Bunyan2Logzio(logzioLogger)
		}
	]
});

logger.info({});
```

> Please note: you MUST define `type: 'raw'` as bunyan-logzio expects to recieve objects so that certain values can be changed as required by logzio (i.e. time to timestamp).

### Express logging

This is an example of using bunyan-logzio to store express.js request logs.

```javascript
var path = require('path'),
	bunyan = require('bunyan'),
	serializerRequest = require('../lib/serializer-request'),
	Bunyan2Logzio = require('bunyan-logzio').Bunyan2Logzio,
	request;

// create the logger
request = bunyan.createLogger({
	name: 'request',
	serializers: { req: bunyan.stdSerializers.req },
	streams: [
		{
			type: 'raw',
			stream: new Bunyan2Logzio(logzioLogger)
		}
	]
});

// export the middleware
module.exports = function () {

	return function (req, res, next) {

		// move on straight away
		next();

		// log this request
		request.info({
			req : req,
			production: process.env.NODE_ENV === 'production'
		});

	}

}
```

Changes
-------

[bunyanlogziohistory]: https://github.com/jksdua/bunyan-logzio/blob/master/History.md "bunyan-logzio history"
