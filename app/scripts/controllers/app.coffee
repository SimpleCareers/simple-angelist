'use strict'

Ctrl = require "./ctrl.coffee"
async = require "async"
homo = require "triangle-homography"

class AppCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$window", "$http", "localStorageService"]
  loadCard: (id,cb)=>
    p = @http.get "#{@baseUrl}/angel/jobs/#{id}",{},cache:true
    p.error (err)=>
      cb? err, null
    p.success (data)=>
      @processCard data,=>
        cb? null,data
  loadApplies: (user,cb)=>
    if (not user) or (not user.applies)
      cb? null
      return
    async.map user.applies, (id, cb)=>
      @loadCard id,cb
    , (err,applies)=>
      user.applies = applies
      cb? err,applies

  loadApproves: (user,cb)=>
    if (not user) or (not user.approves)
      cb? null
      return
    async.map user.approves, (id, cb)=>
      @loadCard id,cb
    , (err,approves)=>
      user.approves = approves
      cb? err,approves
  
  loadLikes: (user,cb)=>
    if (not user) or (not user.likes)
      cb? null
      return
    async.map user.likes, (id, cb)=>
      @loadCard id,cb
    , (err,likes)=>
      user.likes = _.filter likes, (like)=> like
      cb? err,likes
        
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
    userId = @storage.get "userId"
    sessionToken = @storage.get "sessionToken"
    user = @Restangular.one("users",userId)
    user.get({},
      "X-Parse-Session-Token": sessionToken
    ).then (user)=>
      async.parallel [(cb)=>
        @loadLikes(user,cb)
      ,(cb)=>
        @loadApplies(user,cb)
      ,(cb)=>
        @loadApproves(user,cb)
      ],=>
        @scope.parseUser = user
        cb? null,user
    , (err)=>
      cb? err
  saveApplies: (card)=>
    @scope.parseUser?.applies?=[]
    results = _.where @scope.parseUser?.applies,id:card.id
    if results.length == 0
      @scope.parseUser?.applies.push card
    sessionToken = @storage.get "sessionToken"
    userId = @storage.get "userId"
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
    @scope.parseUser?.likes.push card
    results = _.where @scope.parseUser?.likes,id:card.id
    if results.length == 0
      @scope.parseUser?.likes.push card
    sessionToken = @storage.get "sessionToken"
    userId = @storage.get "userId"
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
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @window, @http, @storage) ->
    super @scope
    
    # genM = homo([[1184,461,0],[899,1479,0],[227,1326,0]])
    # results = genM([[640,0,0],[640, 568*2,0],[0,568*2,0]])
    # a = []
    # for r in results
    #   a = a.concat r
    # @scope.tArr = a
    
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
    @currentPage = 0
    @numPages = 5
    @pages = []
    for i in [0..@numPages]
      @pages.push 
        pos: new @Transitionable [320*i,0,0]
    @zSeparation = 50
    @mode = "scale"
    @applicationMode = "Like"
    @applicationModeOpacity =
      "Like": new @Transitionable 1
      "Applied": new @Transitionable .5
      "Approved": new @Transitionable .5
  pageSyncStart:(e)=>
    
  pageSyncUpdate:(e)=>
    # if (not @storage.get("accessToken"))
    #   return
    px = e.position[0]
    if Math.abs(px) > 40
      @movePage e
  pageSyncEnd:(e)=>
    # if (not @storage.get("accessToken"))
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
    for i in [@currentPage...@numPages]
      curPos = @pages[i].pos.get()
      # pages before the current page 
      # if i < @currentPage
      #   diff = @currentPage-i
      #   z = @clamp curPos[2]+delta, -@zSeparation*(diff), -@zSeparation*(diff-1)
      #   @pages[i].pos.set [curPos[0],curPos[1],z]
      # #pages after the current page
      # else if i==@currentPage
      if i==@currentPage
        if @mode == "scale"
          z = @clamp curPos[2]+delta, -@zSeparation, 0
          if z == 0
            @mode = "translate"
          @setPagePos i,[curPos[0],curPos[1],z]
        else
          x = @clamp curPos[0]+delta,0,(if @currentPage==0 then 0 else 320)
          if x == 0
            @mode = "scale"
          @setPagePos i,[x,curPos[1],curPos[2]]
      if i == @currentPage+1
        x = @clamp(curPos[0]+delta,320*(i-@currentPage-1),320*(i-@currentPage+1))
        @setPagePos i,[x,curPos[1],curPos[2]]
  setPagePos: (i,pos,op,cb)=>
    if i==1 and pos[0]<=320
      @scope.menuScrollT.set pos[0]/320,op,cb
    if i==2 and pos[0]<=320
      x = (pos[0])/320
      @scope.profileIconScrollT.set x,op,cb
      @scope.jobIconScrollT.set x,op,cb
      @scope.applyIconScrollT.set x,op,cb
    if i==3 and pos[0]<=320
      x = (pos[0])/320
      @scope.profileIconScrollT2.set x,op,cb
      @scope.jobIconScrollT2.set x,op,cb
      @scope.applyIconScrollT2.set x,op,cb
    @pages[i].pos.set pos,op,cb
  stay: =>
    for i in [0...@numPages]
      curPos = @pages[i].pos.get()
      #current pages and pages before the current page 
      if i <= @currentPage
        z = -@zSeparation*(@currentPage-i)
        @setPagePos i, [0,0,z], duration: 300, =>
      else
        x = 320*(i-@currentPage)
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
  goToPage: (page, data)=>
    while @currentPage<page
      @nextPage(data)
    while @currentPage>page
      @prevPage(data)
  prevPage: (data)=>
    if @currentPage<=0
      return false
    i=0
    #current pages and pages after the current page
    # while @currentPage+i<@numPages
    pIdx = @currentPage+i
    nextPos = @pages[pIdx].pos.get()
    @setPagePos pIdx,[(i+1)*320,nextPos[1],0], duration: 300, =>
    i++
    @currentPage--
    i=0
    #pages before the current page
    while @currentPage-i>=0
      pIdx = @currentPage-i
      nextPos = @pages[pIdx].pos.get()
      @setPagePos pIdx,[0,nextPos[1],-@zSeparation*(i)], duration: 300, =>
      i++
    @scope.$broadcast "pageChange", @currentPage+1,@currentPage,data
    return true
  nextPage: (data)=>
    if @currentPage>=@numPages-1
      return false
    i=0
    #current pages before the current page
    # while (@currentPage-i)>=0
    pIdx = @currentPage-i
    nextPos = @pages[pIdx].pos.get()
    @setPagePos pIdx,[0,nextPos[1],-@zSeparation*(i+1)], duration: 300, =>
    i++
    @currentPage++
    i=0
    #pages after the current page
    while (@currentPage+i)<@numPages
      pIdx = @currentPage+i
      nextPos = @pages[pIdx].pos.get()
      @setPagePos pIdx,[(i)*320,nextPos[1],0], duration: 300, =>
      i++
    @scope.$broadcast "pageChange", @currentPage-1,@currentPage,data
    return true
  getPagePosition: (i)=>
    return @pages[i].pos.get();

angular.module('simplecareersApp').controller('AppCtrl', AppCtrl)
