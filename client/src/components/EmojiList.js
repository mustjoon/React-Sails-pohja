import React, { Component } from 'react';
import styles from './styles/GameRowStyles';
const EmojiList = ({ emojis,onClick })=> {

	const emojiList = emojis.map((emoji) => {
				
				if(emoji !== undefined && emoji.id)
				return (
					<li key={emoji.id}>
						{emoji.name} {emoji.emoji} 
						<button onClick={() =>onClick(emoji.id)}>X</button>
					</li>
				)
	});
	

  return (
      <ul>
				{emojiList}
      </ul>
  );
};

export default EmojiList;
	