angular.module('EMACWebApp.controllers', [])

/**
* Controls the Blog
*/
.controller('BlogCtrl', function( /*$scope, $location, $http */ ) {
	console.log("Blog Controller reporting for duty.");
})


.controller('CalendarioCtrl', function( $scope, $compile, uiCalendarConfig/*, $location, $http */ ) {
	console.log("Calendario Controller reporting for duty.");
	  var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {

			googleCalendarApiKey: 'AIzaSyB8PR2AcXfj6pqODsYkw7hFGyYqM4QvSSc',

			googleCalendarId: "ceredem.itcr@gmail.com",
//            url: "ceredem.itcr@gmail.com",
            className: 'gcal-event',           // an option!
//            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: 'month,agendaWeek,agendaDay',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
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
		zindex: 999999999
	});
	
//	$('#page-content-wrapper').scrollspy({
//		target: '#main-header-navbar'
//	})
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
})
//
//.directive('a', function() {
//    return {
//        restrict: 'E',
//        link: function(scope, elem, attrs) {
//            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
//                elem.on('click', function(e){
//                    e.preventDefault();
//                });
//            }
//        }
//   };
//});
