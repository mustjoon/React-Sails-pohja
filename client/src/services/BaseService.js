import axios from 'axios';
import {BASE_API} from '../utils/constants';



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
		}).catch((error) => {
			console.log('create error',error.response);
		})
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