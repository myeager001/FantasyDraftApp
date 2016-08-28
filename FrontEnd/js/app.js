var app = angular.module('DraftApp', ['ui.router', 'ngStorage', 'mm.foundation']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

        // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('draftBoard', {
          url: '/draft',
          templateUrl: 'templates/draft.html',
          controller: 'DraftController',
        })
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'HomeController',
        })
        .state('createLeague', {
          url: '/createLeague',
          templateUrl: 'templates/createLeague.html',
          controller: 'CreateLeagueController'
        })
        .state('login', {
          url: '/',
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
       return {
           'request': function (config) {
               config.headers = config.headers || {};
               if ($localStorage.token) {
                   config.headers.token = $localStorage.token;
               }
               return config;
           },
           'responseError': function (response) {
               if (response.status === 401 || response.status === 403) {
                   $location.path('/');
               }
               return $q.reject(response);
           }
       };
    }]);
}]);
