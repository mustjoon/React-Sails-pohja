
import BaseService from './BaseService';
import axios from 'axios';
const BASE_API = 'http://localhost:1337/';

class UserService extends BaseService {

	constructor(route = 'user'){
		super('user');
	}


	auth(params){
		return axios.post('http://localhost:1337/auth',params).then((res) => {

			const token = res.data.token;
			localStorage.setItem('token',token);


		})
		
	}


	// ONLY FOR CREATING NEW USERS
	create(params){
		const path = '/create';
		return axios.post(BASE_API+this.route+path,params).then((res) => {

			const token = res.data.token;

			localStorage.setItem('token',token);


			return res;


		});
	}


	

}

export default UserService;