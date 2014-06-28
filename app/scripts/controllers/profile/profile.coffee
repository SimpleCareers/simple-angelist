'use strict'

Ctrl = require "../ctrl.coffee"

class ProfileCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous","$http"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous,@http) ->
    super @scope
    @scope.options = 
      containerSurface:
        size: [320,568]
        properties:
          overflow: "hidden"
          "z-index": 50
          "background-color": "white"
angular.module('simplecareersApp').controller('ProfileCtrl', ProfileCtrl)
