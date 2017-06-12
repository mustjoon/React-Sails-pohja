
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
			console.log('post',data);
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

	makeMove(params,callback){

		const room = 'room/'+params.id;
		const url = '/'+room+'/move/';
 
		
		this.socket.post(url,params,function(data){
			callback(data);
		});

	}

}

export default TicTacToeSocket;