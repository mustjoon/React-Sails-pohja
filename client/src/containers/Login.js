import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect,Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";

@withRouter
@inject('userStore')
@observer
class Login extends Component {

	constructor(props,context){
		super(props,context);
		this.userStore = props.userStore;
	}

	componentDidMount(){
		this.userStore.authenticationError = null;
	}


	onRemember = (e) => {
		this.userStore.user.remember = e.target.checked;
	}

	onLogin = () => {
		this.userStore.login().then(
		
			this.props.history.push('/home')
		)
	}

	onRegister = () => {
		this.userStore.register().then(
		
			this.props.history.push('/home')
		)

	}

	renderRegister = () => {
		if(this.props.match.params.method !== 'register'){
			return null;
		}
		const credentials = this.userStore.credentials;
		return (
			<div className='page login'>
				<h2>Register</h2>
				<form action="#">
					<input value={credentials.userName} onChange={(e) => 	this.userStore.updateCredentials(e.target)} name="email" type="text"/>
					<input value={credentials.password} onChange={(e) => 	this.userStore.updateCredentials(e.target)} name="password" type="password"/>
					<input value={credentials.confirmPassword} onChange={(e) => this.userStore.updateCredentials(e.target)} name="confirmPassword" type="password"/>
					<button onClick={() => this.onRegister()}  type="button">Submit</button>
				</form>
				<Link onClick={() => 	this.userStore.authenticationError = null} to='/auth/login'>Login</Link>	
			</div>
		);
	}

	renderLogin = () => {
		if(this.props.match.params.method !== 'login'){
			return null;
		}
		const credentials = this.userStore.credentials;
		return (
			<div className='page login'>
				<h2>Login</h2>
				<form action="#" type="POST">
					<input value={credentials.userName} onChange={(e) => 	this.userStore.updateCredentials(e.target)} name="email" type="text"/>
					<input value={credentials.password} onChange={(e) => 	this.userStore.updateCredentials(e.target)} name="password" type="password"/>
					<label>Remember me</label>
					<input type="checkbox" value={credentials.remember} onChange={(e) => this.onRemember(e)}  name="remmeber"/>
					<button onClick={() => this.onLogin()}  type="button">Submit</button>
				</form>
				<Link onClick={() => this.userStore.authenticationError = null}  to='/auth/register'>Register</Link>	
			</div>
		)
	}


	render() {


		if(this.userStore.isAuthenticated){
			<Redirect to="/home"/>
			return null;
		}

		return (
			<div>
				<h3>{this.userStore.authenticationError}</h3>
				{this.renderRegister()}
				{this.renderLogin()}
			</div>
		);
	}
}
export default withRouter(Login);