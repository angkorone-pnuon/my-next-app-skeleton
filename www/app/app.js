//app.js
/*======================================================
	Bootstrapping angular app
========================================================*/




/*======================================================
	App module dependencies injection
========================================================*/

var modules = ['ngRoute', 'ngAnimate', 'ajoslin.mobile-navigate'];


$app = angular.module($appName, modules);


/*======================================================
	App Config
========================================================*/


$app.config(function($routeProvider, $httpProvider) {


});


/*======================================================
	App Run
========================================================*/


$app.run(function($rootScope, $navigate, $http, $templateCache) {


});