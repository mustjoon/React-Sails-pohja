import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {withRouter} from "react-router-dom";
@withRouter
@inject('emojiStore')
@observer
export default class Emoji extends Component {

	constructor(props) {
		super(props);
		this.emojiStore = this.props.emojiStore;
	}


	renderEmojis(){
		let emojis = this.emojiStore.emojiList.map((emoji) => {
			
			if(emoji !== undefined && emoji.id)
			return (
				<li key={emoji.id}>{emoji.name} {emoji.emoji} <button onClick={() => this.emojiStore.removeEmoji(emoji.id)}>X</button></li>
			)
		})
		return (
			<ul>
				{emojis}
			</ul>
		)
	}

	render() {
		
		return (
			<div className='page emoji'>
				<h3>List of emojis</h3>
				{this.renderEmojis()}
				<label>Name</label>
				<input name="name" type="text" onChange={(e) => this.emojiStore.updateEmoji(e.target)}/>
				<label>Emoji</label>
				<input name="emoji" type="text" onChange={(e) => this.emojiStore.updateEmoji(e.target)}/>
				<button type="button" onClick={() => this.emojiStore.saveEmoji()}>Create</button>
			</div>
		);
	}
}
