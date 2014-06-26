'use strict'

Ctrl = require "./ctrl.coffee"

class AppCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$window"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @window) ->
    super @scope
    @scope.enginePipe = new @EventHandler()
    @Engine.pipe(@scope.enginePipe)
    @scope.options =
      mainScrollView:
        paginated: true
        direction: 1
        speedLimit: 5
        margin: 10000
  login: (cb)=>
    popupWindow = @window.open "http://simplecareers.parseapp.com/authorize"
    # @Restangular.setDefaultHeaders
    #   "Authorization": "Bearer #{localStorage.getItem "token"}"
    return
angular.module('simplecareersApp').controller('AppCtrl', AppCtrl)
