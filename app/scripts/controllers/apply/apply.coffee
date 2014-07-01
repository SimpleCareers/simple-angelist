'use strict'

Ctrl = require "../ctrl.coffee"

class ApplyCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "localStorageService", "$http"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @storage, @http) ->
    super @scope
    
    @scope.listPipe = new @EventHandler()
    @scope.listPipe.pipe @scope.enginePipe

    @scope.options = 
      applyScrollView:
        paginated: true
      listScrollView:
        paginated: false
      containerSurface:
        size: [320,568]
        properties:
          overflow: "hidden"
          "z-index": 450
          "background-color": "white"
    # @scope.likes = [0..20]
    # @scope.applies = [0..20]
    # @scope.approves = [0..20]
    @scope.likes= []
    data = require "./data"
    @index = 0
    console.log data
    data.forEach (card)=>
      card.index = @index++
      card.startup = 
        name: "Simple.Careers"
      @scope.likes.push card  

    @scope.$on "pageChange", (e,from,to)=>
      console.log from,to
      if to == 3
        # @loadLikes()
        console.log "loadlikes"
        # TODO: remove
  pageChange: =>
    console.log(arguments...);
  loadLikes: =>
    userId = @storage.get "userId"
    sessionToken = @storage.get "sessionToken"
    user = @Restangular.one("users",userId)
    user.get({},
      "X-Parse-Session-Token": sessionToken
    ).then (user)=>
      if (not user) or (not user.likes)
        return
      @scope.likes = []
      for likeId in user.likes
        p = @http.get "#{@baseUrl}/angel/jobs/#{likeId}"
        p.error (err)=>
        p.success (data)=>
          @scope.likes.push data
          console.log @scope.likes      
    
  saveApplied: (card)=>
    console.log "save"
    sessionToken = @localStorageService.get "sessionToken"
    userId = @localStorageService.get "userId"
    if sessionToken and userId
      user = @Restangular.one("users",userId)
      user.applies =
        "__op":"AddUnique"
        "objects":[card.id]
      user.put({},
        "X-Parse-Session-Token": sessionToken
      ).then (user)=>
        console.log "applied! #{card.id}"
      , =>
        console.log "error"
    
angular.module('simplecareersApp').controller('ApplyCtrl', ApplyCtrl)
