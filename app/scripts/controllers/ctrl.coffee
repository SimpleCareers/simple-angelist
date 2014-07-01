'use strict'

class Ctrl
  constructor: (@scope) ->
    for k in _.functions @
      @scope[k] = @[k] if k!="constructor"
    @Transitionable = @famous["famous/transitions/Transitionable"]
    @GenericSync = @famous["famous/inputs/GenericSync"]
    @MouseSync = @famous["famous/inputs/MouseSync"]
    @TouchSync = @famous["famous/inputs/TouchSync"]
    @RotateSync = @famous["famous/inputs/RotateSync"]
    @PinchSync = @famous["famous/inputs/PinchSync"]
    @Surface = @famous["famous/core/Surface"]
    @Engine = @famous["famous/core/Engine"]
    @Transform = @famous["famous/core/Transform"]
    @EventHandler = @famous["famous/core/EventHandler"]
    @Easing = @famous["famous/transitions/Easing"]
    @TweenTransition = @famous["famous/transitions/TweenTransition"]
    @TweenTransition.registerCurve('inSine', @Easing.inSine)
    @ContainerSurface = @famous["famous/surfaces/ContainerSurface"]
    @ScrollView = @famous["famous/views/Scrollview"]
    @GenericSync.register
      mouse : @MouseSync
      touch : @TouchSync
      rotate: @RotateSync
      pinch : @PinchSync
    @baseUrl = "https://simplecareers-test.apigee.net"
  pass:=>
    console.log "Not Yet Implemented"


module.exports = Ctrl