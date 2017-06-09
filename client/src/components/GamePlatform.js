import React, { Component } from 'react';
import GameRow from './GameRow';


export default class GamePlatform extends Component {
	constructor(props) {
		super(props);
	}





	//Goes to Store
	sortFunction(array1,array2){
		let a = {};
		let b = {};
		a.x = array1.pos.x;
		a.y = array1.pos.y;

		b.y = array2.pos.y;
		b.x = array2.pos.x;
		if(a.x>b.x){
			return 1
		}
		else if(a.x<b.x){
			return -1;
		}
		else {
			if(a.y>b.y){
				return 1;
			}
			else if(a.y<b.y){
				return -1;
			}
			else{
				return 0;
			}
		}
	}


	onClick(item){
		console.log(item);
	}

	renderPlatform(){

		const styles = {};
	

		//XY-koordinaatisto

		let square = [
			 {mark: ' ', pos:{x:0,y:0}},
			 {mark: 'O', pos:{x:1,y:1}},
			 {mark: ' ', pos:{x:2,y:2}},
			 {mark: 'O', pos:{x:0,y:1}},
			 {mark: 'X', pos:{x:1,y:2}},
			 {mark: 'O', pos:{x:2,y:0}},
			 {mark: ' ', pos:{x:0,y:1}},
			 {mark: 'O', pos:{x:1,y:0}},
			 {mark: 'O', pos:{x:2,y:0}}
		];

		square = square.sort(this.sortFunction);
	
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

		if(!this.props.visible){
			return null;
		}
	
		return (
			<div>
				{this.renderPlatform()}
			</div>
		);
	}
}

	
	
	
