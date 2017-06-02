import { observable, action,toJS } from 'mobx';
import axios from 'axios';
import {userService} from '../services';
import { autobind } from 'core-decorators';
import { create, persist } from 'mobx-persist';

@autobind
class UserStore {

  @observable isAuthenticated;
	@observable authenticationError;
 

	@observable credentials = {
		email: '',
		password: '',
		confirmPassword: ''
	}


	//User data object!!
	@persist('object') @observable user = {
		remember: false
	};


  constructor() {
		console.log('token',localStorage.getItem('token'));
    this.isAuthenticated = localStorage.getItem('token') ? true : false;
  }




	@action updateCredentials(obj){
		let values = [];
		values[obj.name] = obj.value;
		this.credentials = Object.assign({},this.credentials,values);
	}


	@action register(){
		
		//ToDo: Error Messages
		const params = toJS(this.credentials);
		return userService.create(params).then(res =>
			this.user = res.data.user,
			this.isAuthenticated = true
		)
	}

	@action login(){
	
		return userService.auth(this.credentials).then((res) => {

			this.isAuthenticated = true;

		}).catch((err) => {

			console.log(err);

			this.authenticationError = err.response.data.err;
		})
	}

	@action logout(){
		localStorage.removeItem('token');
		this.isAuthenticated = false;
	}
}

const userStore = new UserStore();

const hydrate = create({
    storage: localStorage,  
                            
    jsonify: false 
                  
})

hydrate('user', userStore)
    // post hydration
    .then(() => console.log('user hydrated'))
export default userStore;