/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('EMACWebApp', [
	'ngRoute',
	'ngAnimate',
	'ngFacebook',
	'angular-loading-bar',
	'ngRoute',
	'ngAnimate',
	'ngFacebook',
	'ui.calendar',
	'angular-loading-bar',
	'EMACWebApp.controllers',
	'EMACWebApp.services'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//	        $locationProvider.html5Mode(true);

	$routeProvider
	// Inicio
		.when("/", {
			templateUrl: "partials/inicio.html",
			controller: "PageCtrl"
		})
		.when("/#", {
			templateUrl: "partials/inicio.html",
			controller: "PageCtrl"
		})
		//niveles
		.when("/niveles", {
			templateUrl: "partials/niveles.html",
			controller: "NivelesCtrl"
		})
		.when("/niveles/:idNivel", {
			templateUrl: "partials/niveles.html",
			controller: "NivelesCtrl"
		})
		.when("/niveles/:idNivel/temas/:idTema?", {
			templateUrl: "partials/temas.html",
			controller: "NivelesCtrl"
		})
		// Pages
		.when("/calendario", {
			templateUrl: "partials/calendario.html",
			controller: "CalendarioCtrl"
		})
		.when("/about", {
			templateUrl: "partials/about.html",
			controller: "PageCtrl"
		})
		.when("/faq", {
			templateUrl: "partials/faq.html",
			controller: "PageCtrl"
		})
		.when("/pricing", {
			templateUrl: "partials/pricing.html",
			controller: "PageCtrl"
		})
		.when("/services", {
			templateUrl: "partials/services.html",
			controller: "PageCtrl"
		})
		.when("/contact", {
			templateUrl: "partials/contact.html",
			controller: "PageCtrl"
		})
		.when("/temas", {
			templateUrl: "partials/temas.html",
			controller: "NivelesCtrl"
		})
		.when("/registro", {
			templateUrl: "partials/registro.html",
			controller: "PageCtrl"
		})

	// Blog
	.when("/blog", {
			templateUrl: "partials/blog.html",
			controller: "BlogCtrl"
		})
		.when("#/blog/post", {
			templateUrl: "partials/blog_item.html",
			controller: "BlogCtrl"
		})
		.when("/404", {
			templateUrl: "partials/404.html",
			controller: "PageCtrl"
		})
		// else 404
		.otherwise("/404", {
			templateUrl: "partials/404.html",
			controller: "PageCtrl"
		});
}])

.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
	//cfpLoadingBarProvider.includeSpinner = false;
	cfpLoadingBarProvider.latencyThreshold = 500;
	cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
}])
.config(['$facebookProvider', function ($facebookProvider) {
	$facebookProvider.setAppId(519921044799582);
	$facebookProvider.setPermissions("email,user_likes");
}]);
