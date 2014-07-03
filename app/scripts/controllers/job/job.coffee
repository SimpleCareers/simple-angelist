'use strict'

Ctrl = require "../ctrl.coffee"
async = require "async"
class JobCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http"]
  
  filter: (card, cb)=>
    if card and card.description and card.startup and card.startup.product_desc and card.startup.screenshots?[0]?.thumb
      cb? card
    else
      cb? null
  process: (n)=>
    if n <= 0
      return
    @dataBuffer.splice(0,n).forEach (card)=>
      card.index = @index++
      @scope.cards.push card
      @loadBackground()
      
  loadMore: =>
    if @loading or @done
      return
    @process(4-@scope.cards.length)
    if @dataBuffer.length < 20
      @loading = true
      @loadPage =>
        @process(4-@scope.cards.length)
        @loading = false
      return

  loadPage: (cb)=>
    if @dataBuffer.length > 50
      cb?()
      return
    p = @http.get "#{@baseUrl}/angel/jobs?page=#{@page++}",{},cache:true
    # https://api.angel.co/1/tags/14781/jobs
    if cb
      ocb = _.throttle cb
    p.error (err)=>
      ocb?()
    p.success (data)=>
      if data.page == data.last_page
        @done = true
      if (not data) or not (data.jobs)
        ocb?()
        return
      async.each data.jobs, (card,cb)=>
        @scope.processCard card,(card)=>
          @filter card, (card)=>
            if card
              @dataBuffer.push card
              ocb?()
            cb()
      , =>
        ocb?()
      , =>
        ocb?()

  loadBackground: =>
    if @scope.cards[0]
      @scope.currentImage = @scope.cards[0].startup.screenshots[0]?.thumb
    if @scope.cards[1]
      @scope.nextImage = @scope.cards[1].startup.screenshots[0]?.thumb
  constructor: (@scope, @stateParams, @state, @timeout, @famous, @http) ->
    super @scope
    @scope.tutorialPipe = new @EventHandler()
    sync = new @GenericSync ["mouse","touch"]
    @scope.tutorialPipe.pipe sync
    @scope.options = 
      containerSurface:
        size: [320,568]
        properties:
          overflow: "hidden"
          "z-index": 201
          "background-color": "black"
          
    @index = 0
    @page = 0
    @done = false
    @loading = false
    @dataBuffer = []
    # @scope.cards = []
    # @loadMore()
    
    # TODO: remove
    @scope.cards = []
    data = require "./data"
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
    @loadMore()
    @loadBackground()
    @scope.$on "scroll", (e,v)=>
      @backgroundTimeline.set v 
    @scope.$on "next", =>
      @scope.curIdx++
      @scope.cards.shift()
      @loadMore()
      @loadBackground()
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
    @backgroundTimeline = new @Transitionable(0)
  scrollXPosition: =>
    return 1-@backgroundTimeline.get()
  scrollYPosition: =>
    return @tutorialTimeline.get()
  closeTutorial: =>
    @tutorialTimeline.set 0, duration: 400
    # console.log "close"
  openTutorial: =>
    @tutorialTimeline.set 1, duration: 400
    # console.log "open"
    

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
