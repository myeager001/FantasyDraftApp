app.factory('socketService', ['$http', function($http){
  var Socket = {};
  var socketBase = 'http://localhost:3333';
  Socket.getConnection = function(){
    var socket = io(socketBase)
    return socket
  }
  return Socket
}]);
