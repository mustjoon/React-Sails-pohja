import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GamePlatform from '../components/GamePlatform';
import GameHeader from '../components/GameHeader';
import GameChat from '../components/GameChat';
import {
  BrowserRouter as Router,
  Redirect,
  withRouter
} from 'react-router-dom'

@withRouter
@inject('ticTacToeStore')
@inject('notificationStore')
@observer
class GameRoom extends Component {
	constructor(props) {
		super(props);
		this.ticStore = this.props.ticTacToeStore;
	}



	componentDidMount(){
			if(this.props.match.params.id){
				this.ticStore.setCurrentRoom(this.props.match.params.id);
				this.ticStore.joinRoom();
		}

	}

	componentWillUnmount(){
		this.ticStore.leaveRoom();
	}


	checkStatus(){
		const room = this.ticStore.currentRoom;
		if(!room) return null;

		if(!this.props.match.params.id){
			return (
				<Redirect to="/emoji"/>
			)
		}
		if(this.ticStore.winner){
			this.props.notificationStore.setDetails({title: 'Game Over', 'text': this.ticStore.winner + " won"});
			this.props.notificationStore.visible = true;
			this.props.history.push('/tictactoe');
		}
	}

	renderPlayers(){
		const room = this.ticStore.currentRoom;
		if(!room.users) return null;

		return room.users.map((user) => {
			return user.email;
		});
	}

	makeMove(item){
		this.ticStore.makeMove(item);
		setTimeout(this.checkStatus(),500);
	
	}

	render() {

		

	
		
		return (
			<div className='page home'>
				<GameHeader
					id={this.ticStore.id}
					mark={this.ticStore.mark}
					error={this.ticStore.gameError}
				/>
				<GamePlatform
					table={this.ticStore.table}
					visible={this.ticStore.started}
					onClick={(item) => this.makeMove(item)}
				/>
				<GameChat
					messages={[]}
					onClick={(message) => this.ticStore.sendMessage(message)}
				/>
			</div>
		);
	}
}


export default GameRoom