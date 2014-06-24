'use strict'

class Ctrl
  @$inject: ['$scope']    
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

module.exports = Ctrl