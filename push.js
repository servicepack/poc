var redis = require("redis");

// var redisServer = "localhost";
var redisServer = process.env.REDIS_SERVER || 'redismicro.llmosf.0001.usw2.cache.amazonaws.com';
var redisClient = redis.createClient(6379, redisServer, {no_ready_check: true});

exports.register = function (server, options, next) {

var io = require('socket.io')(server.listener);

io.sockets.on('connection', function (socket) {
  //on connect send a welcome message
  socket.emit('message', 'Welcome! Serve with Smile !!');

  //on subscription request joins specified room
  //later messages are broadcasted on the rooms
  socket.on('subscribe', function (data) {
    socket.join(data.channel);
  });
});

/**
 * subscribe to redis channel when client in ready
 */
redisClient.on('ready', function() {
  redisClient.subscribe('serviceQueue');
});

/**
 * wait for messages from redis channel, on message
 * send updates on the rooms named after channels. 
 * 
 * This sends updates to users. 
 */
redisClient.on("message", function(channel, message){
    // var resp = {'text': message, 'channel':channel}
    io.sockets.in(channel).emit('message', message);
});

next();
    
};

exports.redisClient = redisClient;
exports.register.attributes = {
    name: 'hapi-push'
};