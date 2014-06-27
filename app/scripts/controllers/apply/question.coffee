'use strict'

Ctrl = require "../ctrl.coffee"

class QuestionCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous) ->
    super @scope
    @scope.rows = ["1","1","1","1","1"]
angular.module('simplecareersApp').controller('QuestionCtrl', QuestionCtrl)
