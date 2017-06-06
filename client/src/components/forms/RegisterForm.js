import React, {  } from 'react';
import { FormControl,ControlLabel,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterForm = ({onChange,credentials,onRegister,error}) => (

	<div className='page login'>
		<h2>Register</h2>
		<h3>{error}</h3>
		<form>
			<ControlLabel>Login</ControlLabel>
				<FormControl
				type="text"
				autoComplete="off"
				value={credentials.email}
				onChange={(e) => 	onChange(e.target)}
				placeholder="Enter text"
				name="email"
		
			/>
			<FormControl
				type="password"
				autoComplete="off"
				value={credentials.password}
				onChange={(e) => 	onChange(e.target)}
				placeholder="Password"
				name="password"
		
			/>
			<FormControl
				type="password"
				autoComplete="off"
				value={credentials.confirmPassword}
				onChange={(e) => 	onChange(e.target)}
				placeholder="Password again"
				name="confirmPassword"
			/>
			<Button  onClick={() => onRegister()}  bsStyle="primary">Login</Button>
		</form>
		<Link onClick={() => 	this.userStore.authenticationError = null} to='/auth/login'>Login</Link>	
	</div>
);

export default RegisterForm;
	
	
	
	