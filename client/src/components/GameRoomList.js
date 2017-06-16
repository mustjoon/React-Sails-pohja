import React, { Component } from 'react';
import styles from './styles/EmojilistStyles';
import { List,Button } from 'semantic-ui-react'

import {
  Link,
} from 'react-router-dom'

const GameRoomList = ({ GameRooms,onClick })=> {

	const rooms = GameRooms.map((room) => {

				let url = "/tictactoe/room/"+room.id;
				if(room !== undefined && room.id)
				return (
					<List.Item style={styles.listContainer} key={room.id}>
					  <List.Icon name='github' size='large' verticalAlign='middle' />
							<List.Content>
								<List.Header as='a'>{room.name}</List.Header>
								<List.Description as='a'>
									{room.name}
									<Link style={styles.roomLink} key={room.id} to={url} >{room.name}</Link>
								</List.Description>
							</List.Content>
				
					</List.Item>
				)
	});
	

  return (
    <List divided relaxed>
			{rooms}
    </List>
  );
};

export default GameRoomList;
	