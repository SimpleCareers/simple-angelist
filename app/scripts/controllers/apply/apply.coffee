'use strict'

Ctrl = require "../ctrl.coffee"

class ApplyCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous) ->
    super @scope
    @scope.rows = ["1","1","1","1","1","1","1","1","1","1"]
    @scope.listPipeLike = new @EventHandler()
    @scope.listPipeApplied = new @EventHandler()
    @scope.listPipeApproved = new @EventHandler()
    @scope.options = 
      applyScrollView:
        paginated: true
        direction: 0
        speedLimit: 10
        margin: 10000
      listScrollView:
        paginated: false
        direction: 1
        speedLimit: 10
        margin: 10000
      containerSurface:
        size: [320,568]
        properties:
          overflow: "hidden"
          "z-index": 450
          "background-color": "white"
    
angular.module('simplecareersApp').controller('ApplyCtrl', ApplyCtrl)
