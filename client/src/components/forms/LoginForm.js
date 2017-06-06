import React, { Component } from 'react';
import { FormGroup,FormControl,ControlLabel,HelpBlock,Button,Checkbox } from 'react-bootstrap';
import { Redirect,Link } from 'react-router-dom';

const LoginForm = ({onChange,credentials,onLogin,error}) => (

	<div className='page login'>
		<h2>Login</h2>
		<h3>{error}</h3>
		<form>
			<ControlLabel>Login</ControlLabel>
				<FormControl
				type="text"
				value={credentials.email}
				onChange={(e) => 	onChange(e.target)}
				placeholder="Enter text"
				name="email"
			/>
			<FormControl
				type="password"
				value={credentials.password}
				onChange={(e) => 	onChange(e.target)}
				placeholder="Password"
				name="password"
			/>
			<Checkbox  
			value={credentials.remember}
			onChange={(e) => this.onRemember(e)}
			name="remember"
			>
			Remember me
		</Checkbox>
			<Button  onClick={() => onLogin()}  bsStyle="primary">Login</Button>
		</form>
		<Link onClick={() => this.userStore.authenticationError = null}  to='/auth/register'>Register</Link>	
	</div>
);

export default LoginForm;
	
	
	
	