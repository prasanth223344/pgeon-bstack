const express = require('express');
const expressWS = require('express-ws');
var cors = require('cors')

const { setup } = require('radiks-server');

const app = express();
const makeApiController = require('./ApiController');
const notificationController = require('./NotificationController');


var http = require('http').Server(app);

var io = require('socket.io')(http);

require('dotenv').config()

//should be disabled online
app.use(cors())

//rooms
var rooms = [];

//settimeout will be set and will be stored this array...this should be cleared when the question is ended prematurely
var timeouts = {};

io.on('connection', function (socket) {

  console.log('an user connected');

  socket.on('connect_me', function (room) {

    console.log('connect_me');

    if (rooms.indexOf(room) == -1) {
      rooms.push(room);
      //   socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
    } else {

    }

    socket.room = room;
    socket.join(room);

  });

  console.log('a room connected');


  socket.on('disconnect', function (room) {
    // console.log('a room disconnected'+ room);
    socket.leave(socket.room);
  });

  
  socket.on('end_now', function (question_id) {
	  rooms.forEach(function (room) {
		  
		  
	        //get Q details page..notify the question ended
	        if (room.indexOf('Q_') != -1) {
	          io.sockets.in(room).emit('question_ended', question_id);
	        }

	      });
	  		sendNotifToVoters(question_id)
	  });

  
  socket.on('cancel_now', function (question_id) {
	  rooms.forEach(function (room) {
		  
		  console.log('questoin cane')
	        //get Q details page..notify the question ended
	        if (room.indexOf('Q_') != -1) {
	          io.sockets.in(room).emit('question_cancelled', question_id);
	        }

	      });

    });
    

    socket.on('clearbubble', function (target_user) {
      //console.log('wat bugbgfbng');
      console.log('emitted'+target_user);
      io.sockets.in('U_' + target_user).emit('bubblecleared');
    });
    
});




setup().then((RadiksController) => {
  app.use('/radiks', RadiksController);
  app.use('/api', makeApiController(RadiksController.DB));
  app.use('/notification', notificationController(RadiksController.DB));

  expressWS(app);

var port = 1260;
http.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

