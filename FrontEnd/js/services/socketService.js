app.factory('socketService', ['$http', function($http){
  var Socket = {};
  var socketBase = 'http://localhost:3333';
  Socket.getBoardSocket = function(){
    var socket = io(socketBase);

    socket.on('status', function(message){
      console.log(message);
    });

    return socket;
  };
  return Socket;
}]);
