angular.module('EMACWebApp.services', [])

/**
 * Controls the Blog
 */
.factory('niveles', function (/*$scope, $location, $http */) {
  return{
      all: function(){
          return {
              1: {
                  ID: 001,
                  nombre: "Sétimo",
              },
              2: {
                  ID: 002,
                  nombre: "Octavo",
              },
              3: {
                  ID: 003,
                  nombre: "Noveno",
              },
              4: {
                  ID: 004,
                  nombre: "Decimo",
              },
              4: {
                  ID: 005,
                  nombre: "Undecimo",
              }
          };
      },
      get: function($key, $value){
         return {};
      },
  }
})