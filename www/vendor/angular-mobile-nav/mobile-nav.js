/*
 * angular-mobile-nav by Andy Joslin
 * http://github.com/ajoslin/angular-mobile-nav
 * @license MIT License http://goo.gl/Z8Nlo
 */

angular.module('ajoslin.mobile-navigate', [])
.run(['$navigate', '$rootScope','$location', function($navigate, $rootScope, $location) {
  //Android back button functionality for phonegap
  var i=0;
  document.addEventListener("deviceready", function() {
    document.addEventListener("backbutton", function() {
      $rootScope.$apply(function() {
        if($location.path()=='/list' || $location.path()=='/explore' || $location.path()=='/account' ){
          i++;
          //alert($location.path());
          if(i==1){
            $rootScope.toast_show=true;
            setTimeout(function(){
              $rootScope.toast_show=false;
              $rootScope.$apply();
              i=0;
            },5000);
            return;
          }
          if(i==2){
            navigator.app.exitApp();
            return;  
          }          
        }
        var backSuccess = $navigate.back();
        if (!backSuccess) {
          navigator.app.exitApp();
        }
      });
    });
  });
}]);
/*
 * $change
 * Service to transition between two elements
 */
angular.module('ajoslin.mobile-navigate')

.provider('$change', function() {
  var transitionPresets = {  //[nextClass, prevClass]
    //Modal: new page pops up, old page sits there until new page is over it
    'modal': ['modal', ''],
    'none': ['', ''],
    'scaleMove' : ['scaleMove',''],
    'bottomToTop': [' pt-page-moveFromBottom', ' pt-page-moveToTop'],
    'topToBottom': [' pt-page-moveFromTop', ' pt-page-moveToBottom'],
    'leftToRight': [' pt-page-moveFromRight', ' pt-page-moveToLeft'],
    'rightToLeft': [' pt-page-moveFromLeft', ' pt-page-moveToRight'],
    'fadeFromRight': [' pt-page-moveFromRight pt-page-ontop', ' pt-page-fade'],
    'fadeFromLeft': [' pt-page-moveFromLeft pt-page-ontop', ' pt-page-fade'],
    'fadeFromBottom': [' pt-page-moveFromBottom pt-page-ontop', ' pt-page-fade'],
    'fadeFromTop': [' pt-page-moveFromTop pt-page-ontop', ' pt-page-fade'],
    'fadeLeftFadeRight': [' pt-page-moveFromRightFade', ' pt-page-moveToLeftFade'],
    'fadeRightFadeLeft': [' pt-page-moveFromLeftFade', ' pt-page-moveToRightFade'],
    'fadeTopFadeBottom': [' pt-page-moveFromBottomFade', ' pt-page-moveToTopFade'],
    'fadeBottomFadeTop': [' pt-page-moveFromTopFade', ' pt-page-moveToBottomFade', ],
    'easingFromRight': [' pt-page-moveFromRight', ' pt-page-moveToLeftEasing pt-page-ontop'],
    'easingFromLeft': [' pt-page-moveFromLeft', ' pt-page-moveToRightEasing pt-page-ontop'],
    'easingFromBottom': [' pt-page-moveFromBottom', ' pt-page-moveToTopEasing pt-page-ontop'],
    'easingFromTop': [' pt-page-moveFromTop', ' pt-page-moveToBottomEasing pt-page-ontop'],
    'moveLeftScaleDown': [' pt-page-moveFromRight pt-page-ontop', ' pt-page-scaleDown'],
    'moveRightScaleDown': [' pt-page-moveFromLeft pt-page-ontop', ' pt-page-scaleDown'],
    'moveTopScaleDown': [' pt-page-moveFromBottom pt-page-ontop', ' pt-page-scaleDown'],
    'moveBottomScaleDown': [' pt-page-moveFromTop pt-page-ontop', ' pt-page-scaleDown'],
    'scaleDown': [' pt-page-scaleUpDown pt-page-delay300', ' pt-page-scaleDown'],
    'scaleUp': [' pt-page-scaleUp pt-page-delay300', ' pt-page-scaleDownUp'],
    'moveLeftScaleUp': [' pt-page-scaleUp', ' pt-page-moveToLeft pt-page-ontop'],
    'moveRightScaleUp': [' pt-page-scaleUp', ' pt-page-moveToRight pt-page-ontop'],
    'moveTopScaleUp': [' pt-page-scaleUp', ' pt-page-moveToTop pt-page-ontop'],
    'moveBottomScaleUp': [' pt-page-scaleUp', ' pt-page-moveToBottom pt-page-ontop'],
    'scaleDownScaleUp': [' pt-page-scaleUpCenter pt-page-delay400', ' pt-page-scaleDownCenter'],
    'glueLeftFromRight': [' pt-page-moveFromRight pt-page-delay200 pt-page-ontop', ' pt-page-rotateRightSideFirst'],
    'glueRightFromLeft': [' pt-page-moveFromLeft pt-page-delay200 pt-page-ontop', ' pt-page-rotateLeftSideFirst'],
    'glueBottomFromTop': [' pt-page-moveFromTop pt-page-delay200 pt-page-ontop', ' pt-page-rotateTopSideFirst'],
    'glueTopFromBottom': [' pt-page-moveFromBottom pt-page-delay200 pt-page-ontop', ' pt-page-rotateBottomSideFirst'],
    'flipRight': [' pt-page-flipInLeft pt-page-delay500', ' pt-page-flipOutRight'],
    'flipLeft': [' pt-page-flipInRight pt-page-delay500', ' pt-page-flipOutLeft'],
    'flipTop': [' pt-page-flipInBottom pt-page-delay500', ' pt-page-flipOutTop'],
    'flipBottom': [' pt-page-flipInTop pt-page-delay500', ' pt-page-flipOutBottom'],
    'fall': [' pt-page-scaleUp', ' pt-page-rotateFall pt-page-ontop'],
    'newspaper': [' pt-page-rotateOutNewspaper', ' pt-page-rotateInNewspaper pt-page-delay500'],
    'pushLeftFromRight': [' pt-page-moveFromRight', ' pt-page-rotatePushLeft'],
    'pushRightFromLeft': [' pt-page-moveFromLeft', ' pt-page-rotatePushRight'],
    'pushTopFromBottom': [' pt-page-moveFromBottom', ' pt-page-rotatePushTop'],
    'pushBottomFromTop': [' pt-page-moveFromTop', ' pt-page-rotatePushBottom'],
    'pushLeftPullRight': [' pt-page-rotatePullRight pt-page-delay180', ' pt-page-rotatePushLeft'],
    'pushRightPullLeft': [' pt-page-rotatePullLeft pt-page-delay180', ' pt-page-rotatePushRight'],
    'pushTopPullBottom': [' pt-page-rotatePullBottom pt-page-delay180', ' pt-page-rotatePushTop'],
    'pushBottomPullTop': [' pt-page-rotatePullTop pt-page-delay180', ' pt-page-rotatePushBottom'],
    'foldLeftFromRight': [' pt-page-moveFromRightFade', ' pt-page-rotateFoldLeft'],
    'foldLeftFromRight': [' pt-page-moveFromLeftFade', ' pt-page-rotateFoldRight'],
    'foldTopFromBottom': [' pt-page-moveFromBottomFade', ' pt-page-rotateFoldTop'],
    'foldBottomFromTop': [' pt-page-moveFromTopFade', ' pt-page-rotateFoldBottom'],
    'moveRightUnfoldLeft': [' pt-page-rotateUnfoldLeft', ' pt-page-moveToRightFade'],
    'moveLeftUnfoldRight': [' pt-page-rotateUnfoldRight', ' pt-page-moveToLeftFade'],
    'moveBottomUnfoldTop': [' pt-page-rotateUnfoldTop', ' pt-page-moveToBottomFade'],
    'moveTopUnfoldBottom': [' pt-page-rotateUnfoldBottom', ' pt-page-moveToTopFade'],
    'rotateRoomLeft': [' pt-page-rotateRoomLeftIn', ' pt-page-rotateRoomLeftOut pt-page-ontop'],
    'rotateRoomRight': [' pt-page-rotateRoomRightIn', ' pt-page-rotateRoomRightOut pt-page-ontop'],
    'rotateRoomTop': [' pt-page-rotateRoomTopIn', ' pt-page-rotateRoomTopOut pt-page-ontop'],
    'rotateRoomBottom': [' pt-page-rotateRoomBottomIn', ' pt-page-rotateRoomBottomOut pt-page-ontop'],
    'rotateCubeLeft': [' pt-page-rotateCubeLeftIn', ' pt-page-rotateCubeLeftOut pt-page-ontop'],
    'rotateCubeRight': [' pt-page-rotateCubeRightIn', ' pt-page-rotateCubeRightOut pt-page-ontop'],
    'rotateCubeTop': [' pt-page-rotateCubeTopIn', ' pt-page-rotateCubeTopOut pt-page-ontop'],
    'rotateCubeBottom': [' pt-page-rotateCubeBottomIn', ' pt-page-rotateCubeBottomOut pt-page-ontop'],
    'rotateCarouselLeft': [' pt-page-rotateCarouselLeftIn', ' pt-page-rotateCarouselLeftOut pt-page-ontop'],
    'rotateCarouselRight': [' pt-page-rotateCarouselRightIn', ' pt-page-rotateCarouselRightOut pt-page-ontop'],
    'rotateCarouselTop': [' pt-page-rotateCarouselTopIn', ' pt-page-rotateCarouselTopOut pt-page-ontop'],
    'rotateCarouselBottom': [' pt-page-rotateCarouselBottomIn', ' pt-page-rotateCarouselBottomOut pt-page-ontop'],
    'rotateSides': [' pt-page-rotateSidesIn pt-page-delay200', ' pt-page-rotateSidesOut'],
    'zoomSlide': [' pt-page-rotateSlideIn', ' pt-page-rotateSlideOut'],
  };
  var defaultOptions = {
      'prefix': 'mb-'
  };
  var IN_CLASS = "in";
  var OUT_CLASS = "out";
  var REVERSE_CLASS = "reverse";
  var DONE_CLASS = "done";
  //var ANIMATION_END = "animationName" in document.documentElement.style ? "animationend" : "webkitAnimationEnd";
  
  var ANIMATION_END = function () {
    var events = {
        'animation': 'animationend',
        'webkitAnimation': 'webkitAnimationEnd'
    };

    for (var evt in events) {
        if (evt in document.documentElement.style) {
            return events[evt];
        }
    }

    return '';
  } ();

  this.setTransitionPreset = function(transitionName, inClass, outClass) {
    inClass = inClass || '';
    outClass = outClass || inClass; //Default to outClass same as inClass
    transitionPresets[transitionName] = [inClass, outClass];
  };
  this.options = function(opts) {
    defaultOptions = angular.extend(defaultOptions, opts || {});
  };

  this.$get = ['$q', '$rootScope', function($q, $rootScope) {

    return function change(next, prev, transType, reverse, options) {
      options = angular.extend(options || {}, defaultOptions);
      var deferred = $q.defer(),
        nextTransClass, prevTransClass;

      //buildClassString
      //Transforms array of classes into prefixed class string
      //(better for performance than multiple .addClass()
      //@param classes: Array{string}
      //@return string classNames
      function buildClassString(classes) {
        return classes.reduce(function(accumulator, cls) {
          return accumulator + (cls ? (' ' + options.prefix + cls) : '');
        }, '');
      }

      //Convert a preset (eg 'modal') to its array of preset classes if it exists
      //else, just convert eg 'slide' to ['slide', 'slide'], so both elements get it
      //The array layout is [nextinationClass, prevClass]
      var transition = transitionPresets[transType] ?
        transitionPresets[transType] :
        [transType, transType];

      //Hack for white flash: z-index stops flash, offsetWidth thing forces z-index to apply
      next.css('z-index','-100');
      next[0].offsetWidth += 0;

      var nextClasses = buildClassString([
        reverse ? OUT_CLASS : IN_CLASS,
        (nextTransClass = transition[reverse ? 1 : 0]),
        reverse && REVERSE_CLASS || ''
      ]);
      next.addClass(nextClasses);

      var prevClasses;
      if (prev) {
        prevClasses = buildClassString([
         reverse ? IN_CLASS : OUT_CLASS,
         (prevTransClass = transition[reverse ? 0 : 1]),
         reverse && REVERSE_CLASS || ''
        ]);
        prev.addClass(prevClasses);
      }

      next.css('z-index', '');
      next[0].offsetWidth += 0;

      function done() {
        $rootScope.$apply(function() {
          deferred.resolve();
        });
      }

      //Find which element (sometimes none) to bind for ending
      var boundElement;
      if (nextTransClass && nextTransClass.length) {
        (boundElement = next).bind(ANIMATION_END, done);
      } else if (prev && prevTransClass && prevTransClass.length) {
        (boundElement = prev).bind(ANIMATION_END, done);
      } else {
        deferred.resolve();
      }

      deferred.promise.then(function() {
        boundElement && boundElement.unbind(ANIMATION_END, done);
        next.removeClass(nextClasses);
        prev && prev.removeClass(prevClasses);
      });

      //Let the user of change 'cancel' to finish transition early if they wish
      deferred.promise.cancel = function() {
        deferred.resolve();
      };
      return deferred.promise;
    };
  }];
});
angular.module('ajoslin.mobile-navigate')

.provider('$navigate', function() {
  this.$get = ['$rootScope', '$location', '$route', function($rootScope, $location, $route) {
    var nav = {},
      navHistory = []; //we keep our own version of history and ignore window.history

    function Page(path, transition, isReverse) {
      var _path = path,
        _transition = transition || 'slide',
        _isReverse = isReverse,
        _onceTransition;

      this.transition = function() {
        var trans;
        if (_onceTransition) {
          trans = _onceTransition;
          _onceTransition = null;
        } else {
          trans = _transition;
        }
        return trans;
      };
      this.path = function() { return _path; };
      this.reverse = function() { return _isReverse; };

      //For setting a transition on a page - but only one time
      //Eg say on startup, we want to transition in with 'none',
      //but want to be 'slide' after that
      this.transitionOnce = function(trans) {
        _onceTransition = trans;
      };
    }
    
    function navigate(destination, source, isBack) {
      

      $rootScope.$broadcast('$pageTransitionStart', destination, source, isBack);
      nav.current = nav.next;
    }

    /* 
     * Will listen for a route change success and call the selected callback
     * Only one listen is ever active, so if you press for example 
     * /link1 then press back before /link1 is done, it will go listen for the back
     */
    nav.onRouteSuccess = null;
    //Add a default onroutesuccess for the very first page
    function defaultRouteSuccess($event, next, last) {
      nav.current && navHistory.push(nav.current);
      nav.next = new Page($location.path());
      nav.next.transitionOnce('none');
      navigate(nav.next);
      nav.onRouteSuccess = null;
    }
    $rootScope.$on('$routeChangeSuccess', function($event, next, last) {
      // Only navigate if it's a valid route and it's not gonna just redirect immediately
      if (!next.$$route || !next.$$route.redirectTo) {
        (nav.onRouteSuccess || defaultRouteSuccess)($event, next, last);
      }
    });

    /*
     * go -transitions to new page
     * @param path - new path
     * @param {optional} String transition
     * @param {optional} boolean isReverse, default false
     */
    nav.go = function go(path, transition, isReverse) {
      //transition = "leftToRight";
      if (typeof transition == 'boolean') {
        isReverse = transition;
        transition = null;
      }
      if (transition!='scaleMove'){
        $rootScope.menuStateExtra = false;
      }
      $location.path(path);
      //Wait for successful route change before actually doing stuff
      nav.onRouteSuccess = function($event, next, last) {
        nav.current && navHistory.push(nav.current);
        nav.next = new Page(path, transition || (next.$$route && next.$$route.transition), isReverse);
        navigate(nav.next, nav.current, false);
      };
    };
    //Sometimes you want to erase history
    nav.eraseHistory = function() {
      navHistory.length = 0;
    };
    nav.back = function() {
      if (navHistory.length > 0) {
        var previous = navHistory[navHistory.length-1];
        $location.path(previous.path());
        nav.onRouteSuccess = function() {
          navHistory.pop();
          //nav.next = previous;
          nav.next = new Page(previous, 'rightToLeft' , false);
          navigate(nav.next, nav.current, false);
        };
        return true;
      }
      return false;
    };

    return nav;
  }];
});
angular.module('ajoslin.mobile-navigate')
.directive('mobileView', ['$rootScope', '$compile', '$controller', '$route', '$change', '$q',
function($rootScope, $compile, $controller, $route, $change, $q) {

  function link(scope, viewElement, attrs) {    
    //Insert page into dom
    function insertPage(page) {
      //$rootScope.page = page;
      var current = $route.current, 
      locals = current && current.locals;
      
      page.element = angular.element(document.createElement("div"));
      page.element.addClass('mb-page'); //always has to have page class
      page.element.html(locals.$template);
      

      page.scope = scope.$new();
      if (current.controller) {
        locals.$scope = page.scope;
        page.controller = $controller(current.controller, locals);
        page.element.contents().data('$ngControllerController', page.controller);
      }
      $compile(page.element.contents())(page.scope);
      if (locals && locals.$template) {
        // only append page element if a template exists
        viewElement.append(page.element);
      }
      page.scope.$emit('$viewContentLoaded');
      page.scope.$eval(attrs.onLoad);
      
      return page;
    }


    var currentTrans;
    scope.$on('$pageTransitionStart', function ($event, dest, source, reverse) {
      function changePage() {
        var current = $route.current && $route.current.$$route || {};
        var transition = reverse ? source.transition() : dest.transition();

       
        insertPage(dest);

        //If the page is marked as reverse, reverse the direction
        if (dest.reverse() || current.reverse) {
          reverse = !reverse;
        }

        function doTransition() {
          
          var promise = $change(dest.element, (source ? source.element : null),
            transition, reverse);
          if (source)
            source.scope.$destroy();
           if (transition=='scaleMove'){
            $('.mb-out').remove();  
          }

          promise.then(function() {
            if (source) {
              $rootScope.$broadcast('$pageTransitionSuccess', dest, source);
              source.scope.$destroy();

              source.element.empty();
              source.element.remove();
              $('.mb-out').remove();              
              source = undefined;
            }
          });

          return promise;
        }

        //Set next element to display: none, then wait until transition is
        //ready, then show it again.
        dest.element.css('display', 'none');
        
        //Allow a deferTransition expression, which is allowed to return a promise.
        //The next page will be inserted, but not transitioned in until the promise
        //is fulfilled.
        var deferTransitionPromise = scope.$eval(attrs.deferTransition) || $q.when();
        deferTransitionPromise.cancel = function() {
          cancelled = true;  
          //Undo display none from waiting for transition
          dest.element.css('display', '');
        };

        var cancelled = false;
        deferTransitionPromise.then(function() {
          if (!cancelled) {
            //Undo display none from waiting for transition
            dest.element.css('display', '');
            return doTransition();
          }
        });

        return deferTransitionPromise;
      }
      currentTrans && currentTrans.cancel();
      currentTrans = changePage(dest, source, reverse);
    });
  }
  return {
    restrict: 'EA',
    link: link
  };
}])

.directive('scrollable', ['$route', function($route) {
  var scrollCache = {};
  return {
    restrict: 'EA',
    link: function(scope, elm, attrs) {
      var route = $route.current ? $route.current.$$route : {};
      var template = route.templateUrl || route.template;
      var rawElm = elm[0];

      //On scope creation, see if we remembered any scroll for this templateUrl
      //If we did, set it
      if (template) {
        //Set oldScroll after a timeout so the page has time to fully load
        setTimeout(function() {
          var oldScroll = scrollCache[template];
          if (oldScroll) {
            rawElm.scrollTop = oldScroll;
          }
        });

        scope.$on('$destroy', function() {
          scrollCache[template] = rawElm.scrollTop;
        });
      }
    }
  };
}]);