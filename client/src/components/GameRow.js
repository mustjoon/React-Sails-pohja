import React, { Component } from 'react';
import { FormGroup,FormControl,ControlLabel,HelpBlock,Button,Checkbox } from 'react-bootstrap';
import { Redirect,Link } from 'react-router-dom';
import styles from './styles/GameRowStyles';





const GameRow = ({ items,onClick })=> {




	const rowItems = items.map((item) => {
		return (
			<div style={styles.item} onClick={() => onClick(item)}>{item.mark}</div>
		)
	});

  return (
      <div style={styles.row}>
				{rowItems}
      </div>
  );
};

export default GameRow;
	