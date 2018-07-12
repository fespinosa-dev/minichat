import express from 'express'
import http from "http";
import {server as WSServer} from 'websocket'


const app = express();

var server = http.createServer(app);


app.get('/home', (req, res) => {
    res.sendFile("index.html", { root: "src" });
});

// create the server
var wsServer = new WSServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
      console.log(message);
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});

export default app