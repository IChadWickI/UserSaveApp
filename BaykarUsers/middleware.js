const jsonServer = require('json-server');
const server = jsonServer.create();

server.use(jsonServer.defaults());

const cors = require('cors');
server.use(cors());  // CORS middleware ekleniyor

module.exports = server;
