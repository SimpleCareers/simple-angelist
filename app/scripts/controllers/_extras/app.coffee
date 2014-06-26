'use strict'

Ctrl = require "./ctrl.coffee"

class AppCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state',
             "Restangular", "$timeout", "$famous"]
  
  constructor: (@scope, @stateParams, @state,
                @Restangular, @timeout, @famous) ->
    super @scope
    
    Transitionable = @famous["famous/transitions/Transitionable"]
    GenericSync = @famous["famous/inputs/GenericSync"]
    MouseSync = @famous["famous/inputs/MouseSync"]
    TouchSync = @famous["famous/inputs/TouchSync"]
    RotateSync = @famous["famous/inputs/RotateSync"]
    PinchSync = @famous["famous/inputs/PinchSync"]
    Surface = @famous["famous/core/Surface"]
    Engine = @famous["famous/core/Engine"]
    Transform = @famous["famous/core/Transform"]
    EventHandler = @famous["famous/core/EventHandler"]
    
    Easing = @famous["famous/transitions/Easing"]
    
    TweenTransition = @famous["famous/transitions/TweenTransition"]
    TweenTransition.registerCurve('inSine', Easing.inSine)
    
    @scope.windowWidth = new Transitionable(angular.element(window).width())
    $(window).on "resize", =>
      console.log "resize"
      @currentWS =
        width: angular.element(window).width()
        height: angular.element(window).height()
      @timeout =>
        @scope.windowWidth = angular.element(window).width()
        @scope.windowHeight = angular.element(window).height()
      
    @standardWS =
      width: 320
      height: 568
    @currentWS =
      width: angular.element(window).width()
      height: angular.element(window).height()
    
    @scope.windowWidth = angular.element(window).width()
    @scope.windowHeight = angular.element(window).height()
    
    GenericSync.register
      mouse : MouseSync
      touch : TouchSync
    sync = new GenericSync(['mouse', 'touch'])
    
    @pos = new Transitionable([0, 0])
    sync.on "start", (e) =>
      @startDrag = true
      # console.log "mousedown"
      @startX = e.clientX
      @startY = e.clientY
    sync.on "end", (e) =>
      @startDrag = false
      @pos.set [0,0],{duration : 300,curve : 'inSine'},=>
        @dragging = false
    sync.on "update", (e) =>
      if @startDrag
        @dragging = true
        @pos.set [e.clientX-@startX, e.clientY-@startY]
      
    @scope.swipePipe = new EventHandler()
    @scope.swipePipe.pipe sync

    @scope.enginePipe = new EventHandler()
    Engine.pipe(@scope.enginePipe)
    
    
    @scope.menuPipe = new EventHandler()
    menuSync = new GenericSync ['mouse', 'touch'],
        direction: GenericSync.DIRECTION_Y
    @scope.menuPipe.pipe menuSync
    @menupos = new Transitionable([0, 0])
    menuSync.on "start", (e) =>
      @menuStartDrag = true
      # console.log "mousedown"
      # @menuStartX = e.clientX
      pos = @menupos.get()
      @menuStartY = -pos[1]+e.clientY
      if pos[1] > 0
        #in open state
        @menuDirection = "close"
      else
        @menuDirection = "open"
        #in close state

    endMenuSync = (e) =>
      if not @menuStartDrag
        return
      @menuStartDrag = false
      # console.log "e.clientY-@menuStartY",e.clientY-@menuStartY
      if @menuDirection == "open"
        if e.clientY-@menuStartY > 25
          @menupos.set [0,568-15],{duration : 300,curve : 'inSine'},=>
            @menuDragging = false
        else
          @menupos.set [0,0],{duration : 300,curve : 'inSine'},=>
            @menuDragging = false
      else
        if e.clientY-@menuStartY < 568-25
          @menupos.set [0,0],{duration : 300,curve : 'inSine'},=>
            @menuDragging = false
        else
          @menupos.set [0,568-15],{duration : 300,curve : 'inSine'},=>
            @menuDragging = false
    menuSync.on "end", endMenuSync
    menuSync.on "update", (e) =>
      if @menuStartDrag
        @menuDragging = true
        @menupos.set [0, e.clientY-@menuStartY]
    @scope.menuPipe.on "mouseleave", endMenuSync
      
    @scope.applyPipe = new EventHandler()
    applySync = new GenericSync ['mouse', 'touch'],
                                direction: GenericSync.DIRECTION_Y
    @scope.applyPipe.pipe applySync
    @applypos = new Transitionable([0, 0])
    applySync.on "start", (e) =>
      console.log "start"
      @applyStartDrag = true
      # console.log "mousedown"
      # @menuStartX = e.clientX
      pos = @applypos.get()
      @applyStartY = -pos[1]+e.clientY
      if pos[1] < 0
        #in open state
        @applyDirection = "close"
      else
        @applyDirection = "open"
        #in close state
    endApplySync = (e) =>
      if not @applyStartDrag
        return
      @applyStartDrag = false
      if @applyDirection == "open"
        if Math.abs(e.clientY-@applyStartY) > 25
          @applypos.set [0,-568+15],{duration : 300,curve : 'inSine'},=>
            @applyDragging = false
        else
          @applypos.set [0,0],{duration : 300,curve : 'inSine'},=>
            @applyDragging = false
      else
        console.log e.clientY-@applyStartY, e.clientY-@applyStartY
        if e.clientY-@applyStartY > -568+25
          @applypos.set [0,0],{duration : 300,curve : 'inSine'},=>
            @applyDragging = false
        else
          @applypos.set [0,-568+15],{duration : 300,curve : 'inSine'},=>
            @applyDragging = false
  
    applySync.on "end", endApplySync
    applySync.on "update", (e) =>
      console.log "update"
      if @applyStartDrag
        @applyDragging = true
        @applypos.set [0, e.clientY-@applyStartY]
        console.log @applypos.get()
    @scope.applyPipe.on "mouseleave", endApplySync

    @scope.listPipe = new EventHandler()
    @scope.listPipe.on "click", =>
      console.log "click"
    @scope.options =
      menuItemGridLayout:
        dimensions: [1, 3]
      mainScrollView:
        paginated: true
        direction: 1
        speedLimit: 5
        margin: 10000
      listScrollView:
        paginated: true
        direction: 1
        speedLimit: 5
        margin: 1000000
      applyList:
        direction: 1
      applyMenuList:
        direction: 0

    # @timeout =>
    #   @scope.$broadcast('startEvent')
    # , 1000
        
    @scope.applymenus = ["LIKE","APPLIED","APPROVED"]
    
    @scope.menus = ["My Profile","Help","Settings"]
    @scope.rows = ["1","1","1","1","1","1","1","1"]

    @scope.items = ["34 applicants","Full Time","$90K - $125K"]
    @scope.cards = ["card1","card2","card3","card4"]
    i = 7
    x = =>
      @scope.cards.splice 0,1
      @scope.cards.push "card"+i++
      @timeout x,5000
    @timeout x,5000
    @scope.cardSpacing = 10
    
  scrollXPosition: =>
    threshold = 50
    pos = @pos.get()
    return Math.abs pos[0]/threshold
  getApplyPosition: =>
    pos = @applypos.get()
    return pos
  getMenuPosition: =>
    pos = @menupos.get()
    return pos
  getPosition: (idx)=>
    if idx==0 and @dragging
      pos = @pos.get()
      position = [pos[0],
                  pos[1]+@scope.cardSpacing*(idx),
                  -@scope.cardSpacing*(idx)]
    else
      if idx >= 2
        position = [0,@scope.cardSpacing*(2),-@scope.cardSpacing*(2)]
      else
        position = [0,@scope.cardSpacing*(idx),-@scope.cardSpacing*(idx)]
    # console.log position
    return position
    
angular.module('simplecareersApp').controller('AppCtrl', AppCtrl)
