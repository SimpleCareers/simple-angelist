'use strict'

Ctrl = require "../ctrl.coffee"

class LoginCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous) ->
    super @scope
    @scope.loginPipe = new @EventHandler()
    sync = new @GenericSync ["mouse","touch"]
    @scope.loginPipe.pipe sync
    @scope.options = 
      containerSurface:
        size: [320,568]
        properties:
          overflow: "hidden"
          "z-index": 50
          "background-color": "white"
angular.module('simplecareersApp').controller('LoginCtrl', LoginCtrl)
