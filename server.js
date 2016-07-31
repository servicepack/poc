'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Routes = require('./routes');

var RedisServer = require('redis-server');

 

 // Start Redis Server.
var redisServerInstance = new RedisServer(6379);
redisServerInstance.open(function (error) {
 
  if (error) {
    throw new Error(error);
  }
 
  // The server is now up and running on port 6379, 
  // you can now create a client to connect to the 
  // server 
 
});

// Start Hapi Server for REST APIs
var server = new Hapi.Server();
server.connection({ port: 8080 });


// Register inert for serving static files and directories, 
server.register(Inert, () => {});

// Register socket.io for realtime notifications.
server.register(require('./push'), () => {}); 

// Configure URL Resource mapings
server.route(Routes);

server.start(() => {
  console.log(`Hapi server running at ${server.info.uri}`);
  console.log(`Socket io listening at ${server.info.uri}`);
});

module.exports = server;

function shutdown() {
  server.stop(() => console.log('shutdown successful'));
}

