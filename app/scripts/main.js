(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('simplecareersApp', ['ui.router', 'restangular', 'famous.angular']).config([
  '$locationProvider', 'RestangularProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, RestangularProvider, $stateProvider, $urlRouterProvider, config) {
    $locationProvider.html5Mode(false);
    RestangularProvider.setRestangularFields({
      id: "_id"
    });
    RestangularProvider.setBaseUrl("http://simplecareers-test.apigee.net/angel/");
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

require("./controllers/job/jobcard.coffee");

angular.bootstrap(document, ['simplecareersApp']);


},{"./controllers/app.coffee":2,"./controllers/apply/apply.coffee":3,"./controllers/detail/detail.coffee":5,"./controllers/job/job.coffee":7,"./controllers/job/jobcard.coffee":8,"./controllers/login/login.coffee":9,"./controllers/profile/profile.coffee":10}],2:[function(require,module,exports){
'use strict';
var AppCtrl, Ctrl,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("./ctrl.coffee");

AppCtrl = (function(_super) {
  __extends(AppCtrl, _super);

  AppCtrl.$inject = ['$scope', '$stateParams', '$state', "Restangular", "$timeout", "$famous", "$window"];

  function AppCtrl(scope, stateParams, state, Restangular, timeout, famous, window) {
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.Restangular = Restangular;
    this.timeout = timeout;
    this.famous = famous;
    this.window = window;
    this.login = __bind(this.login, this);
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

  AppCtrl.prototype.login = function(cb) {
    var popupWindow;
    popupWindow = this.window.open("http://simplecareers.parseapp.com/authorize");
  };

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
var Ctrl,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Ctrl = (function() {
  function Ctrl(scope) {
    var k, _i, _len, _ref;
    this.scope = scope;
    this.pass = __bind(this.pass, this);
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
    this.GenericSync.register({
      mouse: this.MouseSync,
      touch: this.TouchSync,
      rotate: this.RotateSync,
      pinch: this.PinchSync
    });
  }

  Ctrl.prototype.pass = function() {
    return console.log("Not Yet Implemented");
  };

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
module.exports = [
  {
    "id": 31261,
    "title": "Implementation Manager              ",
    "created_at": "2014-06-18T18:32:44Z",
    "updated_at": "2014-06-20T18:41:53Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.5",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 100000,
    "angellist_url": "https://angel.co/jobs?startup_id=162396",
    "tags": [
      {
        "id": 1692,
        "tag_type": "LocationTag",
        "name": "san francisco",
        "display_name": "San Francisco",
        "angellist_url": "https://angel.co/san-francisco"
      }, {
        "id": 129175,
        "tag_type": "RoleTag",
        "name": "operations",
        "display_name": "Operations",
        "angellist_url": "https://angel.co/operations-1"
      }
    ],
    "startup": {
      "id": 162396,
      "hidden": false,
      "community_profile": false,
      "name": "Augmedix",
      "angellist_url": "https://angel.co/augmedix",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-medium_jpg.jpg?buster=1366181116",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-thumb_jpg.jpg?buster=1366181116",
      "quality": 8,
      "product_desc": "Augmedix -- a service powered by Google Glass -- reclaims the hours physicians spend on the computer entering or retrieving data from electronic health records and refocuses them on what matters most: patient care.\n",
      "high_concept": "A service for medical doctors that's powered by Google Glass.",
      "follower_count": 505,
      "company_url": "http://www.augmedix.com",
      "created_at": "2013-01-30T18:52:59Z",
      "updated_at": "2014-06-18T16:20:43Z",
      "crunchbase_url": "http://www.crunchbase.com/company/augmedix",
      "twitter_url": "https://twitter.com/AugmedixInc",
      "blog_url": "http://www.augmedix.com/updates",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "https://www.youtube.com/watch?v=umjICxg4Z-0",
      "markets": [
        {
          "id": 3,
          "tag_type": "MarketTag",
          "name": "mobile",
          "display_name": "Mobile",
          "angellist_url": "https://angel.co/mobile-2"
        }, {
          "id": 13,
          "tag_type": "MarketTag",
          "name": "health care",
          "display_name": "Health Care",
          "angellist_url": "https://angel.co/health-care"
        }, {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1054,
          "tag_type": "MarketTag",
          "name": "augmented reality",
          "display_name": "Augmented Reality",
          "angellist_url": "https://angel.co/augmented-reality"
        }
      ],
      "locations": [
        {
          "id": 1692,
          "tag_type": "LocationTag",
          "name": "san francisco",
          "display_name": "San Francisco",
          "angellist_url": "https://angel.co/san-francisco"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 94212,
          "tag_type": "CompanyTypeTag",
          "name": "startup",
          "display_name": "Startup",
          "angellist_url": "https://angel.co/startup"
        }, {
          "id": 147448,
          "tag_type": "CompanyTypeTag",
          "name": "google glass",
          "display_name": "Google Glass",
          "angellist_url": "https://angel.co/google-glass-5"
        }
      ],
      "status": {
        "id": 127716,
        "message": "Check out Cooper's Case Study on Augmedix: http://vimeo.com/85278836",
        "created_at": "2014-03-10T05:13:27Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-original.JPG"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-original.jpg"
        }
      ]
    },
    "location": "San Francisco",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg"
  }, {
    "id": 31267,
    "title": "Healthcare Integration Full-Stack Engineer",
    "created_at": "2014-06-18T18:41:21Z",
    "updated_at": "2014-06-20T18:40:29Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.5",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 100000,
    "angellist_url": "https://angel.co/jobs?startup_id=162396",
    "tags": [
      {
        "id": 1692,
        "tag_type": "LocationTag",
        "name": "san francisco",
        "display_name": "San Francisco",
        "angellist_url": "https://angel.co/san-francisco"
      }, {
        "id": 14726,
        "tag_type": "RoleTag",
        "name": "developer",
        "display_name": "Developer",
        "angellist_url": "https://angel.co/developer"
      }
    ],
    "startup": {
      "id": 162396,
      "hidden": false,
      "community_profile": false,
      "name": "Augmedix",
      "angellist_url": "https://angel.co/augmedix",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-medium_jpg.jpg?buster=1366181116",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-thumb_jpg.jpg?buster=1366181116",
      "quality": 8,
      "product_desc": "Augmedix -- a service powered by Google Glass -- reclaims the hours physicians spend on the computer entering or retrieving data from electronic health records and refocuses them on what matters most: patient care.\n",
      "high_concept": "A service for medical doctors that's powered by Google Glass.",
      "follower_count": 505,
      "company_url": "http://www.augmedix.com",
      "created_at": "2013-01-30T18:52:59Z",
      "updated_at": "2014-06-18T16:20:43Z",
      "crunchbase_url": "http://www.crunchbase.com/company/augmedix",
      "twitter_url": "https://twitter.com/AugmedixInc",
      "blog_url": "http://www.augmedix.com/updates",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "https://www.youtube.com/watch?v=umjICxg4Z-0",
      "markets": [
        {
          "id": 3,
          "tag_type": "MarketTag",
          "name": "mobile",
          "display_name": "Mobile",
          "angellist_url": "https://angel.co/mobile-2"
        }, {
          "id": 13,
          "tag_type": "MarketTag",
          "name": "health care",
          "display_name": "Health Care",
          "angellist_url": "https://angel.co/health-care"
        }, {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1054,
          "tag_type": "MarketTag",
          "name": "augmented reality",
          "display_name": "Augmented Reality",
          "angellist_url": "https://angel.co/augmented-reality"
        }
      ],
      "locations": [
        {
          "id": 1692,
          "tag_type": "LocationTag",
          "name": "san francisco",
          "display_name": "San Francisco",
          "angellist_url": "https://angel.co/san-francisco"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 94212,
          "tag_type": "CompanyTypeTag",
          "name": "startup",
          "display_name": "Startup",
          "angellist_url": "https://angel.co/startup"
        }, {
          "id": 147448,
          "tag_type": "CompanyTypeTag",
          "name": "google glass",
          "display_name": "Google Glass",
          "angellist_url": "https://angel.co/google-glass-5"
        }
      ],
      "status": {
        "id": 127716,
        "message": "Check out Cooper's Case Study on Augmedix: http://vimeo.com/85278836",
        "created_at": "2014-03-10T05:13:27Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-original.JPG"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-original.jpg"
        }
      ]
    },
    "location": "San Francisco",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg"
  }, {
    "id": 31269,
    "title": "Google Glass/Android Engineer",
    "created_at": "2014-06-18T18:43:07Z",
    "updated_at": "2014-06-20T18:38:55Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.5",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 100000,
    "angellist_url": "https://angel.co/jobs?startup_id=162396",
    "tags": [
      {
        "id": 1692,
        "tag_type": "LocationTag",
        "name": "san francisco",
        "display_name": "San Francisco",
        "angellist_url": "https://angel.co/san-francisco"
      }, {
        "id": 14726,
        "tag_type": "RoleTag",
        "name": "developer",
        "display_name": "Developer",
        "angellist_url": "https://angel.co/developer"
      }
    ],
    "startup": {
      "id": 162396,
      "hidden": false,
      "community_profile": false,
      "name": "Augmedix",
      "angellist_url": "https://angel.co/augmedix",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-medium_jpg.jpg?buster=1366181116",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-thumb_jpg.jpg?buster=1366181116",
      "quality": 8,
      "product_desc": "Augmedix -- a service powered by Google Glass -- reclaims the hours physicians spend on the computer entering or retrieving data from electronic health records and refocuses them on what matters most: patient care.\n",
      "high_concept": "A service for medical doctors that's powered by Google Glass.",
      "follower_count": 505,
      "company_url": "http://www.augmedix.com",
      "created_at": "2013-01-30T18:52:59Z",
      "updated_at": "2014-06-18T16:20:43Z",
      "crunchbase_url": "http://www.crunchbase.com/company/augmedix",
      "twitter_url": "https://twitter.com/AugmedixInc",
      "blog_url": "http://www.augmedix.com/updates",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "https://www.youtube.com/watch?v=umjICxg4Z-0",
      "markets": [
        {
          "id": 3,
          "tag_type": "MarketTag",
          "name": "mobile",
          "display_name": "Mobile",
          "angellist_url": "https://angel.co/mobile-2"
        }, {
          "id": 13,
          "tag_type": "MarketTag",
          "name": "health care",
          "display_name": "Health Care",
          "angellist_url": "https://angel.co/health-care"
        }, {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1054,
          "tag_type": "MarketTag",
          "name": "augmented reality",
          "display_name": "Augmented Reality",
          "angellist_url": "https://angel.co/augmented-reality"
        }
      ],
      "locations": [
        {
          "id": 1692,
          "tag_type": "LocationTag",
          "name": "san francisco",
          "display_name": "San Francisco",
          "angellist_url": "https://angel.co/san-francisco"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 94212,
          "tag_type": "CompanyTypeTag",
          "name": "startup",
          "display_name": "Startup",
          "angellist_url": "https://angel.co/startup"
        }, {
          "id": 147448,
          "tag_type": "CompanyTypeTag",
          "name": "google glass",
          "display_name": "Google Glass",
          "angellist_url": "https://angel.co/google-glass-5"
        }
      ],
      "status": {
        "id": 127716,
        "message": "Check out Cooper's Case Study on Augmedix: http://vimeo.com/85278836",
        "created_at": "2014-03-10T05:13:27Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-original.JPG"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-original.jpg"
        }
      ]
    },
    "location": "San Francisco",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg"
  }, {
    "id": 31272,
    "title": "Systems and Software Security Engineer",
    "created_at": "2014-06-18T18:45:59Z",
    "updated_at": "2014-06-20T18:32:38Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.5",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 100000,
    "angellist_url": "https://angel.co/jobs?startup_id=162396",
    "tags": [
      {
        "id": 1692,
        "tag_type": "LocationTag",
        "name": "san francisco",
        "display_name": "San Francisco",
        "angellist_url": "https://angel.co/san-francisco"
      }, {
        "id": 14726,
        "tag_type": "RoleTag",
        "name": "developer",
        "display_name": "Developer",
        "angellist_url": "https://angel.co/developer"
      }
    ],
    "startup": {
      "id": 162396,
      "hidden": false,
      "community_profile": false,
      "name": "Augmedix",
      "angellist_url": "https://angel.co/augmedix",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-medium_jpg.jpg?buster=1366181116",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-thumb_jpg.jpg?buster=1366181116",
      "quality": 8,
      "product_desc": "Augmedix -- a service powered by Google Glass -- reclaims the hours physicians spend on the computer entering or retrieving data from electronic health records and refocuses them on what matters most: patient care.\n",
      "high_concept": "A service for medical doctors that's powered by Google Glass.",
      "follower_count": 505,
      "company_url": "http://www.augmedix.com",
      "created_at": "2013-01-30T18:52:59Z",
      "updated_at": "2014-06-18T16:20:43Z",
      "crunchbase_url": "http://www.crunchbase.com/company/augmedix",
      "twitter_url": "https://twitter.com/AugmedixInc",
      "blog_url": "http://www.augmedix.com/updates",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "https://www.youtube.com/watch?v=umjICxg4Z-0",
      "markets": [
        {
          "id": 3,
          "tag_type": "MarketTag",
          "name": "mobile",
          "display_name": "Mobile",
          "angellist_url": "https://angel.co/mobile-2"
        }, {
          "id": 13,
          "tag_type": "MarketTag",
          "name": "health care",
          "display_name": "Health Care",
          "angellist_url": "https://angel.co/health-care"
        }, {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1054,
          "tag_type": "MarketTag",
          "name": "augmented reality",
          "display_name": "Augmented Reality",
          "angellist_url": "https://angel.co/augmented-reality"
        }
      ],
      "locations": [
        {
          "id": 1692,
          "tag_type": "LocationTag",
          "name": "san francisco",
          "display_name": "San Francisco",
          "angellist_url": "https://angel.co/san-francisco"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 94212,
          "tag_type": "CompanyTypeTag",
          "name": "startup",
          "display_name": "Startup",
          "angellist_url": "https://angel.co/startup"
        }, {
          "id": 147448,
          "tag_type": "CompanyTypeTag",
          "name": "google glass",
          "display_name": "Google Glass",
          "angellist_url": "https://angel.co/google-glass-5"
        }
      ],
      "status": {
        "id": 127716,
        "message": "Check out Cooper's Case Study on Augmedix: http://vimeo.com/85278836",
        "created_at": "2014-03-10T05:13:27Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-original.JPG"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-original.jpg"
        }
      ]
    },
    "location": "San Francisco",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg"
  }, {
    "id": 31270,
    "title": "Network Engineer/System Administrator",
    "created_at": "2014-06-18T18:43:42Z",
    "updated_at": "2014-06-20T18:33:42Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.5",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 100000,
    "angellist_url": "https://angel.co/jobs?startup_id=162396",
    "tags": [
      {
        "id": 1692,
        "tag_type": "LocationTag",
        "name": "san francisco",
        "display_name": "San Francisco",
        "angellist_url": "https://angel.co/san-francisco"
      }, {
        "id": 14726,
        "tag_type": "RoleTag",
        "name": "developer",
        "display_name": "Developer",
        "angellist_url": "https://angel.co/developer"
      }
    ],
    "startup": {
      "id": 162396,
      "hidden": false,
      "community_profile": false,
      "name": "Augmedix",
      "angellist_url": "https://angel.co/augmedix",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-medium_jpg.jpg?buster=1366181116",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-thumb_jpg.jpg?buster=1366181116",
      "quality": 8,
      "product_desc": "Augmedix -- a service powered by Google Glass -- reclaims the hours physicians spend on the computer entering or retrieving data from electronic health records and refocuses them on what matters most: patient care.\n",
      "high_concept": "A service for medical doctors that's powered by Google Glass.",
      "follower_count": 505,
      "company_url": "http://www.augmedix.com",
      "created_at": "2013-01-30T18:52:59Z",
      "updated_at": "2014-06-18T16:20:43Z",
      "crunchbase_url": "http://www.crunchbase.com/company/augmedix",
      "twitter_url": "https://twitter.com/AugmedixInc",
      "blog_url": "http://www.augmedix.com/updates",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "https://www.youtube.com/watch?v=umjICxg4Z-0",
      "markets": [
        {
          "id": 3,
          "tag_type": "MarketTag",
          "name": "mobile",
          "display_name": "Mobile",
          "angellist_url": "https://angel.co/mobile-2"
        }, {
          "id": 13,
          "tag_type": "MarketTag",
          "name": "health care",
          "display_name": "Health Care",
          "angellist_url": "https://angel.co/health-care"
        }, {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1054,
          "tag_type": "MarketTag",
          "name": "augmented reality",
          "display_name": "Augmented Reality",
          "angellist_url": "https://angel.co/augmented-reality"
        }
      ],
      "locations": [
        {
          "id": 1692,
          "tag_type": "LocationTag",
          "name": "san francisco",
          "display_name": "San Francisco",
          "angellist_url": "https://angel.co/san-francisco"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 94212,
          "tag_type": "CompanyTypeTag",
          "name": "startup",
          "display_name": "Startup",
          "angellist_url": "https://angel.co/startup"
        }, {
          "id": 147448,
          "tag_type": "CompanyTypeTag",
          "name": "google glass",
          "display_name": "Google Glass",
          "angellist_url": "https://angel.co/google-glass-5"
        }
      ],
      "status": {
        "id": 127716,
        "message": "Check out Cooper's Case Study on Augmedix: http://vimeo.com/85278836",
        "created_at": "2014-03-10T05:13:27Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-original.JPG"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-original.jpg"
        }
      ]
    },
    "location": "San Francisco",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg"
  }, {
    "id": 31268,
    "title": "Technical Support Engineer",
    "created_at": "2014-06-18T18:42:11Z",
    "updated_at": "2014-06-20T18:39:50Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.5",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 100000,
    "angellist_url": "https://angel.co/jobs?startup_id=162396",
    "tags": [
      {
        "id": 1692,
        "tag_type": "LocationTag",
        "name": "san francisco",
        "display_name": "San Francisco",
        "angellist_url": "https://angel.co/san-francisco"
      }, {
        "id": 14726,
        "tag_type": "RoleTag",
        "name": "developer",
        "display_name": "Developer",
        "angellist_url": "https://angel.co/developer"
      }
    ],
    "startup": {
      "id": 162396,
      "hidden": false,
      "community_profile": false,
      "name": "Augmedix",
      "angellist_url": "https://angel.co/augmedix",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-medium_jpg.jpg?buster=1366181116",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-thumb_jpg.jpg?buster=1366181116",
      "quality": 8,
      "product_desc": "Augmedix -- a service powered by Google Glass -- reclaims the hours physicians spend on the computer entering or retrieving data from electronic health records and refocuses them on what matters most: patient care.\n",
      "high_concept": "A service for medical doctors that's powered by Google Glass.",
      "follower_count": 505,
      "company_url": "http://www.augmedix.com",
      "created_at": "2013-01-30T18:52:59Z",
      "updated_at": "2014-06-18T16:20:43Z",
      "crunchbase_url": "http://www.crunchbase.com/company/augmedix",
      "twitter_url": "https://twitter.com/AugmedixInc",
      "blog_url": "http://www.augmedix.com/updates",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "https://www.youtube.com/watch?v=umjICxg4Z-0",
      "markets": [
        {
          "id": 3,
          "tag_type": "MarketTag",
          "name": "mobile",
          "display_name": "Mobile",
          "angellist_url": "https://angel.co/mobile-2"
        }, {
          "id": 13,
          "tag_type": "MarketTag",
          "name": "health care",
          "display_name": "Health Care",
          "angellist_url": "https://angel.co/health-care"
        }, {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1054,
          "tag_type": "MarketTag",
          "name": "augmented reality",
          "display_name": "Augmented Reality",
          "angellist_url": "https://angel.co/augmented-reality"
        }
      ],
      "locations": [
        {
          "id": 1692,
          "tag_type": "LocationTag",
          "name": "san francisco",
          "display_name": "San Francisco",
          "angellist_url": "https://angel.co/san-francisco"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 94212,
          "tag_type": "CompanyTypeTag",
          "name": "startup",
          "display_name": "Startup",
          "angellist_url": "https://angel.co/startup"
        }, {
          "id": 147448,
          "tag_type": "CompanyTypeTag",
          "name": "google glass",
          "display_name": "Google Glass",
          "angellist_url": "https://angel.co/google-glass-5"
        }
      ],
      "status": {
        "id": 127716,
        "message": "Check out Cooper's Case Study on Augmedix: http://vimeo.com/85278836",
        "created_at": "2014-03-10T05:13:27Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-original.JPG"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-original.jpg"
        }
      ]
    },
    "location": "San Francisco",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg"
  }, {
    "id": 31266,
    "title": "Audio and Voice Solutions Engineer",
    "created_at": "2014-06-18T18:40:26Z",
    "updated_at": "2014-06-20T18:41:14Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.5",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 100000,
    "angellist_url": "https://angel.co/jobs?startup_id=162396",
    "tags": [
      {
        "id": 1692,
        "tag_type": "LocationTag",
        "name": "san francisco",
        "display_name": "San Francisco",
        "angellist_url": "https://angel.co/san-francisco"
      }, {
        "id": 14726,
        "tag_type": "RoleTag",
        "name": "developer",
        "display_name": "Developer",
        "angellist_url": "https://angel.co/developer"
      }
    ],
    "startup": {
      "id": 162396,
      "hidden": false,
      "community_profile": false,
      "name": "Augmedix",
      "angellist_url": "https://angel.co/augmedix",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-medium_jpg.jpg?buster=1366181116",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162396-404fae06f4ba46adf2d88e53f791f22c-thumb_jpg.jpg?buster=1366181116",
      "quality": 8,
      "product_desc": "Augmedix -- a service powered by Google Glass -- reclaims the hours physicians spend on the computer entering or retrieving data from electronic health records and refocuses them on what matters most: patient care.\n",
      "high_concept": "A service for medical doctors that's powered by Google Glass.",
      "follower_count": 505,
      "company_url": "http://www.augmedix.com",
      "created_at": "2013-01-30T18:52:59Z",
      "updated_at": "2014-06-18T16:20:43Z",
      "crunchbase_url": "http://www.crunchbase.com/company/augmedix",
      "twitter_url": "https://twitter.com/AugmedixInc",
      "blog_url": "http://www.augmedix.com/updates",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "https://www.youtube.com/watch?v=umjICxg4Z-0",
      "markets": [
        {
          "id": 3,
          "tag_type": "MarketTag",
          "name": "mobile",
          "display_name": "Mobile",
          "angellist_url": "https://angel.co/mobile-2"
        }, {
          "id": 13,
          "tag_type": "MarketTag",
          "name": "health care",
          "display_name": "Health Care",
          "angellist_url": "https://angel.co/health-care"
        }, {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1054,
          "tag_type": "MarketTag",
          "name": "augmented reality",
          "display_name": "Augmented Reality",
          "angellist_url": "https://angel.co/augmented-reality"
        }
      ],
      "locations": [
        {
          "id": 1692,
          "tag_type": "LocationTag",
          "name": "san francisco",
          "display_name": "San Francisco",
          "angellist_url": "https://angel.co/san-francisco"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 94212,
          "tag_type": "CompanyTypeTag",
          "name": "startup",
          "display_name": "Startup",
          "angellist_url": "https://angel.co/startup"
        }, {
          "id": 147448,
          "tag_type": "CompanyTypeTag",
          "name": "google glass",
          "display_name": "Google Glass",
          "angellist_url": "https://angel.co/google-glass-5"
        }
      ],
      "status": {
        "id": 127716,
        "message": "Check out Cooper's Case Study on Augmedix: http://vimeo.com/85278836",
        "created_at": "2014-03-10T05:13:27Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-original.JPG"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/d866df98663b4873de1681e54d1a1b02-original.jpg"
        }
      ]
    },
    "location": "San Francisco",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/da/162396/6128abc3054c06d10f6ef2a2e7b12b1a-thumb_jpg.jpg"
  }, {
    "id": 31260,
    "title": "COO",
    "created_at": "2014-06-18T18:29:31Z",
    "updated_at": "2014-06-18T18:29:31Z",
    "equity_cliff": "1.0",
    "equity_min": "2.0",
    "equity_max": "10.0",
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "full-time",
    "salary_min": 30000,
    "salary_max": 50000,
    "angellist_url": "https://angel.co/jobs?startup_id=290856",
    "tags": [
      {
        "id": 1691,
        "tag_type": "LocationTag",
        "name": "washington, dc",
        "display_name": "Washington, DC",
        "angellist_url": "https://angel.co/washington-dc"
      }, {
        "id": 129175,
        "tag_type": "RoleTag",
        "name": "operations",
        "display_name": "Operations",
        "angellist_url": "https://angel.co/operations-1"
      }
    ],
    "startup": {
      "id": 290856,
      "hidden": false,
      "community_profile": false,
      "name": "Ape Man Foods",
      "angellist_url": "https://angel.co/ape-man-foods",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/290856-c3b8d3903e3bc3aeeab9715e458fea67-medium_jpg.jpg?buster=1383771826",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/290856-c3b8d3903e3bc3aeeab9715e458fea67-thumb_jpg.jpg?buster=1383771826",
      "launch_date": null,
      "quality": 3,
      "product_desc": "Ape Man Foods makes you want to eat your vegetables. We make delicious, familiar foods out of whole plants which allows you to improve your diet in a convenient and tasty way. Customers can eat whole plants but not have to give up eating foods like tacos and brownies, nut butters, breads, and even bacon (we make it out of eggplant) or go to the trouble of creating interesting, satisfying plant food themselves. Our customers include raw vegans, vegans, vegetarians, those on a paleo diet or gluten free diet, and generally anyone looking to add more non-industrial, unprocessed, whole plant, organic foods to their diet - real food instead of nutrition-less calories. Many of our customers have illnesses that can be improved by eating pure plant foods; others are interested in peak physical health and athletic performance, ideal weight and mental clarity. Ape Man Foods has a great relationship with Whole Foods Market in the DC Metro area, where we are in 6 WFM locations and growing rapidly. ",
      "high_concept": "Pure Whole Plant Prepared Foods",
      "follower_count": 4,
      "company_url": "http://www.apemanfoods.com; www.facebook.com/apemanfoods",
      "created_at": "2013-11-06T21:03:49Z",
      "updated_at": "2014-06-17T03:30:52Z",
      "crunchbase_url": null,
      "twitter_url": null,
      "blog_url": null,
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": null,
      "markets": [
        {
          "id": 72,
          "tag_type": "MarketTag",
          "name": "food and beverages",
          "display_name": "Food and Beverages",
          "angellist_url": "https://angel.co/food-and-beverages"
        }, {
          "id": 418,
          "tag_type": "MarketTag",
          "name": "personal health",
          "display_name": "Personal Health",
          "angellist_url": "https://angel.co/personal-health"
        }, {
          "id": 1103,
          "tag_type": "MarketTag",
          "name": "health and wellness",
          "display_name": "Health and Wellness",
          "angellist_url": "https://angel.co/health-and-wellness"
        }
      ],
      "locations": [
        {
          "id": 1691,
          "tag_type": "LocationTag",
          "name": "washington, dc",
          "display_name": "Washington, DC",
          "angellist_url": "https://angel.co/washington-dc"
        }
      ],
      "company_size": "1-10",
      "company_type": [],
      "status": null,
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/ec/290856/10dc7fc376e43db523cab76e47475f54-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/ec/290856/10dc7fc376e43db523cab76e47475f54-original.jpg"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/ec/290856/bbe74626d63282007fa14ac801d90622-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/ec/290856/bbe74626d63282007fa14ac801d90622-original.jpg"
        }
      ],
      "fundraising": {
        "round_opened_at": "2013-11-06",
        "raising_amount": 320000,
        "pre_money_valuation": null,
        "discount": null,
        "equity_basis": "equity",
        "updated_at": "2013-11-06T21:21:25Z",
        "raised_amount": 0,
        "public": true
      }
    },
    "location": "Washington, DC",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/ec/290856/10dc7fc376e43db523cab76e47475f54-thumb_jpg.jpg"
  }, {
    "id": 31262,
    "title": "Corporate Sales Representative  ",
    "created_at": "2014-06-18T18:32:58Z",
    "updated_at": "2014-06-18T18:34:31Z",
    "equity_cliff": "1.0",
    "equity_min": null,
    "equity_max": null,
    "equity_vest": "4.0",
    "currency_code": "USD",
    "job_type": "internship",
    "salary_min": 2000,
    "salary_max": 5000,
    "angellist_url": "https://angel.co/jobs?startup_id=162734",
    "tags": [
      {
        "id": 15525,
        "tag_type": "SkillTag",
        "name": "business development",
        "display_name": "Business Development",
        "angellist_url": "https://angel.co/business-development-1"
      }, {
        "id": 15669,
        "tag_type": "SkillTag",
        "name": "social media",
        "display_name": "Social Media",
        "angellist_url": "https://angel.co/social-media-1"
      }, {
        "id": 16278,
        "tag_type": "SkillTag",
        "name": "sales",
        "display_name": "Sales",
        "angellist_url": "https://angel.co/sales-1"
      }, {
        "id": 16928,
        "tag_type": "SkillTag",
        "name": "sales strategy and management",
        "display_name": "Sales Strategy and Management",
        "angellist_url": "https://angel.co/sales-strategy-and-management"
      }, {
        "id": 79890,
        "tag_type": "SkillTag",
        "name": "outside sales",
        "display_name": "Outside Sales",
        "angellist_url": "https://angel.co/outside-sales"
      }, {
        "id": 1664,
        "tag_type": "LocationTag",
        "name": "new york, ny",
        "display_name": "New York City",
        "angellist_url": "https://angel.co/new-york-ny-1"
      }, {
        "id": 80488,
        "tag_type": "RoleTag",
        "name": "sales",
        "display_name": "Sales",
        "angellist_url": "https://angel.co/sales-2"
      }
    ],
    "startup": {
      "id": 162734,
      "hidden": false,
      "community_profile": false,
      "name": "Centscere",
      "angellist_url": "https://angel.co/centscere",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162734-ee9bf0809d0f4abfa17431bb5a77def8-medium_jpg.jpg?buster=1394169914",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/162734-ee9bf0809d0f4abfa17431bb5a77def8-thumb_jpg.jpg?buster=1394169914",
      "quality": 4,
      "product_desc": "Centscere is a social media donation platform designed to make charitable giving simple, affordable, and routine. Our service empowers its users to attach monetary donations to the social media actions they execute, and designate a charity to receive that money. Currently, users can can donate every time they Tweet, Facebook Post or 'Like'.\n",
      "high_concept": "Turning everyday behavior into charitable moments",
      "follower_count": 15,
      "company_url": "https://www.centscere.com",
      "created_at": "2013-01-31T16:22:08Z",
      "updated_at": "2014-05-29T15:31:53Z",
      "crunchbase_url": null,
      "twitter_url": "https://twitter.com/centscere",
      "blog_url": "",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "",
      "markets": [
        {
          "id": 6,
          "tag_type": "MarketTag",
          "name": "social media",
          "display_name": "Social Media",
          "angellist_url": "https://angel.co/social-media"
        }, {
          "id": 17,
          "tag_type": "MarketTag",
          "name": "financial services",
          "display_name": "Financial Services",
          "angellist_url": "https://angel.co/financial-services-1"
        }, {
          "id": 324,
          "tag_type": "MarketTag",
          "name": "nonprofits",
          "display_name": "Nonprofits",
          "angellist_url": "https://angel.co/nonprofits"
        }, {
          "id": 3089,
          "tag_type": "MarketTag",
          "name": "charity",
          "display_name": "Charity",
          "angellist_url": "https://angel.co/charity"
        }
      ],
      "locations": [
        {
          "id": 2054,
          "tag_type": "LocationTag",
          "name": "syracuse",
          "display_name": "Syracuse",
          "angellist_url": "https://angel.co/syracuse"
        }
      ],
      "company_size": "1-10",
      "company_type": [
        {
          "id": 125202,
          "tag_type": "CompanyTypeTag",
          "name": "Early Stage",
          "display_name": "Early Stage",
          "angellist_url": "https://angel.co/early-stage"
        }
      ],
      "status": {
        "id": 131834,
        "message": "Centscere wins Startup Labs Syracuse! $150,000 convertible note and $50,000 in marketing services from Eric Mower and Associates.",
        "created_at": "2014-04-15T03:00:35Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/c572c2a4e979310d85576a5f438ab672-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/c572c2a4e979310d85576a5f438ab672-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/cb25fd83ac38d380ec5a3b3f1be056ed-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/cb25fd83ac38d380ec5a3b3f1be056ed-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/bf772c199dea7380bd78e02fec72a47a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/bf772c199dea7380bd78e02fec72a47a-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/f8da12cbfa1d22b2d135bdbff94e4bbc-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/f8da12cbfa1d22b2d135bdbff94e4bbc-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/400d332b97b3696b91b265b8b7fd0453-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/400d332b97b3696b91b265b8b7fd0453-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/4008ff9c9f4b3512e6073698597cf6af-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/4008ff9c9f4b3512e6073698597cf6af-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/b76af68d32cbb6e800cbb3d6b67ed968-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/b76af68d32cbb6e800cbb3d6b67ed968-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/8920c60be04d1bfa449fb504f078df80-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/8920c60be04d1bfa449fb504f078df80-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/e7ae1884fa3a43447ce559ff351efd86-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/e7ae1884fa3a43447ce559ff351efd86-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/76ff8251527449ff7a1fec512502f227-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/76ff8251527449ff7a1fec512502f227-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/fd6de4e432b34fb03ebd587bc9e699bf-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/fd6de4e432b34fb03ebd587bc9e699bf-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/bef59ea08067373212ab2c2279ea8d49-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/bef59ea08067373212ab2c2279ea8d49-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/ac8d1ff6be17d2f9752254557cdc063a-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/ac8d1ff6be17d2f9752254557cdc063a-original.png"
        }, {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/5f5ba52bed9b9453f80078be09393cd4-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/5f5ba52bed9b9453f80078be09393cd4-original.jpg"
        }
      ]
    },
    "location": "Syracuse",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/48/162734/c572c2a4e979310d85576a5f438ab672-thumb_jpg.jpg"
  }, {
    "id": 31264,
    "title": "Part-time/Full-time UI Architect",
    "created_at": "2014-06-18T18:36:50Z",
    "updated_at": "2014-06-18T18:37:52Z",
    "equity_cliff": "1.0",
    "equity_min": "0.0",
    "equity_max": "0.0",
    "equity_vest": "5.0",
    "currency_code": "USD",
    "job_type": "contract",
    "salary_min": 60000,
    "salary_max": 80000,
    "angellist_url": "https://angel.co/jobs?startup_id=125476",
    "tags": [
      {
        "id": 14781,
        "tag_type": "SkillTag",
        "name": "javascript",
        "display_name": "Javascript",
        "angellist_url": "https://angel.co/javascript"
      }, {
        "id": 15592,
        "tag_type": "SkillTag",
        "name": "html",
        "display_name": "HTML",
        "angellist_url": "https://angel.co/html"
      }, {
        "id": 15593,
        "tag_type": "SkillTag",
        "name": "css",
        "display_name": "CSS",
        "angellist_url": "https://angel.co/css"
      }, {
        "id": 15594,
        "tag_type": "SkillTag",
        "name": "jquery",
        "display_name": "jQuery",
        "angellist_url": "https://angel.co/jquery"
      }, {
        "id": 16022,
        "tag_type": "SkillTag",
        "name": "ajax",
        "display_name": "AJAX",
        "angellist_url": "https://angel.co/ajax"
      }, {
        "id": 80376,
        "tag_type": "SkillTag",
        "name": "html5 & css3",
        "display_name": "HTML5 & CSS3",
        "angellist_url": "https://angel.co/html5-css3"
      }, {
        "id": 1620,
        "tag_type": "LocationTag",
        "name": "boston",
        "display_name": "Boston",
        "angellist_url": "https://angel.co/boston"
      }, {
        "id": 14883,
        "tag_type": "RoleTag",
        "name": "designer",
        "display_name": "Designer",
        "angellist_url": "https://angel.co/designer"
      }
    ],
    "startup": {
      "id": 125476,
      "hidden": false,
      "community_profile": false,
      "name": "QMedic",
      "angellist_url": "https://angel.co/qmedic",
      "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/125476-250e70287684f1c8978939087690667a-medium_jpg.jpg?buster=1348604173",
      "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/125476-250e70287684f1c8978939087690667a-thumb_jpg.jpg?buster=1348604173",
      "quality": 7,
      "product_desc": "QMedic’s smart wearable medical alert service passively detects abnormal events and early signs of decline, including late wake-up times, sleep disturbances, wear/non-wear, bouts of inactivity, indoor location, time outside the home, and changes in mobility and flexibility.  The service sends real-time alerts to caregivers, enabling them to proactively monitor patient safety and wellness 24 hours/day.   QMedic is the first solution of its kind to sample continuously and not require battery recharge, making it easy for seniors to comply.  By applying machine learning to this longitudinal data, QMedic offers limitless potential for caregivers not only to detect but also predict functional decline in the home.",
      "high_concept": "24/7 proactive wearable monitoring for at-risk seniors",
      "follower_count": 94,
      "company_url": "http://www.qmedichealth.com",
      "created_at": "2012-09-24T20:50:53Z",
      "updated_at": "2014-06-06T17:20:30Z",
      "crunchbase_url": "http://www.crunchbase.com/company/qmedic",
      "twitter_url": "http://twitter.com/@qmedichealth",
      "blog_url": "http://www.qmedichealth.com/blogs/news",
      "facebook_url": null,
      "linkedin_url": null,
      "video_url": "http://youtu.be/mTO5goQ4sA8?rel=0",
      "markets": [
        {
          "id": 175,
          "tag_type": "MarketTag",
          "name": "health care information technology",
          "display_name": "Health Care Information Technology",
          "angellist_url": "https://angel.co/health-care-information-technology"
        }, {
          "id": 1258,
          "tag_type": "MarketTag",
          "name": "mobile health",
          "display_name": "Mobile Health",
          "angellist_url": "https://angel.co/mobile-health"
        }, {
          "id": 2909,
          "tag_type": "MarketTag",
          "name": "elder care",
          "display_name": "Elder Care",
          "angellist_url": "https://angel.co/elder-care"
        }
      ],
      "locations": [
        {
          "id": 1620,
          "tag_type": "LocationTag",
          "name": "boston",
          "display_name": "Boston",
          "angellist_url": "https://angel.co/boston"
        }
      ],
      "company_size": "1-10",
      "company_type": [],
      "status": {
        "id": 132227,
        "message": "QMedic is hiring for multiple software developer positions! Referral bonus of $1K/successful hire. http://bit.ly/1l366J3",
        "created_at": "2014-04-17T19:55:46Z"
      },
      "screenshots": [
        {
          "thumb": "https://s3.amazonaws.com/screenshots.angel.co/5c/125476/92ba57b80011117efd42c5c86173ee2f-thumb_jpg.jpg",
          "original": "https://s3.amazonaws.com/screenshots.angel.co/5c/125476/92ba57b80011117efd42c5c86173ee2f-original.png"
        }
      ]
    },
    "location": "Boston",
    "screenshot": "https://s3.amazonaws.com/screenshots.angel.co/5c/125476/92ba57b80011117efd42c5c86173ee2f-thumb_jpg.jpg"
  }
];


},{}],7:[function(require,module,exports){
'use strict';
var Ctrl, JobCtrl, async, data,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("../ctrl.coffee");

data = require("./data");

async = require("async");

JobCtrl = (function(_super) {
  __extends(JobCtrl, _super);

  JobCtrl.$inject = ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http"];

  JobCtrl.prototype.filter = function(card, cb) {
    var p;
    p = this.http.get("" + this.baseUrl + "/startups/" + card.startup.id + "/", {
      cache: true
    });
    return p.success((function(_this) {
      return function(startup) {
        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
        card.startup = startup;
        card.location = (_ref = startup.locations) != null ? (_ref1 = _ref[0]) != null ? _ref1.display_name : void 0 : void 0;
        card.screenshot = ((_ref2 = startup.screenshots) != null ? (_ref3 = _ref2[0]) != null ? _ref3.thumb : void 0 : void 0) || startup.logo_url;
        if (card.description && card.startup.product_desc && ((_ref4 = startup.screenshots) != null ? (_ref5 = _ref4[0]) != null ? _ref5.thumb : void 0 : void 0)) {
          if (!_this.scope.currentImage) {
            _this.scope.currentImage = (_ref6 = startup.screenshots[0]) != null ? _ref6.thumb : void 0;
          }
          return typeof cb === "function" ? cb(card) : void 0;
        } else {
          return typeof cb === "function" ? cb(null) : void 0;
        }
      };
    })(this));
  };

  JobCtrl.prototype.process = function() {
    return this.dataBuffer.splice(0, 4).forEach((function(_this) {
      return function(card) {
        card.index = _this.index++;
        return _this.scope.cards.push(card);
      };
    })(this));
  };

  JobCtrl.prototype.loadMore = function() {
    if (this.loading || this.done) {
      return;
    }
    if (this.dataBuffer.length < 20) {
      this.loading = true;
      this.loadPage((function(_this) {
        return function() {
          _this.process();
          return _this.loading = false;
        };
      })(this));
      return;
    }
    return this.process();
  };

  JobCtrl.prototype.loadPage = function(cb) {
    var p;
    p = this.http.get("" + this.baseUrl + "jobs?page=" + (this.page++));
    p.error((function(_this) {
      return function(err) {};
    })(this));
    return p.success((function(_this) {
      return function(data) {
        if (data.page === data.last_page) {
          _this.done = true;
        }
        return async.each(data.jobs, function(card, cb) {
          return _this.filter(card, function(card) {
            if (card) {
              _this.dataBuffer.push(card);
            }
            return cb();
          });
        }, function() {
          return typeof cb === "function" ? cb() : void 0;
        }, function() {
          return typeof cb === "function" ? cb() : void 0;
        });
      };
    })(this));
  };

  function JobCtrl(scope, stateParams, state, timeout, famous, http) {
    var card, _i, _len, _ref;
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.timeout = timeout;
    this.famous = famous;
    this.http = http;
    this.clickHelp = __bind(this.clickHelp, this);
    this.loadPage = __bind(this.loadPage, this);
    this.loadMore = __bind(this.loadMore, this);
    this.process = __bind(this.process, this);
    this.filter = __bind(this.filter, this);
    JobCtrl.__super__.constructor.call(this, this.scope);
    this.baseUrl = "http://simplecareers-test.apigee.net/angel/";
    this.index = 0;
    this.page = 0;
    this.done = false;
    this.loading = false;
    this.dataBuffer = [];
    this.scope.cards = data;
    _ref = this.scope.cards;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      card.index = this.index++;
    }
    this.scope.threshold = 100;
    this.scope.cardSpacing = 10;
    this.scope.curIdx = 0;
    this.scope.$on("next", (function(_this) {
      return function() {
        _this.scope.curIdx++;
        _this.scope.cards.shift();
        if (_this.scope.cards.length < 4) {
          return _this.loadMore();
        }
      };
    })(this));
  }

  JobCtrl.prototype.clickHelp = function() {
    return this.pass();
  };

  return JobCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('JobCtrl', JobCtrl);


},{"../ctrl.coffee":4,"./data":6,"async":11}],8:[function(require,module,exports){
'use strict';
var Ctrl, JobCardCtrl,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ctrl = require("../ctrl.coffee");

JobCardCtrl = (function(_super) {
  __extends(JobCardCtrl, _super);

  JobCardCtrl.$inject = ['$scope', '$stateParams', '$state', "$timeout", "$famous", "$http"];

  function JobCardCtrl(scope, stateParams, state, timeout, famous, http) {
    var sync;
    this.scope = scope;
    this.stateParams = stateParams;
    this.state = state;
    this.timeout = timeout;
    this.famous = famous;
    this.http = http;
    this.getPosition = __bind(this.getPosition, this);
    this.scrollXPosition = __bind(this.scrollXPosition, this);
    this.getRotation = __bind(this.getRotation, this);
    this.clickHelp = __bind(this.clickHelp, this);
    this.checkStatus = __bind(this.checkStatus, this);
    this.commitFav = __bind(this.commitFav, this);
    this.animateFav = __bind(this.animateFav, this);
    this.commitPass = __bind(this.commitPass, this);
    this.animatePass = __bind(this.animatePass, this);
    this.animateNoChange = __bind(this.animateNoChange, this);
    this.reset = __bind(this.reset, this);
    this.syncEnd = __bind(this.syncEnd, this);
    this.syncStart = __bind(this.syncStart, this);
    this.syncUpdate = __bind(this.syncUpdate, this);
    JobCardCtrl.__super__.constructor.call(this, this.scope);
    this.scope.card.pos = this.pos = new this.Transitionable([0, 0, 0]);
    this.rot = new this.Transitionable([0, 0, 0]);
    sync = new this.GenericSync(['mouse', 'touch']);
    sync.on("start", this.syncStart);
    sync.on("end", this.syncEnd);
    sync.on("update", this.syncUpdate);
    this.scope.swipePipe = new this.EventHandler();
    this.scope.swipePipe.pipe(sync);
  }

  JobCardCtrl.prototype.syncUpdate = function(e) {
    var newX, newY;
    if (this.startDrag) {
      this.dragging = true;
      newX = e.clientX - this.startX;
      newY = e.clientY - this.startY;
      this.checkStatus(newX);
      this.pos.set([newX, newY, 0]);
      return this.rot.set([0, 0, (newX / this.scope.threshold) * 3.14 / 16]);
    }
  };

  JobCardCtrl.prototype.syncStart = function(e) {
    if (this.dragging) {
      return;
    }
    this.startDrag = true;
    this.startX = e.clientX;
    return this.startY = e.clientY;
  };

  JobCardCtrl.prototype.syncEnd = function(e) {
    var pos;
    this.startDrag = false;
    pos = this.pos.get();
    this.timeout((function(_this) {
      return function() {
        return _this.scope.status = "nochange";
      };
    })(this), 150);
    if (this.scope.status === "pass") {
      return this.animatePass();
    } else if (this.scope.status === "fav") {
      return this.animateFav();
    } else {
      return this.animateNoChange();
    }
  };

  JobCardCtrl.prototype.reset = function() {
    return this.dragging = false;
  };

  JobCardCtrl.prototype.animateNoChange = function() {
    return this.pos.set([0, 0, 0], {
      duration: 300,
      curve: 'inSine'
    }, (function(_this) {
      return function() {
        return _this.reset();
      };
    })(this));
  };

  JobCardCtrl.prototype.animatePass = function() {
    return this.pos.set([-320 * 2, 568 * 2, 0], {
      duration: 300,
      curve: 'inSine'
    }, (function(_this) {
      return function() {
        _this.reset();
        return _this.commitPass();
      };
    })(this));
  };

  JobCardCtrl.prototype.commitPass = function() {
    return this.timeout((function(_this) {
      return function() {
        return _this.scope.$emit("next");
      };
    })(this));
  };

  JobCardCtrl.prototype.animateFav = function() {
    return this.pos.set([320 * 2, 568 * 2, 0], {
      duration: 300,
      curve: 'inSine'
    }, (function(_this) {
      return function() {
        _this.reset();
        return _this.commitFav();
      };
    })(this));
  };

  JobCardCtrl.prototype.commitFav = function() {
    return this.timeout((function(_this) {
      return function() {
        return _this.scope.$emit("next");
      };
    })(this));
  };

  JobCardCtrl.prototype.checkStatus = function(newX) {
    return this.timeout((function(_this) {
      return function() {
        if (newX < -_this.scope.threshold / 2) {
          return _this.scope.status = "pass";
        } else if (newX > _this.scope.threshold / 2) {
          return _this.scope.status = "fav";
        } else {
          return _this.scope.status = "nochange";
        }
      };
    })(this));
  };

  JobCardCtrl.prototype.clickHelp = function() {
    return this.pass();
  };

  JobCardCtrl.prototype.getRotation = function(idx, curIdx) {
    var rot;
    if (idx !== curIdx) {
      return [0, 0, 0];
    }
    rot = this.rot.get();
    return rot;
  };

  JobCardCtrl.prototype.scrollXPosition = function() {
    var pos;
    pos = this.scope.cards[0].pos.get();
    return Math.max(0, Math.min(1 - Math.abs(pos[0] / this.scope.threshold), 1));
  };

  JobCardCtrl.prototype.getPosition = function(idx, curIdx) {
    var diff, pos, position;
    pos = this.pos.get();
    position = pos;
    if (idx > curIdx) {
      diff = idx - curIdx;
      if (diff <= 2) {
        position = [0, this.scope.cardSpacing * (diff - 1) + this.scope.cardSpacing * this.scrollXPosition(), -this.scope.cardSpacing * (diff - 1) - this.scope.cardSpacing * this.scrollXPosition()];
      } else {
        position = [0, this.scope.cardSpacing * 2, -this.scope.cardSpacing * 2];
      }
    }
    return position;
  };

  return JobCardCtrl;

})(Ctrl);

angular.module('simplecareersApp').controller('JobCardCtrl', JobCardCtrl);


},{"../ctrl.coffee":4}],9:[function(require,module,exports){
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


},{"../ctrl.coffee":4}],10:[function(require,module,exports){
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


},{"../ctrl.coffee":4}],11:[function(require,module,exports){
(function (process){
/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
/*jshint onevar: false, indent:4 */
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _toString = Object.prototype.toString;

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = function (fn) {
              // not a direct alias for IE10 compatibility
              setImmediate(fn);
            };
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(done) );
        });
        function done(err) {
          if (err) {
              callback(err);
              callback = function () {};
          }
          else {
              completed += 1;
              if (completed >= arr.length) {
                  callback();
              }
          }
        }
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback();
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        if (!callback) {
            eachfn(arr, function (x, callback) {
                iterator(x.value, function (err) {
                    callback(err);
                });
            });
        } else {
            var results = [];
            eachfn(arr, function (x, callback) {
                iterator(x.value, function (err, v) {
                    results[x.index] = v;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        var remainingTasks = keys.length
        if (!remainingTasks) {
            return callback();
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            remainingTasks--
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (!remainingTasks) {
                var theCallback = callback;
                // prevent final callback from calling itself if it errors
                callback = function () {};

                theCallback(null, results);
            }
        });

        _each(keys, function (k) {
            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var attempts = [];
        // Use defaults if times not passed
        if (typeof times === 'function') {
            callback = task;
            task = times;
            times = DEFAULT_TIMES;
        }
        // Make sure times is a number
        times = parseInt(times, 10) || DEFAULT_TIMES;
        var wrappedTask = function(wrappedCallback, wrappedResults) {
            var retryAttempt = function(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result){
                        seriesCallback(!err || finalAttempt, {err: err, result: result});
                    }, wrappedResults);
                };
            };
            while (times) {
                attempts.push(retryAttempt(task, !(times-=1)));
            }
            async.series(attempts, function(done, data){
                data = data[data.length - 1];
                (wrappedCallback || callback)(data.err, data.result);
            });
        }
        // If a callback is passed, run this as a controll flow
        return callback ? wrappedTask() : wrappedTask
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (!_isArray(tasks)) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (_isArray(tasks)) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (_isArray(tasks)) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if (test.apply(null, args)) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if (!test.apply(null, args)) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if (!q.started){
            q.started = true;
          }
          if (!_isArray(data)) {
              data = [data];
          }
          if(data.length == 0) {
             // call drain immediately if there are no tasks
             return async.setImmediate(function() {
                 if (q.drain) {
                     q.drain();
                 }
             });
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === q.concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            started: false,
            paused: false,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            kill: function () {
              q.drain = null;
              q.tasks = [];
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (!q.paused && workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                if (q.paused === true) { return; }
                q.paused = true;
                q.process();
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                q.process();
            }
        };
        return q;
    };
    
    async.priorityQueue = function (worker, concurrency) {
        
        function _compareTasks(a, b){
          return a.priority - b.priority;
        };
        
        function _binarySearch(sequence, item, compare) {
          var beg = -1,
              end = sequence.length - 1;
          while (beg < end) {
            var mid = beg + ((end - beg + 1) >>> 1);
            if (compare(item, sequence[mid]) >= 0) {
              beg = mid;
            } else {
              end = mid - 1;
            }
          }
          return beg;
        }
        
        function _insert(q, data, priority, callback) {
          if (!q.started){
            q.started = true;
          }
          if (!_isArray(data)) {
              data = [data];
          }
          if(data.length == 0) {
             // call drain immediately if there are no tasks
             return async.setImmediate(function() {
                 if (q.drain) {
                     q.drain();
                 }
             });
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  priority: priority,
                  callback: typeof callback === 'function' ? callback : null
              };
              
              q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

              if (q.saturated && q.tasks.length === q.concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }
        
        // Start with a normal queue
        var q = async.queue(worker, concurrency);
        
        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
          _insert(q, data, priority, callback);
        };
        
        // Remove unshift function
        delete q.unshift;

        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            drained: true,
            push: function (data, callback) {
                if (!_isArray(data)) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    cargo.drained = false;
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain && !cargo.drained) cargo.drain();
                    cargo.drained = true;
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0, tasks.length);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                async.nextTick(function () {
                    callback.apply(null, memo[key]);
                });
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.seq = function (/* functions... */) {
        var fns = arguments;
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    async.compose = function (/* functions... */) {
      return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

}).call(this,require("oMfpAn"))
},{"oMfpAn":12}],12:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1])