'use strict'

Ctrl = require "../ctrl.coffee"

class TutorialCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http"]
  constructor: (@scope, @stateParams, @state, @timeout, @famous, @http) ->
    super @scope
    @scope.tutorialPipe = new @EventHandler()
    sync = new @GenericSync ["mouse","touch"]
    @scope.tutorialPipe.pipe sync
    
angular.module('simplecareersApp').controller('TutorialCtrl', TutorialCtrl)
