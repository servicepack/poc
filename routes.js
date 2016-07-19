'use strict';

var Joi = require('joi');
const Redis = require('ioredis');

//basic constructor - Connect to 127.0.0.1:6379
const redis = new Redis();
const queueKey = "serviceQueue";

let internals = {};


internals.postSr = function(request, reply) {
	console.log("Creating service request in queue - -");

	const serviceReq = {
		customerId: request.payload.customerId,
		serviceDate: request.payload.serviceDate,
		serviceProvider: request.payload.serviceProvider,
		productLoc: request.payload.productLoc
	};

	redis.lpush(serviceReq.customerId, JSON.stringify(serviceReq));
	reply(serviceReq).created('/api/sr/' + serviceReq.customerId);

}

module.exports = [
    
	
	{
		method: 'POST',
		path: '/api/sr',
		handler: internals.postSr
	}
];