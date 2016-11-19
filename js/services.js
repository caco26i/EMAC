angular.module('EMACWebApp.services', [])

/**
 * Controls the Blog
 */
 .factory('service', ['$http',
function ($http)  {
  function $HTTPCALL(rute, method, params, $scope) {
        $scope.showSuccessMessage = false;
        $scope.showWarningMessage = false;
        $scope.warningMessage = "Error no especificado, intente de nuevo";
        $scope.successMessage = "Estado no especificado";
        console.log(rute + " params:");
        console.log(params);

        $('.btn').button('loading');
        return $http({
            url: 'http://localhost:9000/' + rute,
            method: method,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(params)
        })
        .error(function (data, status, headers, config) {
            console.log(rute + " error:");
            console.log(data);
            try{
                var data = jQuery.parseJSON(data);
                $scope.warningMessage = "Rute: " + rute + " Status: " + status;
                $scope.showWarningMessage = true;
            }
            catch(e) {
                $scope.warningMessage = "Rute: " + rute + " Status: " + status;
                $scope.showWarningMessage = true;
            }
        })
        .finally(function () {
            $('.btn').button('reset');
            $(':input')
             .not(':button, :submit, :reset, :hidden')
             .val('')
             .removeAttr('selected');
        })
        .then(function (data) { //wrap it inside another promise using then
            console.log(rute + " then:");
            console.log(data);

            try {
                var data = jQuery.parseJSON(data.data);

                if (data.hasOwnProperty("message")) {
                    $scope.successMessage = "Rute:" + rute + " Message: " + data.message;
                    $scope.showSuccessMessage = true;
                } else if (data.hasOwnProperty("messageError")) {
                    $scope.warningMessage = "Rute:" + rute + " Error: " + data.messageError;
                    $scope.showWarningMessage = true;
                }
            }
            catch (e) {
                data = data.data;
                console.log("then catch");

                if (data.hasOwnProperty("message")) {
                    $scope.warningMessage = "Rute:" + rute + " Message: " + data.message;
                } else if (data.hasOwnProperty("messageError")) {
                    $scope.warningMessage = "Rute:" + rute + " Error: " + data.messageError;
                } else {
                    $scope.warningMessage = data;
                }
                $scope.showWarningMessage = true;
            }

            return data;
        })
    }
  
  return{
      post: function(rute, params, $scope){
        return $HTTPCALL(rute, "POST", params, $scope);
      },
      get: function(rute, params, $scope){
        return $HTTPCALL(rute, "GET", params, $scope);
      }
  }
}])

.factory('temasXnivel', function (/*$scope, $location, $http */) {
  return{
      all: function(){
          return {
            0: {
                level_id: 0,
                nombre: "Sétimo",
                temas : [
                    {
                        level_id: 0,
                        nombre: "Números"
                    },
                    {
                        level_id: 1,
                        nombre: "Geometría"
                    },
                    {
                        level_id: 2,
                        nombre: "Álgebra"
                    },
                    {
                        level_id: 3,
                        nombre: "Estadística"
                    },
                    {
                        level_id: 4,
                        nombre: "Probabilidad"
                    },
                ]
            },
            1: {
                level_id: 1,
                nombre: "Octavo",
                temas : [
                    {
                        level_id: 0,
                        nombre: "Números"
                    },
                    {
                        level_id: 1,
                        nombre: "Geometría"
                    },
                    {
                        level_id: 2,
                        nombre: "Álgebra"
                    },
                    {
                        level_id: 3,
                        nombre: "Estadística"
                    },
                    {
                        level_id: 4,
                        nombre: "Probabilidad"
                    },
                ]
            },
            2: {
              level_id: 2,
                  nombre: "Noveno",
                temas : [
                    {
                        level_id: 0,
                        nombre: "Números"
                    },
                    {
                        level_id: 1,
                        nombre: "Geometría"
                    },
                    {
                        level_id: 2,
                        nombre: "Álgebra"
                    },
                    {
                        level_id: 3,
                        nombre: "Estadística"
                    },
                    {
                        level_id: 4,
                        nombre: "Probabilidad"
                    },
                ]
            },
            3: {
              level_id: 3,
                  nombre: "Decimo",
                temas : [
                    {
                        level_id: 0,
                        nombre: "Números"
                    },
                    {
                        level_id: 1,
                        nombre: "Geometría"
                    },
                    {
                        level_id: 2,
                        nombre: "Álgebra"
                    },
                    {
                        level_id: 3,
                        nombre: "Estadística"
                    },
                    {
                        level_id: 4,
                        nombre: "Probabilidad"
                    },
                ]
            },
            4: {
              level_id: 4,
                  nombre: "Undecimo",
                temas : [
                    {
                        level_id: 0,
                        nombre: "Números"
                    },
                    {
                        level_id: 1,
                        nombre: "Geometría"
                    },
                    {
                        level_id: 2,
                        nombre: "Álgebra"
                    },
                    {
                        level_id: 3,
                        nombre: "Estadística"
                    },
                    {
                        level_id: 4,
                        nombre: "Probabilidad"
                    },
                ]
            }
          }
      },
      get: function($key, $value){
         return {};
      },
  }
})
.factory('variablesGlobales', function ($rootScope) {
    var mySharedService = {
        level_id: -1,
        level_id: -1,
    };

    mySharedService.values = {};
//
//    mySharedService.setIdTema = function(value){
//        mySharedService.level_id = value;
//        $rootScope.$broadcast('level_idChanged');
//    }
//    
//    mySharedService.setIdNivel = function(value){
//        mySharedService.level_id = value;
//        $rootScope.$broadcast('level_idChanged');
//    }

    return mySharedService; 
})
