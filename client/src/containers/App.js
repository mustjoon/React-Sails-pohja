import React, { Component } from 'react';
import {  BrowserRouter as Router,Switch,Route,Redirect,withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';
import DevTools from 'mobx-react-devtools';

import Emoji from './Emoji';
import Launch from './Launch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import NotFound from './NotFound';
import Login from './Login';
import TicTacToe from './TicTacToe';
import GameRoom from './GameRoom';


import Protected from './Protected';

@withRouter
@inject('appState')
@inject('userStore')

@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.appState = props.appState;
	}
	componentDidMount() {
	}
	authenticate(e) {
		if (e) e.preventDefault();
		this.appState.authenticate();
	}
	render() {

		const isAuthenticated = this.props.userStore.isAuthenticated;

		return (
			<div className='wrapper'>
				<Header
				isAuthenticated={isAuthenticated}
				history={this.props.history}
				logout={() => this.props.userStore.logout()}
				 />
				<Switch>
					<Route
						exact
						path='/'
						component={Launch}
					/>

					<Protected
						isAuthenticated={isAuthenticated}
						path='/home'
						component={Home}
					/>
					<Protected
						isAuthenticated={isAuthenticated}
						path='/tictactoe/room/:id'
						component={GameRoom}
					/>
					<Protected
						isAuthenticated={isAuthenticated}
						path='/tictactoe'
						component={TicTacToe}
					/>
					<Protected
						isAuthenticated={isAuthenticated}
						path='/emoji'
						component={Emoji}
					/>

					<Route
						path='/auth/:method'
						component={Login}
					/>

					<Route
						path='*'
						component={NotFound}
					/>
				</Switch>
				<Footer/>
			</div>
		);
	}
}


