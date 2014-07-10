'use strict'

class Utils
  @clamp: (v,s,e)->
    Math.min(Math.max(s,v),e)


module.exports = Utils