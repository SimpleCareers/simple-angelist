(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('simplecareersApp', ['ui.router', 'restangular', 'famous.angular']).config([
  '$locationProvider', 'RestangularProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, RestangularProvider, $stateProvider, $urlRouterProvider, config) {
    $locationProvider.html5Mode(false);
    RestangularProvider.setRestangularFields({
      id: "_id"
    });
    RestangularProvider.setBaseUrl("/api/data/");
    $urlRouterProvider.otherwise("/app");
    return $stateProvider.state('app', {
      url: "/app",
      views: {
        'main': {
          templateUrl: "/views/app.html",
          controller: "AppCtrl"
        }
      }
    });
  }
]);

require("./controllers/app.coffee");

require("./controllers/login/login.coffee");

require("./controllers/profile/profile.coffee");

require("./controllers/apply/apply.coffee");

require("./controllers/detail/detail.coffee");

require("./controllers/job/job.coffee");

angular.bootstrap(document, ['simplecareersApp']);


},{"./controllers/app.coffee":2,"./controllers/apply/apply.coffee":3,"./controllers/detail/detail.coffee":5,"./controllers/job/job.coffee":6,"./controllers/login/login.coffee":7,"./controllers/profile/profile.coffee":8}],2:[function(require,module,exports){
'use strict';
var AppCtrl, Ctrl,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("./ctrl.coffee");

AppCtrl = (function(_super) {
  __extends(AppCtrl, _super);

  AppCtrl.$inject = ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"];

  function AppCtrl(scope, stateParams, state, Restangular, timeout, famous) {
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.Restangular = Restangular;
    this.timeout = timeout;
    this.famous = famous;
    AppCtrl.__super__.constructor.call(this, this.scope);
    this.scope.enginePipe = new this.EventHandler();
    this.Engine.pipe(this.scope.enginePipe);
    this.scope.options = {
      mainScrollView: {
        paginated: true,
        direction: 1,
        speedLimit: 5,
        margin: 10000
      }
    };
  }

  return AppCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('AppCtrl', AppCtrl);


},{"./ctrl.coffee":4}],3:[function(require,module,exports){
'use strict';
var ApplyCtrl, Ctrl,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("../ctrl.coffee");

ApplyCtrl = (function(_super) {
  __extends(ApplyCtrl, _super);

  ApplyCtrl.$inject = ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"];

  function ApplyCtrl(scope, stateParams, state, Restangular, timeout, famous) {
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.Restangular = Restangular;
    this.timeout = timeout;
    this.famous = famous;
    ApplyCtrl.__super__.constructor.call(this, this.scope);
  }

  return ApplyCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('ApplyCtrl', ApplyCtrl);


},{"../ctrl.coffee":4}],4:[function(require,module,exports){
'use strict';
var Ctrl;

Ctrl = (function() {
  Ctrl.$inject = ['$scope'];

  function Ctrl(scope) {
    var k, _i, _len, _ref;
    this.scope = scope;
    _ref = _.functions(this);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      if (k !== "constructor") {
        this.scope[k] = this[k];
      }
    }
    this.Transitionable = this.famous["famous/transitions/Transitionable"];
    this.GenericSync = this.famous["famous/inputs/GenericSync"];
    this.MouseSync = this.famous["famous/inputs/MouseSync"];
    this.TouchSync = this.famous["famous/inputs/TouchSync"];
    this.RotateSync = this.famous["famous/inputs/RotateSync"];
    this.PinchSync = this.famous["famous/inputs/PinchSync"];
    this.Surface = this.famous["famous/core/Surface"];
    this.Engine = this.famous["famous/core/Engine"];
    this.Transform = this.famous["famous/core/Transform"];
    this.EventHandler = this.famous["famous/core/EventHandler"];
    this.Easing = this.famous["famous/transitions/Easing"];
    this.TweenTransition = this.famous["famous/transitions/TweenTransition"];
    this.TweenTransition.registerCurve('inSine', this.Easing.inSine);
  }

  return Ctrl;

})();

module.exports = Ctrl;


},{}],5:[function(require,module,exports){
'use strict';
var Ctrl, DetailCtrl,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("../ctrl.coffee");

DetailCtrl = (function(_super) {
  __extends(DetailCtrl, _super);

  DetailCtrl.$inject = ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"];

  function DetailCtrl(scope, stateParams, state, Restangular, timeout, famous) {
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.Restangular = Restangular;
    this.timeout = timeout;
    this.famous = famous;
    DetailCtrl.__super__.constructor.call(this, this.scope);
  }

  return DetailCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('DetailCtrl', DetailCtrl);


},{"../ctrl.coffee":4}],6:[function(require,module,exports){
'use strict';
var Ctrl, JobCtrl,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("../ctrl.coffee");

JobCtrl = (function(_super) {
  __extends(JobCtrl, _super);

  JobCtrl.$inject = ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"];

  function JobCtrl(scope, stateParams, state, Restangular, timeout, famous) {
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.Restangular = Restangular;
    this.timeout = timeout;
    this.famous = famous;
    JobCtrl.__super__.constructor.call(this, this.scope);
  }

  return JobCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('JobCtrl', JobCtrl);


},{"../ctrl.coffee":4}],7:[function(require,module,exports){
'use strict';
var Ctrl, LoginCtrl,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("../ctrl.coffee");

LoginCtrl = (function(_super) {
  __extends(LoginCtrl, _super);

  LoginCtrl.$inject = ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"];

  function LoginCtrl(scope, stateParams, state, Restangular, timeout, famous) {
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.Restangular = Restangular;
    this.timeout = timeout;
    this.famous = famous;
    LoginCtrl.__super__.constructor.call(this, this.scope);
  }

  return LoginCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('LoginCtrl', LoginCtrl);


},{"../ctrl.coffee":4}],8:[function(require,module,exports){
'use strict';
var Ctrl, ProfileCtrl,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("../ctrl.coffee");

ProfileCtrl = (function(_super) {
  __extends(ProfileCtrl, _super);

  ProfileCtrl.$inject = ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous"];

  function ProfileCtrl(scope, stateParams, state, Restangular, timeout, famous) {
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.Restangular = Restangular;
    this.timeout = timeout;
    this.famous = famous;
    ProfileCtrl.__super__.constructor.call(this, this.scope);
  }

  return ProfileCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('ProfileCtrl', ProfileCtrl);


},{"../ctrl.coffee":4}]},{},[1])