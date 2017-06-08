class SocketService {

	constructor(route,app){
			this.io = app;
			this.route = route;
	}

	connect() {
		this.io.connect('http://localhost:1337');
	}


	list(func){

		this.io.socket.get('/'+this.route,function(res){
			func(res);
		});
	}

	listen(func){
		this.io.socket.on(this.route,function(data){
			func(data);
		})
	}
}

export default SocketService;