'use strict'

Ctrl = require "../ctrl.coffee"

class ApplyCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous) ->
    super @scope
    @scope.rows = ["1","1","1","1","1","1","1","1","1","1"]
    @scope.listPipe = new @EventHandler()
    @scope.options = 
      listScrollView:
        paginated: false
        direction: 1
        speedLimit: 5
        margin: 10000
    
angular.module('simplecareersApp').controller('ApplyCtrl', ApplyCtrl)
