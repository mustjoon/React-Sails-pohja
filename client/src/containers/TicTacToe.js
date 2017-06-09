import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './styles/TicTacToeStyles';
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
class TicTacToe extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
		this.ticStore = this.props.ticTacToeStore;
	}

	createRoom(){
		this.ticStore.createRoom()
		this.props.history.push('/tictactoe/room/'+this.ticStore.currentRoom.id);
	}

	componentDidMount(){
		//this.ticStore.getRooms();
		this.ticStore.listenRooms();
	}

	renderRooms(){
		return this.ticStore.rooms.map((room) => {

			var url = "/tictactoe/room/"+room.id;

			return <div><Link style={styles.roomLink} key={room.id} to={url} >{room.name}</Link></div>
		});
	}

	render() {
		
		return (
			<div className='page home'>
				<h3>TicTacToe</h3>
				<p>Current rooms: {this.ticStore.count}</p>
				<div style={styles.roomList}>
					{this.renderRooms()}
				</div>
				<input onChange={(e) =>  this.ticStore.onChangeName(e) } type="text" name="roomName"></input>
				<button onClick={() => this.createRoom()}>Create room</button>
				
				<p>Current players:{this.ticStore.players}</p>
				
			</div>
		);
	}
}


export default TicTacToe