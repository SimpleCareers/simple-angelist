angular.module("preloader", []).factory "preloader", ["$q","$rootScope",($q, $rootScope) ->

  # I manage the preloading of image objects. Accepts an array of image URLs.
  Preloader = (imageLocations) ->

    # I am the image SRC values to preload.
    @imageLocations = imageLocations

    # As the images load, we'll need to keep track of the load/error
    # counts when announing the progress on the loading.
    @imageCount = @imageLocations.length
    @loadCount = 0
    @errorCount = 0

    # I am the possible states that the preloader can be in.
    @states =
      PENDING: 1
      LOADING: 2
      RESOLVED: 3
      REJECTED: 4


    # I keep track of the current state of the preloader.
    @state = @states.PENDING

    # When loading the images, a promise will be returned to indicate
    # when the loading has completed (and / or progressed).
    @deferred = $q.defer()
    @promise = @deferred.promise
    return

  # ---
  # STATIC METHODS.
  # ---

  # I reload the given images [Array] and return a promise. The promise
  # will be resolved with the array of image locations.
  Preloader.preloadImages = (imageLocations) ->
    preloader = new Preloader(imageLocations)
    preloader.load()


  # ---
  # INSTANCE METHODS.
  # ---
  Preloader:: =

    # Best practice for "instnceof" operator.
    constructor: Preloader

    # ---
    # PUBLIC METHODS.
    # ---

    # I determine if the preloader has started loading images yet.
    isInitiated: isInitiated = ->
      @state isnt @states.PENDING


    # I determine if the preloader has failed to load all of the images.
    isRejected: isRejected = ->
      @state is @states.REJECTED


    # I determine if the preloader has successfully loaded all of the images.
    isResolved: isResolved = ->
      @state is @states.RESOLVED


    # I initiate the preload of the images. Returns a promise.
    load: load = ->
  
      # If the images are already loading, return the existing promise.
      return (@promise)  if @isInitiated()
      @state = @states.LOADING
      i = 0

      while i < @imageCount
        @loadImageLocation @imageLocations[i]
        i++
  
      # Return the deferred promise for the load event.
      @promise


    # ---
    # PRIVATE METHODS.
    # ---

    # I handle the load-failure of the given image location.
    handleImageError: handleImageError = (imageLocation) ->
      @errorCount++
  
      # If the preload action has already failed, ignore further action.
      return  if @isRejected()
      @state = @states.REJECTED
      @deferred.reject imageLocation
      return


    # I handle the load-success of the given image location.
    handleImageLoad: handleImageLoad = (imageLocation) ->
      @loadCount++
  
      # If the preload action has already failed, ignore further action.
      return  if @isRejected()
  
      # Notify the progress of the overall deferred. This is different
      # than Resolving the deferred - you can call notify many times
      # before the ultimate resolution (or rejection) of the deferred.
      @deferred.notify
        percent: Math.ceil(@loadCount / @imageCount * 100)
        imageLocation: imageLocation

  
      # If all of the images have loaded, we can resolve the deferred
      # value that we returned to the calling context.
      if @loadCount is @imageCount
        @state = @states.RESOLVED
        @deferred.resolve @imageLocations
      return


    # I load the given image location and then wire the load / error
    # events back into the preloader instance.
    # --
    # NOTE: The load/error events trigger a $digest.
    loadImageLocation: loadImageLocation = (imageLocation) ->
      preloader = this
  
      # When it comes to creating the image object, it is critical that
      # we bind the event handlers BEFORE we actually set the image
      # source. Failure to do so will prevent the events from proper
      # triggering in some browsers.
  
      # Since the load event is asynchronous, we have to
      # tell AngularJS that something changed.
  
      # Clean up object reference to help with the
      # garbage collection in the closure.
  
      # Since the load event is asynchronous, we have to
      # tell AngularJS that something changed.
  
      # Clean up object reference to help with the
      # garbage collection in the closure.
      image = $(new Image()).load((event) ->
        $rootScope.$apply ->
          preloader.handleImageLoad event.target.src
          preloader = image = event = null
          return

        return
      ).error((event) ->
        $rootScope.$apply ->
          preloader.handleImageError event.target.src
          preloader = image = event = null
          return

        return
      ).prop("src", imageLocation)
      return


  # Return the factory instance.
  Preloader
]