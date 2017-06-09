
import SocketService from './SocketService';

//Big changes incoming
class TicTacToeSocket extends SocketService {

	constructor(app){
		super('room',app);
	}

	createRoom(name,handleRoom){
		this.socket.off('room');
		this.socket.post('/room',{name: name},(data => handleRoom(data)));
	}

	joinRoom(id,handleUser){

		const room = 'room/'+id;
		this.socket.post('/'+room+"/user/",{},((data) => {
			console.log(data);
			handleUser(data);
		}));

		//Attach listening event 
		this.socket.on('room'+id,(data) => {
			handleUser(data);
		});

	}	

	leaveRoom(id){
		const room = 'room/'+id;
		
		this.socket.delete('/'+room+'/user/',((data) => {
		}));
			this.socket.off('room'+id);
	}

	makeMove(id,item){

		const room = 'room/'+id;
		const url = '/'+room+'/move/';
 
		console.log(url);

		this.socket.post(url,{item : item},function(data){
			console.log(data);
		});

	}

}

export default TicTacToeSocket;