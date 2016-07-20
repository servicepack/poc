var Handlers = require('./handlers');

exports.register = function (server, options, next) {

    var io = require('socket.io')(server.select('push').listener);
console.log("io listener created " + io);

io.sockets.on('connection', function (socket) {
  console.log("io socket on connection " + socket);
  //on connect send a welcome message
  socket.emit('message', { text : 'Welcome!' });

  //on subscription request joins specified room
  //later messages are broadcasted on the rooms
  socket.on('subscribe', function (data) {
    socket.join(data.channel);
  });
});

next();
    
};

exports.register.attributes = {
    name: 'hapi-push'
};