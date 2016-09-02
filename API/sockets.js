var Socket = require('socket.io');
var jwt = require('jsonwebtoken');
var knex = require('./db/knex');

module.exports=function(server){
  //create socket
  var io = Socket(server);
  io.on('connection', function(socket){
    setInterval(function(){
        socket.emit('status', 'you are connected!');
    }, 5000);
  });
};
