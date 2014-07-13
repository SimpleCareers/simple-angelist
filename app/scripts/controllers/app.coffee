'use strict'

Ctrl = require "./ctrl.coffee"
async = require "async"
homo = require "triangle-homography"

class AppCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$window", "$http", "localStorageService", "preloader", "$famousState"]
  isLogin: =>
    accessToken = @localStorageService.get "accessToken"
    sessionToken = @localStorageService.get "sessionToken"
    userId = @localStorageService.get "userId"
    return accessToken and sessionToken and userId
  loadCard: (id,cb)=>
    p = @http.get "#{@baseUrl}/angel/jobs/#{id}",{},cache:true
    p.error (err)=>
      cb? err, null
    p.success (data)=>
      @processCard data,=>
        cb? null,data
  loadRoles: (card)=>
    p = @http.get "#{@baseUrl}/angel/startups/#{card.startup.id}/roles",{},cache:true
    p.success (data)=>
      roles = data.startup_roles
      card.founders = _.where roles,role:"founder"
      card.investors = _.where roles,role:"past_investor"
      card.advisors = _.where roles,role:"advisor"
      cb? card
    p.error =>
      cb? null
  getUser: (cb)=>
    if @scope.parseUser
      cb? null,@scope.parseUser
      return
    userId = @localStorageService.get "userId"
    sessionToken = @localStorageService.get "sessionToken"
    user = @Restangular.one("users",userId)
    user.get({},
      "X-Parse-Session-Token": sessionToken
    ).then (user)=>
      @scope.parseUser = user
      cb? null,user
    , (err)=>
      cb? err
  saveApplies: (card)=>
    @scope.parseUser?.applies?=[]
    results = _.where @scope.parseUser?.applies,card.id
    if results.length == 0
      @scope.parseUser?.applies.push card.id
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
  saveLike: (card)=>
    @scope.parseUser?.likes?=[]
    results = _.where @scope.parseUser?.likes,card.id
    if results.length == 0
      @scope.parseUser?.likes.push card.id
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
  processCard: (card, cb)=>
    p = @http.get "#{@baseUrl}/angel/startups/#{card.startup.id}/",{},cache:true
    p.success (startup)=>
      card.startup = startup
      card.location = startup.locations?[0]?.display_name
      card.screenshot = startup.screenshots?[0]?.thumb or startup.logo_url
      @loadRoles card
      cb? card
    p.error =>
      cb? null
  signOut:=>
    @scope.status = "notavailable"
    @localStorageService.clearAll()
    @scope.user = undefined
    @scope.goToPage(0)
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @window, @http, @localStorageService, @preloader, @famousState) ->
    super @scope
    
    @scope.showMenu = false
    @scope.$on "showMenu", =>
      @scope.showMenu = true
    @scope.$on "hideMenu", =>
      @scope.showMenu = false
    @scope.$on "page", (e,page)=>
      @scope.goToPage(page)
    
    @scope.screenWidth = $(window).width()
    @scope.screenHeight = $(window).height()
    $( window ).resize =>
      @scope.screenWidth = $(window).width()
      @scope.screenHeight = $(window).height()
    
    @scope.menuScrollT = new @Transitionable(1)
    @scope.profileIconScrollT = new @Transitionable(1)
    @scope.jobIconScrollT = new @Transitionable(1)
    @scope.applyIconScrollT = new @Transitionable(1)
    @scope.profileIconScrollT2 = new @Transitionable(1)
    @scope.jobIconScrollT2 = new @Transitionable(1)
    @scope.applyIconScrollT2 = new @Transitionable(1)

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
    @scope.currentPage = 0
    @numPages = 5
    @pages = []
    for i in [0..@numPages]
      @pages.push 
        pos: new @Transitionable [@scope.screenWidth*i,0,0]
    @zSeparation = 50
    @mode = "scale"
    @applicationMode = "Like"
    @applicationModeOpacity =
      "Like": new @Transitionable 1
      "Applied": new @Transitionable .5
      "Approved": new @Transitionable .5
      
  pageSyncStart:(e)=>
    
  pageSyncUpdate:(e)=>
    px = e.position[0]
    if Math.abs(px) > 40
      @movePage e
  pageSyncEnd:(e)=>
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
    for i in [@scope.currentPage...@numPages]
      curPos = @pages[i].pos.get()
      if i==@scope.currentPage
        if @mode == "scale"
          z = @clamp curPos[2]+delta, -@zSeparation, 0
          if z == 0
            @mode = "translate"
          @setPagePos i,[curPos[0],curPos[1],z]
        else
          x = @clamp curPos[0]+delta,0,(if @scope.currentPage==0 then 0 else @scope.screenWidth)
          if x == 0
            @mode = "scale"
          @setPagePos i,[x,curPos[1],curPos[2]]
      if i == @scope.currentPage+1
        x = @clamp(curPos[0]+delta,@scope.screenWidth*(i-@scope.currentPage-1),@scope.screenWidth*(i-@scope.currentPage+1))
        @setPagePos i,[x,curPos[1],curPos[2]]
  setPagePos: (i,pos,op,cb)=>
    if i==1 and pos[0]<=@scope.screenWidth
      @scope.menuScrollT.set pos[0]/@scope.screenWidth,op,cb
    if i==2 and pos[0]<=@scope.screenWidth
      x = (pos[0])/@scope.screenWidth
      @scope.profileIconScrollT.set x,op,cb
      @scope.jobIconScrollT.set x,op,cb
      @scope.applyIconScrollT.set x,op,cb
    if i==3 and pos[0]<=@scope.screenWidth
      x = (pos[0])/@scope.screenWidth
      @scope.profileIconScrollT2.set x,op,cb
      @scope.jobIconScrollT2.set x,op,cb
      @scope.applyIconScrollT2.set x,op,cb
    @pages[i].pos.set pos,op,cb
  stay: =>
    for i in [0...@numPages]
      curPos = @pages[i].pos.get()
      #current pages and pages before the current page 
      if i <= @scope.currentPage
        z = -@zSeparation*(@scope.currentPage-i)
        @setPagePos i, [0,0,z], duration: 300, =>
      else
        x = @scope.screenWidth*(i-@scope.currentPage)
        @setPagePos i, [x,0,0], duration: 300, =>
  menuScroll: =>
    return @scope.menuScrollT.get();
  profileIconScroll: =>
    return @scope.profileIconScrollT.get();
  jobIconScroll: =>
    return @scope.jobIconScrollT.get();
  applyIconScroll: =>
    return @scope.applyIconScrollT.get();
  profileIconScroll2: =>
    return @scope.profileIconScrollT2.get();
  jobIconScroll2: =>
    return @scope.jobIconScrollT2.get();
  applyIconScroll2: =>
    return @scope.applyIconScrollT2.get();
  getButtonOpacity: (which)=>
    if @applicationMode==which
      return @applicationModeOpacity[which].get()
    else
      return @applicationModeOpacity[which].get()
  switchTo: (mode)=>
    @goToPage 3
    @applicationMode = mode
    for k,v of @applicationModeOpacity
      if k==mode
        v.set 1,duration:300,=>
      else
        v.set 0.5,duration:300,=>
    @scope.$broadcast "modeChange", mode
  changePageTo:(page)=>
    @scope.currentPage = page
    @timeout =>
      switch page
        when 0
          @state.go "login"
        when 1
          @state.go "profile"
        when 2
          @state.go "job"
        when 3
          @state.go "detail"
  goToPage: (page, data)=>
    while @scope.currentPage<page
      @nextPage(data)
    while @scope.currentPage>page
      @prevPage(data)
  prevPage: (data)=>
    currentPage = @scope.currentPage
    if currentPage<=0
      return false
    i=0
    pIdx = currentPage+i
    nextPos = @pages[pIdx].pos.get()
    @changePageTo currentPage-1
    @scope.$broadcast "pageChange", currentPage,currentPage-1,data
    @setPagePos pIdx,[(i+1)*@scope.screenWidth,nextPos[1],0], duration: 300, =>
    i++
    currentPage--
    i=0
    while currentPage-i>=0
      pIdx = currentPage-i
      nextPos = @pages[pIdx].pos.get()
      @setPagePos pIdx,[0,nextPos[1],-@zSeparation*(i)], duration: 300, =>
      i++
    return true
  nextPage: (data)=>
    currentPage = @scope.currentPage
    if currentPage>=@numPages-1
      return false
    i=0
    pIdx = currentPage-i
    nextPos = @pages[pIdx].pos.get()
    @changePageTo currentPage+1
    @scope.$broadcast "pageChange", currentPage,currentPage+1,data
    @setPagePos pIdx,[0,nextPos[1],-@zSeparation*(i+1)], duration: 300, =>
    i++
    currentPage++
    i=0
    while (currentPage+i)<@numPages
      pIdx = currentPage+i
      nextPos = @pages[pIdx].pos.get()
      @setPagePos pIdx,[(i)*@scope.screenWidth,nextPos[1],0], duration: 300, =>
      i++
    return true
  getPagePosition: (i)=>
    return @pages[i].pos.get();
  loadAngelUser:(cb)=>
    if @scope.user
      cb? null,@scope.user
      return
    @scope.getUser =>
      accessToken = @localStorageService.get "accessToken"
      if not accessToken
        return
      p = @http.get "#{@baseUrl}/myangel/me",
        headers:
          Authorization: "Bearer #{accessToken}"
      , cache: true
      p.success (data)=>
        @scope.user = data
        cb? null,@scope.user
      p.error (err)=>
        cb?(err)

angular.module('simplecareersApp').controller('AppCtrl', AppCtrl)
