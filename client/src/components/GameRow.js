import React, { Component } from 'react';
import styles from './styles/GameRowStyles';
const GameRow = ({ items,onClick })=> {

	const rowItems = items.map((item) => {

	
	
		return (
			<tr style={styles.item} onClick={() => onClick(item)}>{item.mark}</tr>
		)
	});

  return (
      <tr style={styles.row}>
				{rowItems}
      </tr>
  );
};

export default GameRow;
	