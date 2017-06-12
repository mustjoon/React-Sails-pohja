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

	renderPlayers(){
		const room = this.ticStore.currentRoom;
		if(!room.users) return null;

		return room.users.map((user) => {
			return user.email;
		});
	}

	render() {

		const room = this.ticStore.currentRoom;
		if(!room) return null;

		if(!this.props.match.params.id){
			return (
				<Redirect to="/emoji"/>
			)
		}
		
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
					onClick={(item) => this.ticStore.makeMove(item)}
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