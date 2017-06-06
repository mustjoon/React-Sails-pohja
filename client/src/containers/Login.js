import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect,Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";

import { FormGroup,FormControl,ControlLabel,HelpBlock,Button,Checkbox } from 'react-bootstrap';

import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';

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

	onForgot = () => {
		console.log("Ding");
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

	render() {

		const credentials = this.userStore.credentials;


		if(this.userStore.isAuthenticated){
			<Redirect to="/home"/>
			return null;
		}

		switch (this.props.match.params.method) {
			case 'register':
				return (
					<div>
						<RegisterForm
							credentials={credentials}
							onChange={(e) => this.userStore.updateCredentials(e)}
							onLogin={() => this.onRegister()}
						/>
					</div>
				);
			



			case 'login':
			return (
				<LoginForm
					credentials={credentials}
					onChange={(e) => this.userStore.updateCredentials(e)}
					onLogin={() => this.onLogin()}
				/>
			);
		




			default:
			return (
				<ForgotPasswordForm
					credentials={credentials}
					onChange={(e) => this.userStore.updateCredentials(e)}
					onForgot={() => this.onForgot()}
				/>
			)
			
		}

	
	}
}
export default withRouter(Login);