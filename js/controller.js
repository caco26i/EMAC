angular.module('EMACWebApp.controllers', [])

/**
 * Controls the Blog
 */
.controller('BlogCtrl', function (cfpLoadingBar/*$scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
  cfpLoadingBar.start();
  $scope.$on('$viewContentLoaded', function() {
    cfpLoadingBar.complete();
  });
})
.controller('NivelesCtrl', function ($scope, $location, $http, $routeParams, cfpLoadingBar) {
  $scope.nivel = $routeParams.idNivel;
  console.log("NIVELES Controller reporting for duty.");
  cfpLoadingBar.start();
  $scope.$on('$viewContentLoaded', function() {
    cfpLoadingBar.complete();
  });
})
/**
 * Controls all other Pages
 */
.controller('PageCtrl', ['$scope', '$location', '$http', 'cfpLoadingBar', 'niveles', 
function ( $scope, $location, $http, cfpLoadingBar, niveles) {
  //console.log(niveles.all());
  $scope.niveles = niveles.all();
 
  cfpLoadingBar.start();
  
  $scope.$on('$viewContentLoaded', function() {
    //cfpLoadingBar.complete();
  });
  
  console.log("Page Controller reporting for duty.");
  $('#sidebar-wrapper, html').niceScroll({
    styler:"fb",
    cursorcolor:"#ef3340",
    cursorwidth: "5px",
    autohidemode: false,
    zindex: 999999999999
  });
  //$scope.progressbar = ngProgressFactory.createInstance();
  //$scope.progressbar.start();
            
            
  $('#page-content-wrapper').scrollspy({ target: '#main-header-navbar' })
  
  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  });
  
}]);