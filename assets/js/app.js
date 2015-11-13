var app = angular.module("sge",["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
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
    
    $scope.actualizarNombre = function(data,id)
    {
        return  $http.post("/empleado/"+id,{nombre: data}).then(listarEmpleados); 
    }
    $scope.actualizarApellido = function(data ,id)
    {
        return  $http.post("/empleado/"+id,{apellido: data}).then(listarEmpleados); 
    }
     $scope.actualizarPuesto= function(data ,id)
    {
        return  $http.post("/puesto/"+id,{nombrePuesto: data}).then(listarPuestos).then(listarEmpleados); 
    }
    
     var buscarEmpleado = function (id) {
        var promesaEmpleadoAModificar = $http.get("/empleado/"+id);
        promesaEmpleadoAModificar.then(function(results){
            $scope.empleados = results.data;
        });
    };
    
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
        
        var promesaPuestos = $http.get("/puesto/"+id); //trae el puesto a eliminar?
        
        promesaPuestos.then(function(results){
            var puestoSeleccionado = results.data;
            //var empleados = $scope.empleados;
            var nPuesto = puestoSeleccionado.nombrePuesto;
            var eliminar = true;
            
            var promesaEmpleados = $http.get("/empleado/");
            
            promesaEmpleados.then(function(results){
                $scope.empleados = results.data;
                var datos = [];
                datos = _.map(results.data,function (empleado) {
                    return { puesto: empleado.puesto }
                });
                
                for(var empleado in datos){
                    
                    if( datos[empleado].puesto == nPuesto){
                        
                        eliminar = false;
                    }
                }
            
                if(eliminar){
                    $http.delete("/puesto/"+id).then(listarPuestos); 
                }
                
                if(eliminar==false){
                    alert("El puesto no puede ser eliminado porque se encuentra asignado a un empleado.");
                }
            });
        });
    };
    
});