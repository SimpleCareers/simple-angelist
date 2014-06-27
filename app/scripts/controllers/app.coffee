'use strict'

Ctrl = require "./ctrl.coffee"

class AppCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$window", "$http"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @window, @http) ->
    super @scope
    @scope.enginePipe = new @EventHandler()
    @Engine.pipe(@scope.enginePipe)
    @scope.options =
      mainScrollView:
        paginated: true
        direction: 1
        speedLimit: 5
        margin: 10000
  receiveMessage: (event) =>
    data = JSON.parse(event.data)
    window.accessToken = accessToken = data.accessToken
    window.sessionToken = sessionToken = data.sessionToken
    @timeout.cancel(@checkpromise)
    @popup?.close()
    @http.defaults.headers.common.Authorization = "Bearer #{accessToken}"
    e = =>
      p = @http.get "#{@baseUrl}/me"
      # https://api.angel.co/1/tags/14781/jobs
      p.success (data)=>
        console.log data
      p.error (err)=>
    e()
    # @Restangular.setDefaultHeaders
    #   "Authorization": "Bearer #{accessToken}"
    window.removeEventListener "message", @receiveMessage
  checkToken: (cb)=>
    @popup?.postMessage "getToken", "http://simplecareers.parseapp.com"
    @timeout.cancel(@checkpromise)
    if not @popup.closed
      @checkpromise = @timeout @checkToken, 1000
  login: (cb)=>
    @popup = window.open "http://simplecareers.parseapp.com/authorize"
    @checkpromise = @timeout @checkToken, 1000
    window.addEventListener "message", @receiveMessage, false
    return
angular.module('simplecareersApp').controller('AppCtrl', AppCtrl)
