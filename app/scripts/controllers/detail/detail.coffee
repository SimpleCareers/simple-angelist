'use strict'

Ctrl = require "../ctrl.coffee"
async = require "async"

class DetailCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "localStorageService", "$http", "localStorageService"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @storage, @http, @localStorageService) ->
    super @scope
    
    @scope.$emit "showMenu"
    @scope.$emit "page", 3

    if not @scope.isLogin()
      @scope.changePageTo 0
      return
        
    @scope.listPipe = new @EventHandler()

    @scope.mode = "Like"
    
    @scope.likes = []
    @scope.approves = []
    @scope.applies = []
    
    @scope.$on "modeChange", (e,mode)=>
      @scope.mode = mode
        
    @scope.getUser (err,user)=>
      @loadLikes(user.likes.reverse())

      accessToken = @localStorageService.get "accessToken"
      p = @http.get "#{@baseUrl}/myangel/talent/startups",
        headers:
          Authorization: "Bearer #{accessToken}"
      , cache: true
      p.success (data)=>
        @scope.approvesBuffer = data.matched
        @loadApplies(user.applies.reverse())
      p.error (err)=>
        @loadApplies(user.applies.reverse())
        
  addApprove: (card)=>
    if card.startup.id in @scope.approvesBuffer
      @scope.approves.push card
  loadApplies: (applies)=>
    @scope.appliesBuffer = applies
    async.map @scope.appliesBuffer, (id,cb)=>
      @scope.loadCard id, (err,card)=>
        (cb();return) if err or not card
        @addApprove(card)
        cb(null,card)
    ,(err,cards)=>
      cards.forEach (card)=>
        @scope.applies.push(card) if card
  loadLikes: (likes)=>
    @scope.likesBuffer = likes
    async.map @scope.likesBuffer, (id,cb)=>
      @scope.loadCard id, (err,card)=>
        (cb();return) if err or not card
        cb(null,card)
    ,(err,cards)=>
      cards.forEach (card)=>
        @scope.likes.push(card) if card
  showDetail: (like)=>
    # console.log "showDetail",like
    # @scope.goToPage(4,like)
    @scope.card = like
  hideDetail: =>
    @scope.card = undefined
  pageChange: =>
    # console.log "pageChange"
    

angular.module('simplecareersApp').controller('DetailCtrl', DetailCtrl)
