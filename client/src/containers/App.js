import React, { Component } from 'react';
import {  BrowserRouter as Router,Switch,Route,Redirect,withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';
import DevTools from 'mobx-react-devtools';


import Header from '../components/Header';
import Footer from '../components/Footer';

import Notification from '../components/Notification';

import Routes from './Routes';

@withRouter
@inject('userStore')
@inject('notificationStore')
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
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
				<Notification
				title={this.props.notificationStore.title}
				text={this.props.notificationStore.text}
				onClick={this.props.notificationStore.onClick}
				onClose={() => this.props.notificationStore.visible = false}
				visible={this.props.notificationStore.visible}
				/>
				<Routes
				isAuthenticated={isAuthenticated}
				/>
				<Footer/>
				<DevTools />
			</div>
		);
	}
}


