'use strict'

Ctrl = require "./ctrl.coffee"

class AppCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$window", "$http"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @window, @http) ->
    super @scope
    @scope.enginePipe = new @EventHandler()
    @Engine.pipe(@scope.enginePipe)
    @scope.options =
      mainScrollView:
        paginated: true
        direction: 0
        speedLimit: 5
        margin: 10000
    sync = new @GenericSync ['mouse', 'touch']
    @scope.enginePipe.pipe sync
    sync.on "start", (e)=>
    sync.on "end", (e)=>
      console.log e.velocity
      vx = e.velocity[0]
      if vx > 0.05
        @prevPage()
      else if vx < -0.05
        @nextPage()
    sync.on "update", (e)=>

    @currentPage = 0
    @numPages = 5
    @pages = []
    for i in [0..@numPages]
      @pages.push 
        pos: new @Transitionable [320*i,0,0]
  prevPage: =>
    if @currentPage<=0
      return
    i=0
    while @currentPage+i<@numPages
      nextPos = @pages[@currentPage+i].pos.get()
      @pages[@currentPage+i].pos.set [nextPos[0]+320,nextPos[1],nextPos[2]], duration: 300, =>
      i++
    @currentPage--
    i=0
    while @currentPage-i>=0
      nextPos = @pages[@currentPage-i].pos.get()
      @pages[@currentPage-i].pos.set [nextPos[0],nextPos[1],nextPos[2]+100], duration: 300, =>
      i++
  nextPage: =>
    if @currentPage>=@numPages-1
      return
    i=0
    while @currentPage-i>=0
      nextPos = @pages[@currentPage-i].pos.get()
      @pages[@currentPage-i].pos.set [nextPos[0],nextPos[1],nextPos[2]-100], duration: 300, =>
      i++
    @currentPage++
    i=0
    while @currentPage+i<@numPages
      nextPos = @pages[@currentPage+i].pos.get()
      @pages[@currentPage+i].pos.set [nextPos[0]-320,nextPos[1],nextPos[2]], duration: 300, =>
      i++
    
  receiveMessage: (event) =>
    data = JSON.parse(event.data)
    window.accessToken = accessToken = data.accessToken
    window.sessionToken = sessionToken = data.sessionToken
    @timeout.cancel(@checkpromise)
    @popup?.close()
    @http.defaults.headers.common.Authorization = "Bearer #{accessToken}"
    e = =>
      p = @http.get "#{@baseUrl}/me"
      # https://api.angel.co/1/tags/14781/jobs
      p.success (data)=>
        console.log data
      p.error (err)=>
    e()
    # @Restangular.setDefaultHeaders
    #   "Authorization": "Bearer #{accessToken}"
    window.removeEventListener "message", @receiveMessage
  checkToken: (cb)=>
    @popup?.postMessage "getToken", "http://simplecareers.parseapp.com"
    @timeout.cancel(@checkpromise)
    if not @popup.closed
      @checkpromise = @timeout @checkToken, 1000
  login: (cb)=>
    @popup = window.open "http://simplecareers.parseapp.com/authorize"
    @checkpromise = @timeout @checkToken, 1000
    window.addEventListener "message", @receiveMessage, false
    return
  getPagePosition: (i)=>
    return @pages[i].pos.get();

angular.module('simplecareersApp').controller('AppCtrl', AppCtrl)
