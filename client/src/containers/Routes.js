import React, { Component } from 'react';
import {  BrowserRouter as Router,Switch,Route,Redirect,withRouter } from 'react-router-dom';
import Protected from './Protected';
import Emoji from './Emoji';
import Launch from './Launch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import NotFound from './NotFound';
import Auth from './Auth';
import GameLobby from './GameLobby';
import GameRoom from './GameRoom';

const Routes = ({ isAuthenticated })=> {



  return (
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
					component={GameLobby}
				/>
				<Protected
					isAuthenticated={isAuthenticated}
					path='/emoji'
					component={Emoji}
				/>

				<Route
					path='/auth/:method'
					component={Auth}
				/>

				<Route
					path='*'
					component={NotFound}
				/>
			</Switch>
  );
};

export default Routes;
	