app.factory('APIService', ['$http', function($http){
  var User = {};
  var apiBase = 'http://localhost:3333';
  User.getLeagues = function(){
    return new Promise(function(resolve, reject){
      // if(User.leagues){
      //   resolve(User.leauges);
      // }
      // else{
        $http.get(apiBase + '/leagues').then(function(leagues){
          leagues = leagues.data.userLeagues.leagues;
          User.leagues = leagues;
          resolve(User.leagues);
        }).catch(function(error){
          reject(error);
        });
      // }
    });
  };
  User.getLeagueById = function(id){
    return new Promise(function(resolve, reject){
      $http.get(apiBase + '/leagues/' + id).then(function(league){
        resolve(league.data.league)
      }).catch(function(error){
        reject(error);
      });
    })
  }
  User.createDraft = function(draft){
    return new Promise(function(resolve, reject){
      $http.post(apiBase + '/drafts', draft).then(function(draft){
        resolve(draft.data.draft);
      }).catch(function(error){
        reject(error);
      });
    });
  }
  User.createLeague = function(information){
    return new Promise(function(resolve, reject){
      $http.post(apiBase + '/leagues', information).then(function(league){
          league = league.data.league;
          resolve(league);
      }).catch(function(error){
        reject(error);
      });
    });
  };
  User.login = function(credentials){
    return new Promise(function(resolve, reject){
      $http.post(apiBase + '/auth/token', credentials).then(function(token){
        console.log('token', token);
        token = token.data.token;
        resolve(token);
      }).catch(function(error){
        reject(error);
      });
    });
  };
  User.signup = function(credentials){
    return new Promise(function(resolve, reject){
      $http.post(apiBase + '/auth/signup', credentials).then(function(message){
        console.log('message', message);
        message = message.data.data;
        resolve(message);
      }).catch(function(error){
        reject(error);
      });
    });
  };
  return User;
}]);
