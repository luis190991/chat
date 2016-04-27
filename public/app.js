var app = angular.module("appSockets", []);

app.controller("chatCtrl", function($scope){
    $scope.socket = 
    io.connect("https://rads-luis190991.c9users.io:8080",
    {'forceNew':true});
    
    $scope.mensajes = [];
    $scope.obj = new Object();
    
    $scope.enviarMensajeNuevo= function(){
        $scope.socket.emit('mensajeNuevo', $scope.obj);
    };
    
    $scope.socket.on('enviarMensajes', function(data){

       $scope.mensajes = data; 
       console.log($scope.mensajes)
       $scope.$apply();
    });
});