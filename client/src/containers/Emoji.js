import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {withRouter} from "react-router-dom";
import AddEmojiForm from '../components/forms/AddEmojiForm';
import EmojiListHeader from '../components/EmojiListHeader';
import EmojiList from '../components/EmojiList';
@withRouter
@inject('emojiStore')
@inject('notificationStore')
@observer
export default class Emoji extends Component {

	constructor(props) {
		super(props);
		this.emojiStore = this.props.emojiStore;
		this.notiStore = this.props.notificationStore;
	}

	componentDidMount(){
		this.emojiStore.getEmojis();
	}

	onCreateClick(){
		 this.emojiStore.saveEmoji().then(()=> {
			 this.notiStore.setDetails({
				title: "Emoji created",
				text: 'Yey!'
			});
		 }) 
	}

	onRemoveClick(id){
		this.emojiStore.removeEmoji(id);
		this.notiStore.setDetails({
				title: "Emoji removed",
				text: '=('
		});
	}

	render() {
		
		return (
			<div>
				<EmojiListHeader
				count={this.emojiStore.count}
				/>
				<EmojiList
				emojis={this.emojiStore.emojiList}
				onClick={(id) => this.onRemoveClick(id)}
				/>
				<AddEmojiForm
					onChange={(e) => this.emojiStore.updateEmoji(e.target)}
					onClick={() => this.onCreateClick()}
				/>
			</div>
		);
	}
}
