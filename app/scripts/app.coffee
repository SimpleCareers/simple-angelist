'use strict'

require "./extensions/capitalize.coffee"

angular
  .module('simplecareersApp', [
    'ui.router',
    'restangular',
    'famous.angular',
    'LocalStorageModule'
  ])
  .config([
    '$locationProvider'
    'RestangularProvider'
  	'$stateProvider'
    '$urlRouterProvider'
  	($locationProvider, RestangularProvider, $stateProvider, $urlRouterProvider, config) ->
      $locationProvider.html5Mode(false);        
      RestangularProvider.setRestangularFields
        id: "objectId"
      RestangularProvider.setBaseUrl "https://api.parse.com/1/"
      RestangularProvider.setDefaultHeaders
        "X-Parse-Application-Id": "WFC9425UM5gV4wMLcWolWP45RlanlwaoMBT2H5Mm"
        "X-Parse-REST-API-Key": "cZ4iL7TOatIAZAzsrOe9n69HlI75jlGYyQHoAzj8"
      RestangularProvider.addResponseInterceptor (data, operation, what, url, response, deferred)=>
        if operation=="getList"
          return data.results
        return data
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
require "./controllers/detail/question.coffee"
require "./controllers/job/job.coffee"
require "./controllers/job/jobcard.coffee"
require "./controllers/job/tutorial.coffee"

angular.bootstrap(document, ['simplecareersApp']);