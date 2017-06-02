import axios from 'axios';

const BASE_API = 'http://localhost:1337/';


class BaseService {

	constructor(route){
		this.route = route;
	}

	auth() {

	}

	create(params){

		const action = '/create';

		const url = BASE_API+this.route+action;

		const token = localStorage.getItem('token') || '';

	

		const config = {
			headers: {'Authorization': "bearer " + token}
			
		}


	
		return axios.post(url,params,config).then((res) => {
			return res;
		});
	}

	find(){
		const action = '';

		const url = BASE_API+this.route+action;



		const token = localStorage.getItem('token') || '';

		const config = {
			headers: {'Authorization': "bearer " + token}
			
		}

		return axios.get(url,config).then((res) => {
			return res;
		})
	}

	remove(id){
		const action =  '/'+id;

		const url = BASE_API+this.route+action;



		const token = localStorage.getItem('token') || '';

		const config = {
			headers: {'Authorization': "bearer " + token}
			
		}

		console.log(url);

		return axios.delete(url,config).then((res) => {
			return res;
		})
	}



	

}

export default BaseService;