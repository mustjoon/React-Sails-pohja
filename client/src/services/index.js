
import UserService from './UserService';
import EmojiService from './EmojiService';
import TicTacToeService from './TicTacToeService';
import SocketService from './SocketService';



//TEMP, Store socket client here!
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';


const userService = new UserService();
const emojiService = new EmojiService();
const ticTacToeService = new TicTacToeService(io)
export {
  userService,
  emojiService,
  ticTacToeService
};
