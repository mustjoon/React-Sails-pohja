import React, { Component } from 'react';
import styles from './styles/formStyles';
import { Redirect,Link } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
const GameRoomForm = ({onChange,onClick}) => (

	

		<Form as='div' style={styles.loginForm}  action="#" >
			<h2 style={styles.formHeader}>Room</h2>
			<Form.Field>
				<label>Room Name</label>
				<Form.Input
					type="text"
				
					onChange={(e) => 	onChange(e.target)}
					placeholder="Room name"
					name="roomName"
			/>
			</Form.Field>
			<Button onClick={() => onClick()} content='Submit' />
		</Form>

	
);

export default GameRoomForm;
	
	
	
	