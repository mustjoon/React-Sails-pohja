
import React, { Component } from 'react';
import styles from './styles/GameRowStyles';
const GameHeader = ({ id,error,mark })=> {



  return (
			<div>
      	<h3>Game room</h3>
				<p>{id}</p>
				<p>{error}</p>
				<p>You are playing: {mark}</p>
			</div>
  );
};

export default GameHeader;
	