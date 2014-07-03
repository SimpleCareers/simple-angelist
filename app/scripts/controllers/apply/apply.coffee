'use strict'

Ctrl = require "../ctrl.coffee"
async = require "async"

class ApplyCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "localStorageService", "$http"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @storage, @http) ->
    super @scope
    
    @scope.listPipe = new @EventHandler()
    # @scope.listPipe.pipe @scope.enginePipe
    # @scope.listPipe.addListener "touchstart", =>
    #   # @scope.nextPage()
    #   # console.log "click"
    # @scope.listPipe.addListener "touchend", =>
    #   console.log "click"
    #   # @scope.nextPage()
    # @scope.listPipe.addListener "mouseup", =>
    #   # @scope.nextPage()
    #   # console.log "click"
    # @scope.listPipe.addListener "mousedown", =>
    #   console.log "click"
    #   # @scope.nextPage()
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
    # @scope.likes= []
    # data = require "./data"
    # @index = 0
    # console.log data
    # data.forEach (card)=>
    #   card.index = @index++
    #   @scope.likes.push card
    
    @scope.mode = "Like"
    @scope.$on "modeChange", (e,mode)=>
      @scope.mode = mode
      # if mode == "Like"
      #   @scope.list = @likes
      # else if mode == "Applied"
      #   @scope.list = @applies
      # else if mode == "Approved"
      #   @scope.list = @approves
    @scope.$on "pageChange", (e,from,to)=>
      if to>from and to == 3
        # console.log "getuser"
        @scope.getUser (err,user)=>
          # console.log "user.likes", user.likes
          @scope.user = user
        
        # @loadLikes()
        # @loadApplies()
        # @loadApproves()
        # console.log "loadlikes"
        # TODO: remove
    # @scope.likes=[]
    # @scope.applies=[]
    # @scope.approves=[]
  showDetail: (like)=>
    # console.log "showDetail",like
    @scope.goToPage(4,like)
  pageChange: =>
    # console.log "pageChange"
    

angular.module('simplecareersApp').controller('ApplyCtrl', ApplyCtrl)
