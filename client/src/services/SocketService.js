import {SOCKET_API}  from '../utils/constants';

class SocketService {

	constructor(route,app){
			this.io = app;
			this.route = route;

	}

	connect() {

		console.log(SOCKET_API);
		var token = localStorage.getItem('token') ||'';
	
		this.io.sails.url = SOCKET_API ;
		this.io.sails.headers = {
			Authorization: 'bearer '+ token
		}
			

		this.io.connect(SOCKET_API);
		this.socket = this.io.socket;


	
		this.socket.on('connect', function () {
			console.log("Socket connection established");
		});

	
	}

	disconnect(){
		this.socket.off(this.route);
	}


	list(callback){
		this.socket.get('/'+this.route,function(res){
			console.log(res);
			callback(res);
		});
	}

	listen(callback){
		this.socket.on(this.route,function(data){
	
			callback(data);
		})
	}
}

export default SocketService;