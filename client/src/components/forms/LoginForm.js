import React, { Component } from 'react';
import styles from './styles/formStyles';
import { Redirect,Link } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
const LoginForm = ({onChange,credentials,onLogin,error}) => (



		<Form as='div' style={styles.loginForm}  action="#" >
			<h2 style={styles.formHeader}>Enter your email and password</h2>
			<Form.Field>
				<label>Email</label>
				<Form.Input
					type="text"
					value={credentials.email}
					onChange={(e) => 	onChange(e.target)}
					placeholder="Enter text"
					name="email"
			/>
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<Form.Input
					type="password"
					value={credentials.password}
					onChange={(e) => 	onChange(e.target)}
					placeholder="Password"
					name="password"
				/>
			</Form.Field>
			<Form.Field>
				<Form.Checkbox label='Remember me' />
			</Form.Field>
		<Button onClick={() => onLogin()} content='Submit' />
	</Form>

	
);

export default LoginForm;
	
	
	
	