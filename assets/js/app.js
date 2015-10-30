var app = angular.module("sge",[]);
app.controller("OrganigramaController", function($scope,$http){
    $scope.empleados = [];
    
    var testData = [
    {id: 1, name: 'Acme Organization', parent: 0},
    {id: 2, name: 'CEO Office', parent: 1},
    {id: 3, name: 'Division 1', parent: 1},
    {id: 4, name: 'Division 2', parent: 1},
    {id: 6, name: 'Division 3', parent: 1},
    {id: 7, name: 'Division 4', parent: 1},
    {id: 8, name: 'Division 5', parent: 1},
    {id: 5, name: 'Sub Division', parent: 3},        
    ];
    
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