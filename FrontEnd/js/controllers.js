app.controller('LoginController', ['$scope', function($scope){
  $scope.isLogin = true;
  $scope.login = function(){
    console.log('logging in');
  };
  $scope.signup = function(){
    console.log('logging in');
  };
  console.log($scope.isLogin);
}]);

app.controller('DraftController', ['$scope', function($scope){
  $scope.title = 'Draft Day';
}]);
