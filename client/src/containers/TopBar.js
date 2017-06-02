import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';

import TopNav from './TopNav';
import Button from '../components/ui/Button';

@withRouter
@inject('appState')
@inject('userStore')
@observer
export default class TopBar extends Component {

	isAuthenticated;
	constructor(props) {
		super(props);
		this.store = props.appState;
		this.userStore = props.userStore;
		this.isAuthenticated = props.userStore.isAuthenticated
	}

	authenticate() {
	
		if(this.isAuthenticated){
			this.userStore.logout();
		}else{
			this.props.history.push('/auth/login');
		}
	}

	renderMenu(){
		if(!this.isAuthenticated){
			return null;
		}
		return (
			<div><Link to ='/emoji'> Emojis</Link></div>
		)
		
	}

	render() {
		const email = this.isAuthenticated ? this.userStore.credentials.email : "";
	


		return (
			<div className='topbar'>
				<TopNav location={this.props.location} />
				{this.renderMenu()}
				<Button
					onClick={() => this.authenticate()}
					title={this.isAuthenticated ? 'Log out' : 'Sign in'}
				/>
			</div>
		);
	}
}
