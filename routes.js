'use strict';

var ContactHandler = require('./handlers');

var hand = new ContactHandler();

module.exports = [

	// Servers static content to www/*.html pages
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
	
	// [POST ROUTE]
	{
		method: 'POST',
		path: '/api/contact',
		handler: hand.store
	},

	// [PUT ROUTE]
	{
		method: 'PUT',
		path: '/api/contact/{id}',
		handler: hand.update
	}


];