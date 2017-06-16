import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {withRouter} from "react-router-dom";
import AddEmojiForm from '../components/forms/AddEmojiForm';
import EmojiListHeader from '../components/EmojiListHeader';
import EmojiList from '../components/EmojiList';
import {Grid} from 'semantic-ui-react';


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
		this.emojiStore.removeEmoji(id).then(() => {
			this.notiStore.setDetails({
				title: "Emoji removed",
				text: '=('
			});
		})
		
	}

	render() {
		
		return (	
				<Grid container={true} divided="vertically">
						<EmojiListHeader
						count={this.emojiStore.count}
						/>
					<Grid.Row columns={2}>
						<Grid.Column>
							<EmojiList
							emojis={this.emojiStore.emojiList}
							onClick={(id) => this.onRemoveClick(id)}
							/>
						</Grid.Column>
						<Grid.Column>
							<AddEmojiForm
								emoji={this.emojiStore.emoji}
								onChange={(e) => this.emojiStore.updateEmoji(e.target)}
								onClick={() => this.onCreateClick()}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
		);
	}
}
