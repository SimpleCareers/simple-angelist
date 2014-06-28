'use strict'

Ctrl = require "../ctrl.coffee"
data = require "./data"
async = require "async"

class JobCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http"]
  
  filter: (card, cb)=>
    p = @http.get "#{@baseUrl}/startups/#{card.startup.id}/", cache:true
    p.success (startup)=>
      card.startup = startup
      card.location = startup.locations?[0]?.display_name
      card.screenshot = startup.screenshots?[0]?.thumb or startup.logo_url
      if card.description and card.startup.product_desc and startup.screenshots?[0]?.thumb
        cb? card
      else
        cb? null
    p.error =>
      cb? null
  process: =>
    @dataBuffer.splice(0,4).forEach (card)=>
      card.index = @index++
      @scope.cards.push card
  loadMore: =>
    if @loading or @done
      return
    if @dataBuffer.length < 20
      @loading = true
      @loadPage =>
        @process()
        @loading = false
      return
    @process()

  loadPage: (cb)=>
    p = @http.get "#{@baseUrl}/jobs?page=#{@page++}"
    # https://api.angel.co/1/tags/14781/jobs
    p.error (err)=>
    p.success (data)=>
      if data.page == data.last_page
        @done = true
      async.each data.jobs, (card,cb)=>
        @filter card, (card)=>
          if card
            @dataBuffer.push card
          cb()
      , =>
        cb?()
      , =>
        cb?()

  constructor: (@scope, @stateParams, @state, @timeout, @famous, @http) ->
    super @scope
    @scope.tutorialPipe = new @EventHandler()
    sync = new @GenericSync ["mouse","touch"]
    @scope.tutorialPipe.pipe sync
    
    @index = 0
    @page = 0
    @done = false
    @loading = false
    @dataBuffer = []
    # @scope.cards = []
    # @loadMore()
    
    @scope.cards = []
    data.forEach (card)=>
      card.index = @index++
      @scope.cards.push card
    
    # p = @http.get "#{@baseUrl}jobs?page=10"
    # # https://api.angel.co/1/tags/14781/jobs
    # p.success (data)=>
    #   data.jobs.forEach (card)=>
    #     card = @filter card
    #     if card
    #       @scope.cards.push card

    @scope.threshold = 100
    @scope.cardSpacing = 10
    @scope.curIdx = 0
    @scope.$on "next", =>
      @scope.curIdx++
      @scope.cards.shift()
      if @scope.cards[0]
        @scope.currentImage = @scope.cards[0].startup.screenshots[0]?.thumb
      if @scope.cards.length < 4
        @loadMore()
    
    # @pos = new @Transitionable([0, 0])
    # @rot = new @Transitionable([0, 0, 0])
    # sync = new @GenericSync(['mouse', 'touch'])
    # sync.on "start", @syncStart
    # sync.on "end", @syncEnd
    # sync.on "update", @syncUpdate
    # @scope.swipePipe = new @EventHandler()
    # @scope.swipePipe.pipe sync

  # syncUpdate: (e)=>
  #   if @startDrag
  #     @dragging = true
  #     newX = e.clientX-@startX
  #     newY = e.clientY-@startY
  #     @checkStatus newX
  #     @pos.set [newX,newY]
  #     @rot.set [0,0,(newX/@threshold)*3.14/16]
  # syncStart: (e)=>
  #   if @dragging
  #     return
  #   @startDrag = true
  #   @startX = e.clientX
  #   @startY = e.clientY
  # syncEnd: (e)=>
  #   @startDrag = false
  #   pos = @pos.get()
  #   @timeout =>
  #     @scope.status = ""
  #   , 150
  #   if @scope.status=="pass"
  #     @animatePass()
  #   else if @scope.status=="fav"
  #     @animateFav()
  #   else
  #     @animateNoChange()
  #
  # reset: =>
  #   @dragging = false
  #   @pos.set [0,0]
  #   @rot.set [0,0,0]
  # animateNoChange: =>
  #   @pos.set [0,0],{duration : 300,curve : 'inSine'},=>
  #     @reset()
  # animatePass: =>
  #   @pos.set [-@threshold,568*2],{duration : 300,curve : 'inSine'},=>
  #     @reset()
  #     @commitPass()
  # commitPass: =>
  #   @timeout =>
  #     @scope.cards.shift()
  #     @scope.currentImage = @scope.cards[0].startup.screenshots[0]?.thumb
  #     # @scope.cards.push id:Math.round(1000*Math.random())
  # animateFav: =>
  #   @pos.set [@threshold,568*2],{duration : 300,curve : 'inSine'},=>
  #     @reset()
  #     @commitFav()
  # commitFav: =>
  #   @timeout =>
  #     @scope.cards.shift()
  #     @scope.currentImage = @scope.cards[0].startup.screenshots[0]?.thumb
  #     # @scope.cards.push id:Math.round(1000*Math.random())
  # checkStatus: (newX)=>
  #   @timeout =>
  #     if newX < -@threshold/2
  #       @scope.status = "pass"
  #     else if newX > @threshold/2
  #       @scope.status = "fav"
  #     else
  #       @scope.status = "nochange"
    @scope.scrollPipe = @EventHandler()
    @tutorialTimeline = new @Transitionable(0)
  scrollYPosition: =>
    return @tutorialTimeline.get()
  closeTutorial: =>
    @tutorialTimeline.set 0, duration: 1000
    console.log "close"
  openTutorial: =>
    @tutorialTimeline.set 1, duration: 1000
    console.log "open"
    

  # getRotation: (idx)=>
  #   if idx != 0
  #     return [0,0,0]
  #   rot = @rot.get()
  #   return rot
  # scrollXPosition: =>
  #   pos = @pos.get()
  #   return Math.abs pos[0]/@threshold
  # getPosition: (idx)=>
  #   if idx==0 and @dragging
  #     pos = @pos.get()
  #     position = [pos[0],
  #                 pos[1]+@scope.cardSpacing*(idx),
  #                 -@scope.cardSpacing*(idx)]
  #   else
  #     if idx >= 2
  #       position = [0,@scope.cardSpacing*(2),-@scope.cardSpacing*(2)]
  #     else
  #       position = [0,@scope.cardSpacing*(idx),-@scope.cardSpacing*(idx)]
  #   return position

angular.module('simplecareersApp').controller('JobCtrl', JobCtrl)
