'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Routes = require('./routes');

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 8080 });

// server.connection({ host: 'localhost', port: 8080, labels: ['api'] });
// server.connection({ host: 'localhost', port: 8081, labels: ['push'] });

//inert provides new handler methods for serving static files and directories, 
//as well as decorating the reply interface with a file method for serving file based resources.
server.register(Inert, () => {});

server.register(require('./push'), () => {}); 

server.route(Routes);

server.start(() => {
  console.log(`Api server running at ${server.info.uri}`);
  console.log(`Socket io listening at ${server.info.uri}`);
});

module.exports = server;

function shutdown() {
  server.stop(() => console.log('shutdown successful'));
}

