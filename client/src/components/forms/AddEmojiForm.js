import React, { Component } from 'react';
import { FormControl,ControlLabel,Button } from 'react-bootstrap';
import styles from './styles/formStyles';

const AddEmojiForm = ({onChange,credentials,onClick,error}) => (

	<div style={styles.container} className='page login'>
		<h2>Add Emoji</h2>
		<form>
			<ControlLabel>Name</ControlLabel>
				<FormControl
				type="text"
				onChange={(e) => 	onChange(e)}
				placeholder="Name of the emoji"
				name="name"
			/>
			<ControlLabel>Emoji</ControlLabel>
				<FormControl
			
				type="text"
				onChange={(e) => 	onChange(e)}
				placeholder="=)"
				name="emoji"
			/>
			<Button  onClick={() => onClick()}  bsStyle="primary">Add</Button>
		</form>
	</div>
);

	

export default AddEmojiForm;
	
	
	
	