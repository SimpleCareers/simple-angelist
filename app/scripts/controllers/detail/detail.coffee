'use strict'

Ctrl = require "../ctrl.coffee"

class DetailCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$http", "localStorageService"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @http, @storage) ->
    super @scope
    # @scope.cards = ["1","2","3","4"]
    @scope.detailScrollPipe = new @EventHandler()
    @scope.options =
      detailScrollView:
        paginated: false
        direction: 1
        speedLimit: 5
        margin: 10000
      containerSurface:
        size: [320,568]
        properties:
          overflow: "hidden"
          "z-index": 650
    
    @scope.$on "pageChange", (e,from,to,data)=>
      console.log to
      if to==4 and data
        @scope.card = data
        @closeQuestion()
    @questionTimeline = new @Transitionable(0)
  apply: (card, note)=>
    @closeQuestion()

    accessToken = @storage.get "accessToken"
    if not accessToken
      return
    @scope.status = "loading"
    p = @http.post "#{@baseUrl}/angel/intros",
      startup_id: 383073 #card.startup.id
      note: note
    , 
      headers:
        Authorization: "Bearer #{accessToken}"
    p.success (data)=>
      console.log data
      @scope.status = "done"
    p.error (err)=>
      @scope.status = "error"

    @scope.saveApplies card
  closeQuestion: =>
    @questionTimeline.set 0, duration:300 
  openQuestion: =>
    @questionTimeline.set 1, duration:300
  scrollYPosition: =>
    return @questionTimeline.get()

angular.module('simplecareersApp').controller('DetailCtrl', DetailCtrl)
