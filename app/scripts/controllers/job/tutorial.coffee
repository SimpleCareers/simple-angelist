'use strict'

Ctrl = require "../ctrl.coffee"

class TutorialCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http"]
  constructor: (@scope, @stateParams, @state, @timeout, @famous, @http) ->
    super @scope
    
angular.module('simplecareersApp').controller('TutorialCtrl', TutorialCtrl)
