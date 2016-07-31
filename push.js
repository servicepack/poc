var redis = require("redis");

//var redisServer = "localhost";
var redisServer = 'myredis-001.llmosf.0001.usw2.cache.amazonaws.com';

var redisClient = redis.createClient(6379, redisServer, {no_ready_check: true});

exports.register = function (server, options, next) {

var io = require('socket.io')(server.listener);
console.log("Socket io listener created" );

io.sockets.on('connection', function (socket) {
  console.log("io socket on connection " + socket);
  //on connect send a welcome message
  socket.emit('message', { text : 'Welcome!' });

  //on subscription request joins specified room
  //later messages are broadcasted on the rooms
  socket.on('subscribe', function (data) {
  	console.log("socket on subscribe " + data.channel);
    socket.join(data.channel);
  });
});

/**
 * subscribe to redis channel when client in ready
 */
redisClient.on('ready', function() {
   console.log("redisClient on ready ");	
  redisClient.subscribe('serviceQueue');
});

/**
 * wait for messages from redis channel, on message
 * send updates on the rooms named after channels. 
 * 
 * This sends updates to users. 
 */
redisClient.on("message", function(channel, message){
	console.log("redisClient on message " + message);
    var resp = {'text': message, 'channel':channel}
    io.sockets.in(channel).emit('message', resp);
});

next();
    
};

exports.redisClient = redisClient;
exports.register.attributes = {
    name: 'hapi-push'
};