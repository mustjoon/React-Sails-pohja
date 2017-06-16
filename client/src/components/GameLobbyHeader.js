
import React, { Component } from 'react';
import styles from './styles/GameRowStyles';
import {Grid} from 'semantic-ui-react';

const GameLobbyHeader = ({ id,error,mark })=> {



  return (
			<Grid.Column>
      	<h3>TicTacToe</h3>
			</Grid.Column>
  );
};

export default GameLobbyHeader;
	