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
  $scope.startDraft = function (draftId){
    console.log(draftId)
    $state.go('draftBoard', {draftId: draftId});
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
  apiService.getLeagueById($state.params.leagueId).then(function(league){
    $scope.users = league.users;
    $scope.$apply();
  });
  $scope.createDraft= function(){
    var draft = {};
    draft.year = $scope.year;
    draft.league_id = $scope.leagueId;
    var users = $scope.users.map(function(user){
      var userObj = {};
      userObj.draft_position = user.position;
      userObj.user_id = user.id;
      return userObj;
    });
    draft.users = users;
    apiService.createDraft(draft).then(function(draft){
      $state.go('home');
    });
  };
}]);

app.controller('DraftBoardController', ['$scope', '$stateParams', function($scope, $stateParams){
  $scope.draftId = $stateParams.draftId;
  console.log($scope.draftId)
}]);
