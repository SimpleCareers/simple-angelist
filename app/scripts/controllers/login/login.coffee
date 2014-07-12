'use strict'

Ctrl = require "../ctrl.coffee"

class LoginCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "localStorageService", "$http"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @localStorageService, @http) ->
    super @scope
    
    @scope.$emit "hideMenu"
    @scope.$emit "page", 0    
    
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
    if @scope.isLogin()
      @scope.getUser()
      @scope.goToPage(1)

    # @scope.$on "pageChange", (e,from,to)=>
    #   console.log "pagechange"
    #   if from==0 and to == 1
    #     accessToken = @localStorageService.get "accessToken"
    #     sessionToken = @localStorageService.get "sessionToken"
    #     userId = @localStorageService.get "userId"
    #     if not (accessToken and sessionToken and userId)
    #       @login()
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
    # @popup?.postMessage "getToken", "http://simplecareers.parseapp.com"
    # @timeout.cancel(@checkpromise)
    p = @http.get "http://simplecareers.parseapp.com/check?itoken=#{@itoken}"
    p.success (data)=>
      if not data or not data.access or not data.session or not data.user
        @checkpromise = @timeout @checkToken, 1000
        return
      @timeout.cancel(@checkpromise)
      @localStorageService.set "accessToken", data.access
      @localStorageService.set "userId", data.user
      @localStorageService.set "sessionToken", data.session
      @scope.getUser()
      @scope.goToPage(1)
      
    p.error =>
      @checkpromise = @timeout @checkToken, 1000
  uuid: =>
    S4 = ->
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1

    S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
  login: (cb)=>
    console.log "login"
    @scope.status = "logging"
    @itoken = @uuid()
    @popup = window.open "http://simplecareers.parseapp.com/authorize?itoken=#{@itoken}"
    @checkpromise = @timeout @checkToken, 1000
    # window.addEventListener "message", @receiveMessage, false
    return

  clickTerm: =>
    window.open "http://www.simple.careers/terms"
    return

angular.module('simplecareersApp').controller('LoginCtrl', LoginCtrl)
