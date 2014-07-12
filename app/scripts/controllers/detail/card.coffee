'use strict'

Ctrl = require "../ctrl.coffee"

class DetailCardCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$http", "localStorageService"]
  constructor: (@scope, @stateParams, @state, @Restangular, @timeout, @famous, @http, @storage) ->
    super @scope
    # @scope.cards = ["1","2","3","4"]
    @scope.detailScrollPipe = new @EventHandler()
    # @scope.detailScrollPipe.pipe @scope.enginePipe
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
    
    # @scope.$on "pageChange", (e,from,to,data)=>
    #   # console.log to
    #   if to==4 and data
    #     @scope.card = data
    #     @closeQuestion()
    @questionTimeline = new @Transitionable(0)
    @scope.sliderPosX = new @Transitionable(0)
      
    sync = new @GenericSync ['mouse', 'touch']
    @scope.detailScrollPipe.pipe sync

    @max = @scope.screenWidth/2-60
    @threshold = @max-30
    
    sync.on "end", (event)=>
      pos = @scope.sliderPosX.get()
      if pos>@threshold
        @apply()
      else if pos<-@threshold
        @pass()
      @scope.sliderPosX.set 0, duration: 300
      return
    sync.on "update", (event)=>
      pos = @scope.sliderPosX.get()
      @scope.sliderPosX.set Math.max(Math.min(@max,pos+event.delta[0]),-@max)
      
  submitAnswer: (card, note)=>
    
    accessToken = @storage.get "accessToken"
    if not accessToken
      return
    @scope.status = "loading"
    @scope.loadAngelUser (err,user)=>
      p = @http.post "#{@baseUrl}/angel/talent/pairing",
        startup_id: "383073" #card.startup.id
        user_id: "#{user.id}"
        user_interested: "1"
        user_note: """
        [Applied via Simple.Careers]
      
        Applying for #{card.title}
      
        Question: What excites you about this job? Why'd you be a good fit?
      
        Answer: #{note}
        """
      , 
        headers:
          Authorization: "Bearer #{accessToken}"
      p.success (data)=>
        @closeQuestion()
        # console.log data
        # @scope.status = "done"
        @scope.saveApplies card
      p.error (err)=>
        # @scope.status = "error"
        alert "There is an error."
  closeQuestion: =>
    @scope.isTextAreaFocused = false
    @questionTimeline.set 0, duration:300
  apply: =>
    @openQuestion()
  pass:=>
    @timeout =>
      @scope.hideDetail()
  openQuestion: =>
    @scope.isTextAreaFocused = true
    @questionTimeline.set 1, duration:300
  scrollYesPosition: =>
    pos = @scope.sliderPosX.get()
    return pos/@max*.5+.5
  scrollNoPosition: =>
    pos = @scope.sliderPosX.get()
    return pos/@max*.5+.5
  scrollYPosition: =>
    return @questionTimeline.get()

angular.module('simplecareersApp').controller('DetailCardCtrl', DetailCardCtrl)
