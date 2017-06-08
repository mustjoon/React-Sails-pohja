import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

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

	componentDidMount(){
		this.ticStore.connect();
	}

	render() {
		
		return (
			<div className='page home'>
				<h3>TicTacToe</h3>
				<p>Current rooms: {this.ticStore.count}</p>
				<p>Current players:{this.ticStore.players}</p>
				
			</div>
		);
	}
}


export default TicTacToe