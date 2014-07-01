'use strict'

Ctrl = require "./ctrl.coffee"

class AppCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$window", "$http", "localStorageService"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @window, @http, @localStorageService) ->
    super @scope
    
    @scope.enginePipe = new @EventHandler()
    @Engine.pipe(@scope.enginePipe)
    
    @scope.options =
      mainScrollView:
        paginated: true
        direction: 0
        speedLimit: 5
        margin: 10000
    pageSync = new @GenericSync ['mouse', 'touch']
    @scope.enginePipe.pipe pageSync
    pageSync.on "start", @pageSyncStart
    pageSync.on "end", @pageSyncEnd
    pageSync.on "update", @pageSyncUpdate
    @currentPage = 0
    @numPages = 6
    @pages = []
    for i in [0..@numPages]
      @pages.push 
        pos: new @Transitionable [320*i,0,0]
    @zSeparation = 100
    @mode = "scale"
  pageSyncStart:(e)=>
    
  pageSyncUpdate:(e)=>
    # if (not @localStorageService.get("accessToken"))
    #   return
    px = e.position[0]
    if Math.abs(px) > 40
      @movePage e
  pageSyncEnd:(e)=>
    # if (not @localStorageService.get("accessToken"))
    #   return
    vx = e.velocity[0]
    px = e.position[0]
    if Math.abs(px) < 40
      return
    if vx > 0.5 or px > 80
      if not @prevPage()
        @stay()
    else if vx < -0.5 or px < -80
      if not @nextPage()
        @stay()
    else
      @stay()
  clamp: (v,min,max)=>
    return Math.min(Math.max(v,min),max)
  movePage: (e)=>
    delta = e.delta[0]
    pos = e.position[0]
    offset = e.offsetX
    for i in [0...@numPages]
      curPos = @pages[i].pos.get()
      # pages before the current page 
      if i < @currentPage
        diff = @currentPage-i
        z = @clamp curPos[2]+delta, -@zSeparation*(diff), -@zSeparation*(diff-1)
        @pages[i].pos.set [curPos[0],curPos[1],z]
      #pages after the current page
      else if i==@currentPage
        if @mode == "scale"
          z = @clamp curPos[2]+delta, -@zSeparation, 0
          if z == 0
            @mode = "translate"
          @pages[i].pos.set [curPos[0],curPos[1],z]
        else
          x = @clamp curPos[0]+delta,0,(if @currentPage==0 then 0 else 320)
          if x == 0
            @mode = "scale"
          @pages[i].pos.set [x,curPos[1],curPos[2]]
      else if i > @currentPage
        x = @clamp(curPos[0]+delta,320*(i-@currentPage-1),320*(i-@currentPage+1))
        @pages[i].pos.set [x,curPos[1],curPos[2]]
  stay: =>
    for i in [0...@numPages]
      curPos = @pages[i].pos.get()
      #current pages and pages before the current page 
      if i <= @currentPage
        z = -@zSeparation*(@currentPage-i)
        @pages[i].pos.set [0,0,z], duration: 300, =>
      else
        x = 320*(i-@currentPage)
        @pages[i].pos.set [x,0,0], duration: 300, =>
  prevPage: =>
    if @currentPage<=0
      return false
    i=0
    #current pages and pages after the current page
    while @currentPage+i<@numPages
      nextPos = @pages[@currentPage+i].pos.get()
      @pages[@currentPage+i].pos.set [(i+1)*320,nextPos[1],0], duration: 300, =>
      i++
    @currentPage--
    i=0
    #pages before the current page
    while @currentPage-i>=0
      nextPos = @pages[@currentPage-i].pos.get()
      @pages[@currentPage-i].pos.set [0,nextPos[1],-@zSeparation*(i)], duration: 300, =>
      i++
    @scope.$broadcast "pageChange", @currentPage+1,@currentPage
    return true
  nextPage: =>
    if @currentPage>=@numPages-1
      return false
    i=0
    #current pages before the current page
    while @currentPage-i>=0
      nextPos = @pages[@currentPage-i].pos.get()
      @pages[@currentPage-i].pos.set [0,nextPos[1],-@zSeparation*(i+1)], duration: 300, =>
      i++
    @currentPage++
    i=0
    #pages after the current page
    while @currentPage+i<@numPages
      nextPos = @pages[@currentPage+i].pos.get()
      @pages[@currentPage+i].pos.set [(i)*320,nextPos[1],0], duration: 300, =>
      i++
    @scope.$broadcast "pageChange", @currentPage-1,@currentPage
    return true
  getPagePosition: (i)=>
    return @pages[i].pos.get();

angular.module('simplecareersApp').controller('AppCtrl', AppCtrl)
