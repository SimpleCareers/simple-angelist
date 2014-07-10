'use strict'

Ctrl = require "../ctrl.coffee"

class LoginCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "localStorageService"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @localStorageService) ->
    super @scope
    @scope.loginPipe = new @EventHandler()
    sync = new @GenericSync ["mouse","touch"]
    @scope.loginPipe.pipe sync
    @scope.options = 
      containerSurface:
        size: [320,568]
        properties:
          overflow: "hidden"
          "z-index": 50
    @scope.status = "normal"
    accessToken = @localStorageService.get "accessToken"
    sessionToken = @localStorageService.get "sessionToken"
    userId = @localStorageService.get "userId"
    if accessToken and sessionToken and userId
      @scope.getUser()
      @scope.goToPage(1)
    @scope.$on "pageChange", (e,from,to)=>
      if from==0 and to == 1
        accessToken = @localStorageService.get "accessToken"
        sessionToken = @localStorageService.get "sessionToken"
        userId = @localStorageService.get "userId"
        if not (accessToken and sessionToken and userId)
          @login()
  receiveMessage: (event) =>
    @scope.status = "normal"
    data = JSON.parse(event.data)
    if data.error
      @popup?.close()
      return
    @localStorageService.set "accessToken", data.accessToken
    @localStorageService.set "userId", data.userId
    @localStorageService.set "sessionToken", data.sessionToken
    
    @scope.getUser()
    # userId = @localStorageService.get("userId")
    # sessionToken = @localStorageService.get("sessionToken")
    # @Restangular.one("users",userId).get({},
    #   "X-Parse-Session-Token": sessionToken
    # ).then (user)=>
    #   @scope.parseUser = user
    # , =>
    #   console.log "error"
    
    @timeout.cancel(@checkpromise)
    @popup?.close()
    window.removeEventListener "message", @receiveMessage
    @scope.goToPage(1)
  checkToken: (cb)=>
    @popup?.postMessage "getToken", "http://simplecareers.parseapp.com"
    @timeout.cancel(@checkpromise)
    if not @popup.closed
      @checkpromise = @timeout @checkToken, 1000
  login: (cb)=>
    @scope.status = "logging"
    @popup = window.open "http://simplecareers.parseapp.com/authorize"
    @checkpromise = @timeout @checkToken, 1000
    window.addEventListener "message", @receiveMessage, false
    return

  clickTerm: =>
    window.open "http://www.simple.careers/terms"
    return

angular.module('simplecareersApp').controller('LoginCtrl', LoginCtrl)
