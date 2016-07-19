'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Routes = require('./routes');


var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 8080 });

server.register(Inert, () => {});


server.route(Routes);

server.start(() => {
  console.log(`running at ${server.info.uri}`);
});

module.exports = server;

function shutdown() {
  server.stop(() => console.log('shutdown successful'));
}

