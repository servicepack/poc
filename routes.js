'use strict';

var Joi = require('joi');
const Redis = require('ioredis');

// var redisServer = "localhost";
var redisServer = 'redismicro.llmosf.0001.usw2.cache.amazonaws.com';

const redis = new Redis(6379, redisServer);

const serviceQueue = "serviceQueue";

let internals = {};


internals.postSr = function(request, reply) {
	console.log("Processing POST for service request");

	const serviceReq = {
		customerId: request.payload.customerId,
		serviceDate: request.payload.serviceDate,
		serviceProvider: request.payload.serviceProvider,
		productLoc: request.payload.productLoc
	};
	var strReq = JSON.stringify(serviceReq);
	redis.lpush(serviceReq.customerId, strReq);
	console.log("Request put in the queue for " + strReq);

	redis.publish('serviceQueue', strReq);

	reply(serviceReq).created('/api/sr/' + serviceReq.customerId);
}

module.exports = [

	{
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.',
				redirectToSlash: true,
				index: true
			}
		}
	},
	
	{
		method: 'GET',
		path: '/driver',
		handler: function (request, reply) {
			reply.file('driver.html');
		}
	},

	{
		method: 'POST',
		path: '/api/sr',
		handler: internals.postSr
	}
];