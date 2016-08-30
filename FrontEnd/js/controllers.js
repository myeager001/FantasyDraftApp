app.controller('LoginController', ['$scope', 'APIService', '$localStorage', '$state', function($scope, apiService, $localStorage, $state){
  $scope.loginCredentails = {};
  $scope.signupCredentails = {};
  $scope.login = function(){
    apiService.login($scope.loginCredentails).then(function(token){
      $localStorage.token = token;
      $state.go('home');
    });
  };
  $scope.signup = function(){
    apiService.signup($scope.signupCredentails).then(function(message){
      //set flash message
    });
  };
}]);

app.controller('DraftController', ['$scope', function($scope){
  $scope.title = 'Draft Day';
}]);

app.controller('HomeController', ['$scope', 'APIService', '$state', function($scope, apiService, $state){
  $scope.leagues={};
  apiService.getLeagues().then(function(leagues){
    $scope.leagues = leagues;
    $scope.$apply();
  });
  $scope.editDraft = function(id){
    $state.go('createDraft', {leagueId: id});
  };

}]);

app.controller('CreateLeagueController', ['$scope', 'APIService', '$state', function($scope, apiService, $state){
  $scope.info = {};
  $scope.info.teams = '10';
  $scope.info.rosterSize = '18';
  $scope.info.emails = [];
  $scope.info.emails.length =  parseInt($scope.info.teams) - 1;
  $scope.change = function(){
    $scope.info.emails.length =  parseInt($scope.info.teams) - 1;
  };
  $scope.createLeague = function(){
    apiService.createLeague($scope.info).then(function(league){
      $state.go('home');
    });
  };
}]);

app.controller('CreateDraftController', ['$scope', 'APIService', '$state', function($scope, apiService, $state){
  $scope.leagueId = $state.params.leagueId;
  $scope.users = [1,2,3,4,5]
}]);
