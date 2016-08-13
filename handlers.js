'use strict';

const Joi = require('joi');
const IoRedis = require('ioredis');
const Boom = require('boom');

const serviceQueue = "serviceQueue";

// For dev env is set to "localhost",  REDIS_SERVER=localhost node server.js
const redisServer = process.env.REDIS_SERVER || 'redismicro.llmosf.0001.usw2.cache.amazonaws.com';
const redisPubClient = new IoRedis(6379, redisServer);

// Constructor
function ContactHandler() {
    
};


// Todo: move to Redis   INCR contactId
/**
 * Sequence id generator for contacts.
 * @yield {[type]} [description]
 */
const idMaker = function*() {
	var index = 100100;
	while (true)
		yield index++;
}

var gen = idMaker();


// [POST] /api/contact
ContactHandler.prototype.store = function(request, reply) {
	
	// Generates contact id.
	var contactId = gen.next().value;
	
	// Extracts payload and convert to string.
	var contactStr = JSON.stringify(request.payload);
	console.log("Processing POST /api/contact " + contactId + contactStr);
	redisPubClient.lpush('contact:'+contactId, contactStr);
	redisPubClient.publish('serviceQueue', contactStr);
	reply(contactStr).created('/api/contact/' + contactId);
};

// [PUT /api/contact/{id}]
ContactHandler.prototype.update = function(request, reply) {
	console.log("Processing PUT /api/contact/");
};

module.exports = ContactHandler;