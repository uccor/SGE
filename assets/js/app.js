var app = angular.module("sge",[]);

app.controller("OrganigramaController", function($scope,$http){
    $scope.empleados = [];
    var testData = [];
    
    var listarEmpleados = function () {
        var promesaEmpleados = $http.get("/empleado/");
        promesaEmpleados.then(function(results){
            
        testData = _.map(results.data,function (empleado) {
        return {
            id : empleado.id,
            name: empleado.nombre,
            parent: empleado.jefe || 0
        }
    });
    
    if (testData.length > 0) {
    var orgChart = $('#orgChart').orgChart({data: testData});
    }
        });
    };
    
    listarEmpleados();
   
});

app.controller("EmpleadoController", function($scope,$http){
    $scope.empleados = [];
    
    
     var listarEmpleados = function () {
        var promesaEmpleados = $http.get("/empleado/");
        promesaEmpleados.then(function(results){
            $scope.empleados = results.data;
        });
    };
    
    listarEmpleados();
        
    $scope.empleado = {
        nombre:""
    };
    
    $scope.altaEmpleado = function () {
        $http.post("/empleado/",$scope.empleado).then(listarEmpleados).then(OrganigramaController(listarEmpleados));
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