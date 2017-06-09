import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GamePlatform from '../components/GamePlatform';
import {
  BrowserRouter as Router,
  Route,
  Link,
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
				<h3>Game room</h3>
				<p>{room.id}</p>
				<p>{this.ticStore.gameError}</p>
				<p>You are playing: {this.ticStore.mark}</p>
				{this.renderPlayers()}
				<GamePlatform
					visible={this.ticStore.started}
					onClick={(item) => this.ticStore.makeMove(item)}
				/>
				
			</div>
		);
	}
}


export default GameRoom