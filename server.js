var express = require('express');

var app = express();

var connections = [];
var users = [];

app.use(express.static('./public'));

var server = app.listen(3000);
io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

	socket.once('disconnect', function(){
		for(var i = 0;i < users.length;i++){
			if(users[i].id == this.id){
				users.splice(i, 1);
			}
		}
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log('Disconnected: %s sockets connected', connections.length);
		io.emit('disconnect', users);
	});

	socket.on('messageAdded', function(payload){
		var newMessage = {
			timeStamp: payload.timeStamp,
			text: payload.text,
			user: payload.user
		}

		io.emit('messageAdded', newMessage);
	});

	socket.on('userJoined', function(payload){
		var newUser = {
			id: this.id,
			name: payload.name
		}

		users.push(newUser);
		io.emit('userJoined', users);
		console.log('User Joined: '+payload.name);
	});

	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running on port 3000');