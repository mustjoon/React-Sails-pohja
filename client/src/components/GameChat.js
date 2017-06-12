import React, { Component } from 'react';
import styles from './styles/GameRowStyles';
const GameChat = ({ messages,onClick })=> {

	const m = messages.map((item) => {

		const mark = item.mark ? item.mark : ' ';
	
		return (
			<tr style={styles.item} onClick={() => onClick(item)}>{mark}</tr>
		)
	});

  return (
      <tr style={styles.row}>
				{m}
      </tr>
  );
};

export default GameChat;
	