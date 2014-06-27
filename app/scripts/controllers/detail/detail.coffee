'use strict'

Ctrl = require "../ctrl.coffee"

class DetailCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous) ->
    super @scope
    @scope.cards = ["1","2","3","4"]
    @scope.detailScrollPipe = new @EventHandler()
    @scope.options =
      detailScrollView:
        paginated: false
        direction: 1
        speedLimit: 5
        margin: 10000

angular.module('simplecareersApp').controller('DetailCtrl', DetailCtrl)
