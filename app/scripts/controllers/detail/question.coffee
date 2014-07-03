'use strict'

Ctrl = require "../ctrl.coffee"

class QuestionCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous) ->
    super @scope
    @scope.options = 
      containerSurface:
        size: [undefined,undefined]
        properties:
          overflow: "hidden"
          "z-index": 750
          opacity: 0.1
    
angular.module('simplecareersApp').controller('QuestionCtrl', QuestionCtrl)
