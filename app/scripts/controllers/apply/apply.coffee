'use strict'

Ctrl = require "../ctrl.coffee"

class ApplyCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous) ->
    super @scope
    
angular.module('simplecareersApp').controller('ApplyCtrl', ApplyCtrl)
