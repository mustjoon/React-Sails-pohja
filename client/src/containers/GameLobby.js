import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './styles/TicTacToeStyles';
import GameRoomList from '../components/GameRoomList';
import GameLobbyHeader from '../components/GameLobbyHeader';
import GameRoomForm from '../components/forms/GameRoomForm';
import {Grid} from 'semantic-ui-react';
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
		this.ticStore.createRoom(this.props.history)
	}

	componentDidMount(){
		this.ticStore.listenRooms();
	}

	componentWillUnmount(){
		this.ticStore.disconnect();
	}

	render() {
		
		return (
			<Grid container={true} divided="vertically">
				<Grid.Row columns={2}>
					<GameLobbyHeader/>
				</Grid.Row>
				<Grid.Row>
				<div style={styles.roomList}>
					<GameRoomList
					GameRooms={this.ticStore.allRooms}
					/>
				</div>
				<GameRoomForm
				value={this.ticStore.roomName}
				onClick={() => this.createRoom()}
				onChange={(val) => this.ticStore.onChangeName(val)}
				/>
				</Grid.Row>	
				
			</Grid>
		);
	}
}


export default TicTacToe