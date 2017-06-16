import React, { Component } from 'react';
import styles from './styles/EmojilistStyles';
import { List,Button } from 'semantic-ui-react'

const EmojiList = ({ emojis,onClick })=> {

	const emojiList = emojis.map((emoji) => {
				
				if(emoji !== undefined && emoji.id)
				return (
					<List.Item style={styles.listContainer} key={emoji.id}>
					  <List.Icon name='github' size='large' verticalAlign='middle' />
							<List.Content>
								<List.Header as='a'>{emoji.emoji}</List.Header>
								<List.Description as='a'>
									{emoji.name}
									<Button style={styles.removeButton} size='mini' onClick={() =>onClick(emoji.id)} color='red'>Remove</Button>
								</List.Description>
							</List.Content>
				
					</List.Item>
				)
	});
	

  return (
    <List divided relaxed>
			{emojiList}
    </List>
  );
};

export default EmojiList;
	