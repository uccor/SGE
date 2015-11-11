var app = angular.module("sge",["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.controller("PuestoController", function($scope,$http){
    $scope.puestos = [];
    
    var listarPuestos = function () {
        var promesaPuestos = $http.get("/puesto/");
        promesaPuestos.then(function(results){
            $scope.puestos = results.data;
        });
        
    };
    
    listarPuestos();
    
    $scope.altaPuesto = function () {
        $http.post("/puesto/",$scope.puesto).then(listarPuestos);
    };
    
    $scope.puesto = {
       nombrePuesto:""
    };
    
    $scope.bajaPuesto= function (id) {
        $http.delete("/puesto/"+id).then(listarPuestos);
    };
    
    
    
});



app.controller("EmpleadoController", function($scope,$http){
    $scope.empleados = [];
    $scope.actualizarOrganigrama = function(){
        $scope.$emit("actualizar");
    };
    var testData = [];
    var listarEmpleados = function () {
        var promesaEmpleados = $http.get("/empleado/");
        promesaEmpleados.then(function(results){
            $scope.empleados = results.data;
            testData = _.map(results.data,function (empleado) {
        return {
            id : empleado.id,
            name: empleado.nombre,
            puesto: empleado.puesto,
            parent: empleado.jefe || 0
        }
    });
    
    if (testData.length > 0) {
    var orgChart = $('#orgChart').orgChart({data: testData});
    }
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