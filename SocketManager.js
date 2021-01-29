const io = require('./server.js').io;
const cookie = require('cookie');
const session = require('express-session');
const _ = require('lodash');

const Credit = require('./models/credit'),
	Message = require('./models/message'),
	User = require('./models/user'),
	Chatroom = require('./models/chatroom'),
	Load = require('./models/load');
Proposal = require('./models/proposal');

const { MESSAGE_SENT } = require('./SocketEvents');

let connectedUsers = {};
let previousConnectedUsers = connectedUsers;
let userSocketIdMap = new Map(); //a map of online usernames and their clients

module.exports = function(socket) {};
