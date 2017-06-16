import { observable, computed, action,toJS } from 'mobx';
import {userService} from '../services';
import { autobind } from 'core-decorators';
import { create, persist } from 'mobx-persist';

@autobind
class NotificationStore {

	@observable visible = false;
	@observable title ="Title";
	@observable text = "Text";
	@observable onClick = () => {
		this.visible = false;
	}


	@action setDetails(details){
		this.title = details.title;
		this.text = details.text;
		this.visible = true;
	}

	@action setFunction(callback){
		this.onClick = callback;
	}

	

}


const notificationStore = new NotificationStore();
export default notificationStore;