class SocketService {

	constructor(route,app){
			this.io = app;
			this.route = route;

	}

	connect() {


		var token = localStorage.getItem('token') ||'';
	
		this.io.sails.url = 'http://localhost:1337';
		this.io.sails.headers = {
			Authorization: 'bearer '+ token
		}
			

		this.io.connect('http://localhost:1337');
		this.socket = this.io.socket;


	
		this.socket.on('connect', function () {
			console.log("Socket connection established");
		});

	
	}


	list(func){
		this.socket.get('/'+this.route,function(res){
			console.log(res);
			func(res);
		});
	}

	listen(func){
		this.socket.on(this.route,function(data){
	
			func(data);
		})
	}
}

export default SocketService;