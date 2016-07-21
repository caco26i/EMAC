angular.module('EMACWebApp.controllers', [])

/**
* Controls the Blog
*/
.controller('BlogCtrl', function( /*$scope, $location, $http */ ) {
	console.log("Blog Controller reporting for duty.");
})

.controller('SidebarCtrl', function($scope, $location, temasXnivel, variablesGlobales) {
	console.log("SidebarCtrl Controller reporting for duty.");
	$scope.niveles = temasXnivel.all();
	$scope.nivel_actual = {
		idNivel: variablesGlobales.idNivel,
	}
	
	//Observador
	$scope.$on('idNivelChanged', function () {
        $scope.nivel_actual.idNivel = variablesGlobales.idNivel;
    });

	$scope.$on('ngRepeatFinished', 
		function(ngRepeatFinishedEvent) {
			// var MLMenu = $("#ml-menu").MLMenu({
			// 	breadcrumbsCtrl : true, // show breadcrumbs
			// 	backCtrl : true, // show back button
			// 	itemsDelayInterval : 60, // delay between each menu item sliding animation
			// 	//onItemClick: function(){}, // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
			// 	initialBreadcrumb: "Niveles"
			// });
			var menuEl = document.getElementById('ml-menu'),
			mlmenu = new MLMenu(menuEl, {
				// breadcrumbsCtrl : true, // show breadcrumbs
				initialBreadcrumb : 'NIVELES', // initial breadcrumb text
				backCtrl : true, // show back button
				// itemsDelayInterval : 60, // delay between each menu item sliding animation
				// onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
			});
		}
	);
})

.controller('NivelesCtrl', function($scope, $location, $http, $routeParams, temasXnivel, variablesGlobales) {
	console.log("NIVELES Controller reporting for duty.");
	$scope.niveles = temasXnivel.all();
	console.log("$routeParams")
	console.log($routeParams)
	console.log("variablesGlobales")
	
	variablesGlobales.setIdNivel($routeParams.idNivel);
	variablesGlobales.setIdNivel($routeParams.idNivel);
	
	$scope.nivel_actual = {
		idNivel: variablesGlobales.idNivel,
	}
	$scope.nivel = {
		idNivel: variablesGlobales.idNivel,
	}
	console.log($scope.nivel_actual)
})
/**
 * Controls all other Pages
 */
.controller('PageCtrl', ['$scope', '$location', '$http', 'service', 'temasXnivel',
function($scope, $location, $http, service, temasXnivel) {
	console.log("Page Controller reporting for duty.");

	// $scope.niveles = temasXnivel.all();
	
	// Activates the Carousel
	$('.carousel').carousel({
		interval: 5000
	});
	
	
	$('.tooltip-social').tooltip({
		selector: "a[data-toggle=tooltip]"
	});
}
])
.controller('generalCtrl', ['$scope', '$location', '$http', '$rootScope', 'cfpLoadingBar',
function($scope, $location, $http, $rootScope, cfpLoadingBar) {
	console.log("generalCtrl Controller reporting for duty.");

	$rootScope.$on('$routeChangeStart', function() {
		cfpLoadingBar.start();
	});
	
	$rootScope.$on('$routeChangeSuccess', function() {
		cfpLoadingBar.complete();
	});
	
	$('.menu__wrap, html').niceScroll({
		cursorcolor: "#ef3340",
		cursorwidth: "5px",
		autohidemode: true,
		zindex: 999999999999
	});
	
	$('#page-content-wrapper').scrollspy({
		target: '#main-header-navbar'
	})
}
])
.controller('LoginCtrl', ['$scope', '$facebook',
	function($scope, $facebook) {
		console.log("LoginCtrl Controller reporting for duty.");
		$scope.isLoggedIn = false;
		$scope.user = {
			name: {},
			picture: {},
		}

		$scope.login = function() {
			$facebook.login().then(function() {
				login();
			});
		}

		$scope.logout = function() {
			$facebook.logout().then(function() {
				logout();
			});
		}

		function login() {
			$facebook.api("/me").then(
				function(response) {
					$scope.user.name = response.name;
					$facebook.api("/" + response.id + "/picture").then(
						function(response) {
							$scope.user.picture = response.data;
							$scope.isLoggedIn = true;
							console.log($scope.user);
						}
					);
				},
				function(err) {
					$scope.isLoggedIn = false;
				}
			);
		}

		function logout() {
			$scope.isLoggedIn = false;
			$scope.user = {};
		}

		login();

		function jsonConcat(o1, o2) {
			for (var key in o2) {
				o1[key] = o2[key];
			}
			return o1;
		}

}])

.directive('onFinishRender', function($timeout) {
return {
	restrict: 'A',
	link: function($scope, element, attr) {
		if ($scope.$last === true) {
			$timeout(function() {
				$scope.$emit('ngRepeatFinished');
			});
		}
	}
}
});