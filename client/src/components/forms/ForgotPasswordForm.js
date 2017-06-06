import React, { Component } from 'react';
import { FormGroup,FormControl,ControlLabel,HelpBlock,Button } from 'react-bootstrap';
import { Redirect,Link } from 'react-router-dom';

const ForgotForm = ({onChange,credentials,onForgot,error}) => (

	<div className='page login'>
		<h2>Forgot password</h2>
		<h3>this is not currently working</h3>
		<form>
			<ControlLabel>Email</ControlLabel>
				<FormControl
				type="text"
				value={credentials.email}
				onChange={(e) => 	onChange(e.target)}
				placeholder="Enter text"
				name="email"
			/>
			<Button  onClick={() => onForgot()}  bsStyle="primary">Login</Button>
		</form>
	</div>
);

export default ForgotForm;
	
	
	
	