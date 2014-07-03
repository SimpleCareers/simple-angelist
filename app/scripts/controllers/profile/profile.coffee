'use strict'

Ctrl = require "../ctrl.coffee"

class ProfileCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous","$http","localStorageService"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous,@http,@localStorageService) ->
    super @scope
    @scope.profilePipe = new @EventHandler
    @scope.profilePipe.pipe @scope.enginePipe
    @scope.options = 
      profileScrollView:
        paginated: false
        direction: 1
        speedLimit: 10
        margin: 10000
      containerSurface:
        size: [undefined,undefined]
        properties:
          overflow: "hidden"
          "z-index": 150
    @scope.status = "notavailable"  
    @loadUser()
    @scope.$on "pageChange", (e,from,to)=>
      if to == 1
        if not @scope.user
          @loadUser()
      if to == 0
        @signOut()
  signOut:=>
    @scope.status = "notavailable"
    @localStorageService.clearAll()
    @scope.user = undefined
    @scope.goToPage(0)
  loadUser:=>
    @scope.getUser()
    accessToken = @localStorageService.get "accessToken"
    if not accessToken
      return
    @scope.status = "loading"
    p = @http.get "#{@baseUrl}/myangel",
      headers:
        Authorization: "Bearer #{accessToken}"
    , cache: true
    # https://api.angel.co/1/tags/14781/jobs
    p.success (data)=>
      @scope.user = data
      @scope.status = "loaded"
    p.error (err)=>
      @scope.status = "notavailable"
    
angular.module('simplecareersApp').controller('ProfileCtrl', ProfileCtrl)
