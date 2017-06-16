import React, { Component } from 'react';
import styles from './styles/GameRowStyles';
import {Grid} from 'semantic-ui-react';
const EmojiListHeader = ({ count })=> {


  return (
	
			<Grid.Row style={{height: '10%'}} columns={1}>
				<Grid.Column >
					<h3>List of emojis</h3>
					<p>Count of emojis: {count}</p>
				</Grid.Column>
			</Grid.Row>
  );
};

export default EmojiListHeader;
	