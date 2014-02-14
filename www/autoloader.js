//2014
/*======================================================
	App Name and init
========================================================*/
var $app, $appName, $setting;
$appName = "app";

/*======================================================
 Vendor List and other scripting list
========================================================*/
var scriptRes = [{
    "angular": "vendor/angular/angular.js"
  },
  "vendor/angular/angular-animate.min.js",
  "vendor/angular/angular-route.min.js",
  "vendor/angular-mobile-nav/mobile-nav.js", {
    "jquery": "vendor/jquery/jquery-2.0.0.min.js"
  }
];



/*======================================================
 Test Lib list
========================================================*/
var scriptTestRes = [

];


// Load all vendor resources
head.load(scriptRes, function() {

  // Load the main app script to start
  head.load("app/app.js", function() {

    $settings = {};
    // Load app route file
    $.getJSON('app/config/routes.config.json', function(data) {
      $settings.routes = data;
    });

    // Other config loader here...


    // Load app config file
    $.getJSON('app/config/app.config.json', function(data) {
      $settings.app = data;

      // Load all script
      var scriptLen = $settings.app.scripts.length;

      for (i = 0; i < scriptLen; i++) {
        $settings.app.scripts[i] = "app/scripts/" +
          $settings.app.scripts[i];
      }

      head.load($settings.app.scripts, function() {
        angular.bootstrap(document, [$appName]);
      });



    });

  });

});

// Load all css file
var cssRes = [
  "app/css/app.css",
  "vendor/angular-mobile-nav/mobile-nav.css",
  "vendor/page-animations/animations.css",
  "vendor/page-animations/animation-stage.css"
];

head.load(cssRes);