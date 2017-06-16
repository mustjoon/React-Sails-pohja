import React, { Component } from 'react';
import styles from './styles/GameRowStyles';
const EmojiListHeader = ({ count })=> {


  return (
		<div>
      <div>List of emojis</div>
			<div>Count of emojis: {count}</div>
		</div>
  );
};

export default EmojiListHeader;
	