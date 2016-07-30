'use strict';

var Joi = require('joi');
const Redis = require('ioredis');

//basic constructor - Connect to 127.0.0.1:6379
const redis = new Redis();
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

	redis.publish('serviceQueue', 'Service request ' + strReq);

	reply(serviceReq).created('/api/sr/' + serviceReq.customerId);
}

module.exports = [

	{
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			reply.file('index.html');
		}
	},

	{
		method: 'POST',
		path: '/api/sr',
		handler: internals.postSr
	}
];