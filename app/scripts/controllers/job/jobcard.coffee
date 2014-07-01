'use strict'

Ctrl = require "../ctrl.coffee"

class JobCardCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http", "localStorageService", "Restangular"]
  constructor: (@scope, @stateParams, @state, @timeout, @famous, @http, @localStorageService, @Restangular) ->
    super @scope
    
    @scope.card.pos = @pos = new @Transitionable([0, 0, 0])
    @rot = new @Transitionable([0, 0, 0])
    sync = new @GenericSync(['mouse', 'touch'])
    
    sync.on "start", @syncStart
    sync.on "end", @syncEnd
    sync.on "update", @syncUpdate
    @scope.swipePipe = new @EventHandler()
    @scope.swipePipe.pipe sync

  syncUpdate: (e)=>
    if @startDrag
      @dragging = true
      newX = e.clientX-@startX
      newY = e.clientY-@startY
      @checkStatus newX
      @pos.set [newX,newY, 0]
      @rot.set [0,0,(newX/@scope.threshold)*3.14/16]
  syncStart: (e)=>
    if @dragging
      return
    @startDrag = true
    @startX = e.clientX
    @startY = e.clientY
  syncEnd: (e)=>
    @startDrag = false
    pos = @pos.get()    
    @timeout =>
      @scope.status = "nochange"
    , 150
    if @scope.status=="pass"
      @animatePass()
    else if @scope.status=="fav"
      @animateFav()
    else
      @animateNoChange()
    
  reset: =>
    @dragging = false
    # @pos.set [0,0,0]
    # @rot.set [0,0,0]
  animateNoChange: =>
    @pos.set [0,0,0],{duration : 300,curve : 'inSine'},=>
      @reset()
  animatePass: =>
    @pos.set [-320,568*2,0],{duration : 300,curve : 'inSine'},=>
      @reset()
      @commitPass()
  saveLike: (card)=>
    console.log "save"
    sessionToken = @localStorageService.get "sessionToken"
    userId = @localStorageService.get "userId"
    if sessionToken and userId
      user = @Restangular.one("users",userId)
      user.likes =
        "__op":"AddUnique"
        "objects":[card.id]
      user.put({},
        "X-Parse-Session-Token": sessionToken
      ).then (user)=>
        console.log "liked! #{card.id}"
      , =>
        console.log "error"
  commitPass: =>
    @timeout =>
      @scope.$emit "next"
      
      # @scope.currentImage = @scope.cards[0].startup.screenshots[0]?.thumb
      # @scope.cards.push id:Math.round(1000*Math.random())
  animateFav: =>
    @pos.set [320,568*2,0],{duration : 300,curve : 'inSine'},=>
      @reset()
      @commitFav()
  commitFav: =>
    @timeout =>
      @scope.$emit "next"
      @saveLike(@scope.card)
      
      # @scope.currentImage = @scope.cards[0].startup.screenshots[0]?.thumb
      # @scope.cards.push id:Math.round(1000*Math.random())
  checkStatus: (newX)=>
    @timeout =>
      if newX < -@scope.threshold/2
        @scope.status = "pass"
      else if newX > @scope.threshold/2
        @scope.status = "fav"
      else
        @scope.status = "nochange"
  clickHelp: =>
    @pass()
  getRotation: (idx,curIdx)=>
    if idx != curIdx
      return [0,0,0]
    rot = @rot.get()
    return rot
  scrollXPosition: =>
    pos = @scope.cards[0].pos.get()
    v = Math.max(0,Math.min(1-Math.abs(pos[0]/@scope.threshold),1))
    @scope.$emit "scroll", v
    return v
  getPosition: (idx,curIdx)=>
    pos = @pos.get()
    position = pos
    if idx>curIdx
      diff = (idx-curIdx)
      if diff<=2
        position = [0,@scope.cardSpacing*(diff-1)+@scope.cardSpacing*@scrollXPosition(),-@scope.cardSpacing*(diff-1)-@scope.cardSpacing*@scrollXPosition()]
      else
        position = [0, @scope.cardSpacing*2,-@scope.cardSpacing*2]
    return position

angular.module('simplecareersApp').controller('JobCardCtrl', JobCardCtrl)
