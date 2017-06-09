
import UserService from './UserService';
import EmojiService from './EmojiService';
import TicTacToeService from './TicTacToeService';
import TicTacToeSocket from './TicTacToeSocket';



//TEMP, Store socket client here!
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');


var io = sailsIOClient(socketIOClient);



const userService = new UserService();
const emojiService = new EmojiService();
const ticTacToeService = new TicTacToeService(); 
const ticTacToeSocket = new TicTacToeSocket(io)
export {
  userService,
  emojiService,
  ticTacToeSocket,
  ticTacToeService
};
