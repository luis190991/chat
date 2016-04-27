var express = require('express');
var app = express();
var log4js = require('log4js');
var logger = log4js.getLogger();

app.set("view engine", "pug");
app.use(express.static('public'));

//Servidor Web
var server = require("http").Server(app);
//Servidor de WS
var io = require("socket.io")(server);

var mensajes = [
    {
     id:1,
     text:"Mensaje numero uno",
     emisor:"Luis"
    }];

app.get('/', function(req, res){
    res.render("index");
});

io.on('connect', function(socket){
    logger.info("Alguien se ha Conectado.");
    socket.emit('enviarMensajes', mensajes);
    socket.on('mensajeNuevo', function(data){
       mensajes.push(data);
       io.sockets.emit('enviarMensajes', mensajes);
    });
});

server.listen(8080, function(){
    //TODO Logs.
});