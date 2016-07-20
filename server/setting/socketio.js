/**
 * Socket.io configuration
 */

'use strict';

var config = require('../config');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function(data) {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/book/book.socket').register(socket);

}

module.exports = function(socketio) {
  // We can authenticate socket.io users and access their token through socket.deveded_token
  //
  //1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  //2. Require authenticate here:
  //socketio.use(require('socketio-jwt').authorize({
  //  secret: config.secret,
  //  handshake: true
  //}))

  socketio.on('connection', function(socket) {
    console.log('socket........');
    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;
    console.log(socket.address)
    socket.connectedAt = new Date();

    socket.log = function(data) {
      console.log('SocketIO' + socket.nsp.name + socket.address);
    };

    // Call onDisconnect.
    socket.on('disconnect', function() {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    socket.emit('send:name', {
      name: 'mojixiang'
    })
    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED')
  })
};
