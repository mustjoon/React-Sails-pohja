import { observable, action,toJS,computed } from 'mobx';
import axios from 'axios';
import {userService} from '../services';
import { autobind } from 'core-decorators';
import { create, persist } from 'mobx-persist';

import {emojiService} from '../services';

@autobind
class EmojiStore {

  @observable emoji = {
		name: '',
		emoji: ''
	}
	@persist('list') @observable emojiList = [];

	getEmojis(){
		emojiService.find().then((res) => {
			console.log(res);
			this.emojiList = res.data;
		})
	}

	@action saveEmoji(){
		const params = toJS(this.emoji);
		return emojiService.create(params).then((res) => {
			this.emojiList.push(res.data);
			this.emoji.name = '';
			this.emoji.emoji = '';
		});

	
	}

	@action removeEmoji(id){
		
		return emojiService.remove(id).then((res => {
			let emoji = this.emojiList.find(x => x.id === res.data.id);
			this.emojiList.remove(emoji);
		}))
	}

	@action updateEmoji(obj){
		let values = [];
		values[obj.name] = obj.value
		this.emoji = Object.assign({},this.emoji,values);
	}

	@computed get count(){
		return this.emojiList.length;
	}

}

const emojiStore = new EmojiStore();

const hydrate = create({
    storage: localStorage,  
                            
    jsonify: false 
                  
})

hydrate('emoji', emojiStore)
    // post hydration
    .then(() => console.log('emojis hydrated'))
export default emojiStore;