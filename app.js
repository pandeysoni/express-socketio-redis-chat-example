var app_port = 8000; //the port in which the application will run
var io_port = 3333; //the port in which socket io will run

var express = require('express'); //include the express js framework
var app = require('express')(); //create an app using express js
var server = require('http').createServer(app); //create an express js server

var io = require('socket.io').listen(server); //start socket io

var redis = require("redis"); //include the redis client
var redis_client = redis.createClient(); //create a redis client

app.use(express.bodyParser());
app.use(express.static('public'));

var chatters = [];
var chat_messages = [];

redis_client.get("chat_app_chatters", function(err, reply){
  if(reply){
      chatters = JSON.parse(reply);
  }
});

redis_client.get("chat_app_messages", function(err, reply){
  if(reply){
      chat_messages = JSON.parse(reply);
  }
});

app.get('/', function(req, res){
  res.sendfile('./views/index.html');
});

io.sockets.on('connection', function(socket){

  socket.on('message', function(data){
      io.sockets.emit('send', data);
  });

  socket.on('update_chatter_count', function(data){
      io.sockets.emit('count_chatters', data);
  });
});

app.post('/join_chat', function(req, res){

  var username = req.param('username');
  if(chatters.indexOf(username) == -1){
      chatters.push(username);
      redis_client.set('chat_app_chatters', JSON.stringify(chatters));
      res.send({'chatters' : chatters, 'status' : 'ok'});
  }else{
      res.send({'status' : 'failed'});
  }
});

app.post('/leave_chat', function(req, res){

  var username = req.param('username');
  chatters.splice(chatters.indexOf(username), 1);   
  redis_client.set('chat_app_chatters', JSON.stringify(chatters));
  res.send({'status' : 'ok'});
});

app.post('/send_message', function(req, res){
  var username = req.param('username');
  var message = req.param('message');

  chat_messages.push({'sender' : username, 'message' : message});
  redis_client.set('chat_app_messages', JSON.stringify(chat_messages));
  res.send({'status' : 'ok'});
});

app.get('/get_messages', function(req, res){

  res.send(chat_messages);
});

app.get('/get_chatters', function(req, res){

  res.send(chatters);
});
server.listen(8000);
