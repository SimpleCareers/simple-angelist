'use strict'

angular
  .module('simplecareersApp', [
    'ui.router',
    'restangular',
    'famous.angular'
  ])
  .config([
    '$locationProvider'
    'RestangularProvider'
  	'$stateProvider'
    '$urlRouterProvider'
  	($locationProvider, RestangularProvider, $stateProvider, $urlRouterProvider, config) ->
      $locationProvider.html5Mode(false);        
      RestangularProvider.setRestangularFields
        id: "_id"
      RestangularProvider.setBaseUrl "/api/data/"
        
      $urlRouterProvider.otherwise "/app"
    
      $stateProvider
      .state('app',
        url: "/app",
        views: 
          {
            'main': {
              templateUrl: "/views/app.html",
              controller: "AppCtrl"
            }
          }
      )

  ])

require "./controllers/app.coffee"
require "./controllers/login/login.coffee"
require "./controllers/profile/profile.coffee"
require "./controllers/apply/apply.coffee"
require "./controllers/detail/detail.coffee"
require "./controllers/job/job.coffee"

angular.bootstrap(document, ['simplecareersApp']);