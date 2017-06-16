import React, { Component } from 'react';
import styles from './styles/formStyles';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const AddEmojiForm = ({onChange,emoji,onClick,error}) => (


	<Form as='div' action="#" >
  	<Form.Field>
			<label>Name</label>
    	<Form.Input
				type="text"
				value={emoji.name}
				onChange={(e) => 	onChange(e)}
				placeholder="Name of the emoji"
				name="name"			
			/>
		</Form.Field>
		<Form.Field>
			<label>Emoji</label>
    	<Form.Input
				value={emoji.emoji}
				type="text"
				onChange={(e) => 	onChange(e)}
				placeholder="=)"
				name="emoji"
			/>
		</Form.Field>
		 <Form.Button onClick={() => onClick()} content='Submit' />
	
	</Form>

);




	

	

export default AddEmojiForm;
	
	
	
	