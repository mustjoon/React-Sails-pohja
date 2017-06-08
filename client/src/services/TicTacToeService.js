
import SocketService from './SocketService';


class TicTacToeService extends SocketService {

	constructor(app){
		super('room',app);
	}

}

export default TicTacToeService;