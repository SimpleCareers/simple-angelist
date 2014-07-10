'use strict'

Ctrl = require "../ctrl.coffee"
Utils = require "../../extensions/utils.coffee"

class JobCardCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http", "localStorageService", "Restangular"]
  constructor: (@scope, @stateParams, @state, @timeout, @famous, @http, @localStorageService, @Restangular) ->
    super @scope
    
    @scope.card.pos = @pos = new @Transitionable([0, 0, 0])
    @rot = new @Transitionable([0, 0, 0])
    @sync = new @GenericSync(['mouse', 'touch'])
    
    @sync.on "start", @syncStart
    @sync.on "end", @syncEnd
    @sync.on "update", @syncUpdate
    @scope.swipePipe = new @EventHandler()
    @scope.swipePipe.pipe @sync
    
  syncUpdate: (e)=>
    if @startDrag
      @dragging = true
      newX = e.clientX-@startX
      newY = e.clientY-@startY
      @pos.set [newX,newY, 0]
      @rot.set [0,0,(newX/@scope.threshold)*3.14/16]
  syncStart: (e)=>
    if @dragging
      return
    @startDrag = true
    @startX = e.clientX
    @startY = e.clientY
  syncEnd: (e)=>
    if @scope.curIdx!=@scope.card.index
      @reset()
      @pos.set [0,0,0]
      @rot.set [0,0,0]
      return
    @reset()
    pos = @pos.get()
    halfThreshold = @scope.threshold/2
    if pos[0] < -halfThreshold
      @animatePass()
    else if pos[0] > halfThreshold 
      @animateFav()
    else
      @animateNoChange()
  reset: =>
    @dragging = false
    @startDrag = false
  animateNoChange: =>
    @pos.set [0,0,0],{duration : 300,curve : 'easeInOut'},=>
      @reset()
  animatePass: =>
    @pos.set [-320,568*2,0],{duration : 300,curve : 'easeInOut'},=>
      @reset()
      @commitPass()
  commitPass: =>
    @timeout =>
      @scope.$emit "next"
  animateFav: =>
    @pos.set [320,568*2,0],{duration : 300,curve : 'easeInOut'},=>
      @reset()
      @commitFav()
  commitFav: =>
    @timeout =>
      @scope.$emit "next"
      @scope.saveLike(@scope.card)
  getRotation: (idx,curIdx)=>
    if idx != curIdx
      return [0,0,0]
    return @rot.get()
  scrollPositionFav: =>
    pos = @pos.get()
    v = Utils.clamp pos[0]/@scope.threshold,0,1
    return v
  scrollPositionPass: =>
    pos = @pos.get()
    v = Utils.clamp pos[0]/@scope.threshold,-1,0
    return -v
  scrollXPosition: =>
    pos = @scope.cards[0].pos.get()
    v = Utils.clamp 1-Math.abs(pos[0]/@scope.threshold),0,1
    @scope.$emit "scroll", v
    return v
  getPosition: (idx,curIdx)=>
    diff = (idx-curIdx)
    switch diff
      when 0
        return @pos.get()
      when 1,2
        spc = @scope.cardSpacing*(diff-1)+@scope.cardSpacing*@scrollXPosition()
        return [0, spc,-spc]
      else
        spc = @scope.cardSpacing*2
        return [0, spc,-spc]

angular.module('simplecareersApp').controller('JobCardCtrl', JobCardCtrl)
