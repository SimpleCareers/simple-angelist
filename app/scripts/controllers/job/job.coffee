'use strict'

Ctrl = require "../ctrl.coffee"
async = require "async"
Queue = require "../../extensions/Queue.js"
class JobCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http", "preloader"]
  
  filter: (card, cb)=>
    if card and card.description and card.startup and card.startup.product_desc and card.startup.screenshots?[0]?.thumb
      cb? card
    else
      cb? null
  process: (n)=>
    # @dataBuffer.splice(0,n).forEach (card)=>
    #   card.index = @index++
    #   if @index % 10 == 5
    #     # Hack to remove surfaces
    #     angular.element(".jobcard0").slice(0,-1).remove()
    #   @preloader.preloadImages([card.screenshot, card.startup.logo_url]).then =>
    #     console.log "preloaded"
    #   @scope.cards.push card
    #   @loadBackground()
    while n>0
      card = @dataBuffer.dequeue()
      if card
        card.index = @index++
        if @index % 10 == 5
          # Hack to remove unused job card surfaces once in a while
          angular.element(".jobcard0").slice(0,-1).remove()
        @preloader.preloadImages([card.screenshot, card.startup.logo_url]).then =>
        @scope.cards.push card
        @loadBackground()
        n--
      
  loadMore: =>
    # bufferLength = @dataBuffer.length
    bufferLength = @dataBuffer.getLength()
    if bufferLength > 0
      @process(4-@scope.cards.length)
    if @done
      return
    if (not @loading) and bufferLength  < 10
      @loadPage =>
        @process(4-@scope.cards.length)
        
      return

  loadPage: (cb)=>
    if @loading
      cb?()
      return
    @loading = true
    p = @http.get "#{@baseUrl}/angel/jobs?page=#{@page++}",{},cache:true
    # https://api.angel.co/1/tags/14781/jobs
    if cb
      ocb = _.throttle cb
    p.error (err)=>
      @loading = false
      ocb?()
    p.success (data)=>
      @loading = false
      if data.page == data.last_page
        @done = true
      if (not data) or not (data.jobs)
        ocb?()
        return
      async.each data.jobs, (card,cb)=>
        @scope.processCard card,(card)=>
          @filter card, (card)=>
            if card
              @dataBuffer.enqueue card
              # @dataBuffer.push card
              ocb?()
            cb()
      , =>
        ocb?()
      , =>
        ocb?()

  loadBackground: =>
    if @scope.cards[0] and @scope.cards[1]
      if @odd
        @scope.currentImage = @scope.cards[0].screenshot
        @scope.nextImage = @scope.cards[1].screenshot
      else
        @scope.nextImage = @scope.cards[0].screenshot
        @scope.currentImage = @scope.cards[1].screenshot
  constructor: (@scope, @stateParams, @state, @timeout, @famous, @http, @preloader) ->
    super @scope
    @scope.showTutorial = false
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
    @dataBuffer = new Queue()
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
    @odd = true
    @loadMore()
    @loadBackground()
    @scope.$on "scroll", (e,v)=>
      if @odd
        @backgroundTimeline.set v 
      else
        @backgroundTimeline.set 1-v 
    @scope.$on "next", =>
      @odd = not @odd
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
  #   @pos.set [0,0],{duration : 300,curve : 'easeInOut'},=>
  #     @reset()
  # animatePass: =>
  #   @pos.set [-@threshold,568*2],{duration : 300,curve : 'easeInOut'},=>
  #     @reset()
  #     @commitPass()
  # commitPass: =>
  #   @timeout =>
  #     @scope.cards.shift()
  #     @scope.currentImage = @scope.cards[0].startup.screenshots[0]?.thumb
  #     # @scope.cards.push id:Math.round(1000*Math.random())
  # animateFav: =>
  #   @pos.set [@threshold,568*2],{duration : 300,curve : 'easeInOut'},=>
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
    return @backgroundTimeline.get()
  scrollYPosition: =>
    return @tutorialTimeline.get()
  closeTutorial: =>
    @tutorialTimeline.set 0, duration: 400, =>
      @timeout =>
        @scope.showTutorial = false
    # console.log "close"
  openTutorial: =>
    @scope.showTutorial = true
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
