'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');


// Start Hapi Server for REST APIs
var server = new Hapi.Server();
server.connection({ port: 8080 });


// Register inert for serving static files and directories, 
server.register(Inert, () => {});

// Register socket.io for realtime notifications.
server.register(require('./push'), () => {}); 

// Configure URL Resource mapings
server.route(require('./routes'));

server.start(() => {
  console.log(`Hapi server running at ${server.info.uri}`);
  console.log(`Socket io listening at ${server.info.uri}`);
});

module.exports = server;

function shutdown() {
  server.stop(() => console.log('shutdown successful'));
}

