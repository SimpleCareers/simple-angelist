'use strict'

Ctrl = require "../ctrl.coffee"

class ProfileCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous","$http","localStorageService"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous,@http,@localStorageService) ->
    super @scope

    @scope.$emit "showMenu"
    @scope.$emit "page", 1
    
    if not @scope.isLogin()
      @scope.changePageTo 0
      return

    @scope.profilePipe = new @EventHandler
    # @scope.profilePipe.pipe @scope.enginePipe
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
    @scope.status = "loading"
    @scope.loadAngelUser (err,user)=>
      @scope.status = "loaded"
      if not user
        @scope.status = "notavailable"  
        return
      @scope.user = user
    # @scope.$on "pageChange", (e,from,to)=>
    #   if to == 1
    #     if not @scope.user
    #       @loadUser()
      # if to == 0
      #   @signOut()
    # @scope.inTransitionFunction = (cb)=>
    #   console.log "in"
    # @scope.outTransitionFunction = (cb)=>
    #   console.log "out"

    
angular.module('simplecareersApp').controller('ProfileCtrl', ProfileCtrl)
