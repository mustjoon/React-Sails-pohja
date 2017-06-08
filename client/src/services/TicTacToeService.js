
import SocketService from './SocketService';


class TicTacToeService extends SocketService {

	constructor(app){
		super('tictactoe',app);
	}

}

export default TicTacToeService;