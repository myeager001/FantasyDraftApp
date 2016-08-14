var app = angular.module('DraftApp', ['ui.router']);

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

            .state('login', {
                url: '/',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            });
}]);
