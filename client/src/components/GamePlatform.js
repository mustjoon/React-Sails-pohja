import React, { Component } from 'react';
import GameRow from './GameRow';
import { inject, observer } from 'mobx-react';



@inject('ticTacToeStore')
@observer
export default class GamePlatform extends Component {
	constructor(props) {
		super(props);
		this.table = this.props.ticTacToeStore.table;
	}

	renderPlatform(){
		let square = this.props.table ? this.props.table : []
		const rows = 3;
		const rowLength = 3;

		//Rows
		let uiRows = [];
		let index = 0;
		for(var row=0;row<rows;row++){
			let rowItem = [];
			for(var length=0;length<rowLength;length++){
				rowItem.push(square[index])
				index++;
			}
			uiRows.push(<GameRow items={rowItem} onClick={(item) => this.props.onClick(item)} />)
		}
		return uiRows;
	}




	render() {
		/*
		if(!this.props.visible){
			return null;
		}
		*/
		return (
			<table>
				{this.renderPlatform()}
			</table>
		);
	}
}

	
	
	
