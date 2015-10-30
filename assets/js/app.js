var app = angular.module("sge",[]);
app.controller("OrganigramaController", function($scope,$http){
    $scope.organigrama = [];
    $scope.addItem = function () {
        
    }
    
    var crearOrganigrama = function () {
        var listaEmpleados = obtenerEmpleados();

        
    };
    var obtenerEmpleados = function(){
        //app.controller.EmpleadoController.listarEmpleados
        $http.get("/empleados/").then(function(results){
            return $scope.epleados = results.data;
        });
        
    };
});
app.controller("EmpleadoController", function($scope,$http){
    $scope.empleados = [];
    
    
     var listarEmpleados = function () {
        var promesaEmpleados = $http.get("/empleado/");
        promesaEmpleados.then(function(results){
            $scope.empleados = results.data;
        });
    };
    
    $scope.empleado = {
        nombre:""
    };
    
    $scope.altaEmpleado = function () {
        $http.post("/empleado/",$scope.empleado).then(listarEmpleados);
    };
    
    $scope.bajaEmpleado = function (id) {
        $http.delete("/empleado/"+id).then(listarEmpleados);
    };
    
    $scope.modificarEmpleado = function (id) {
        var empleadoAModificar = $http.get("/empleado/"+id);
        $http.post("/empleado/"+id,$scope.empleado).then(listarEmpleados);
    };
    
     var buscarEmpleado = function (id) {
        var promesaEmpleadoAModificar = $http.get("/empleado/"+id);
        promesaEmpleadoAModificar.then(function(results){
            $scope.empleados = results.data;
        });
    };
    
});