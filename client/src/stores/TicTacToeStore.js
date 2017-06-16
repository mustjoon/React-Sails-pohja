import { observable, action,toJS,computed } from 'mobx';
import axios from 'axios';
import {userService} from '../services';
import { autobind } from 'core-decorators';
import { create, observe, persist } from 'mobx-persist';

import {ticTacToeSocket,ticTacToeService} from '../services';

@autobind

class TicTacToeStore {

  @observable players = 0;
  @observable rooms = observable([]);
  @observable roomName = "";
  @observable currentRoom = {};
  @observable gameError = null;
  @observable isMaking = false;
  @observable isFinishedMaking = false;
  @observable mark = '';
  @observable started = false;
  @observable over = false;
  @observable winner = '';
  @observable table = [{mark: null, pos:{x:0,y:0}},
                       {mark: null, pos:{x:1,y:1}},
                       {mark: null, pos:{x:2,y:2}},
                       {mark: null, pos:{x:0,y:1}},
                       {mark: null, pos:{x:0,y:2}},
                       {mark: null, pos:{x:1,y:0}},
                       {mark: null, pos:{x:2,y:0}},
                       {mark: null, pos:{x:1,y:2}},
                       {mark: null, pos:{x:2,y:1}}];
                    
                    
  @computed get count(){
    return this.rooms.length;
  }

  @computed get allRooms(){
    return toJS(this.rooms);
  }

  constructor(){
    this.connect();
  
   
  }

  @action connect(){
      ticTacToeSocket.connect();
      this.listenRooms();
  }

  @action disconnect(){
    ticTacToeSocket.disconnect();
  }

  @action getRooms(){
      ticTacToeService.find().then((res) => {
        this.rooms = res.data;
      })
      .catch(err =>console.log(err))
    }

  @action listenRooms(){
    ticTacToeSocket.list(
      this.addRooms
    )

    ticTacToeSocket.listen(
      this.addRoom
      )
  }

  @action setCurrentRoom(id){
    this.currentRoom = this.findById(this.rooms,id)
  }

  @action onChangeName(e){
   
    this.roomName = e.value;
  }

  @action createRoom(callback){
    this.isMaking = true;
    return  Promise.resolve(ticTacToeSocket.createRoom(this.roomName,callback));
    // ticTacToeSocket.joinRoom(this.rooms[this.rooms.length-1].id,this.handleUser);
  }

 @action joinRoom(){
   const id = this.currentRoom.id;
   ticTacToeSocket.joinRoom(id,this.handleUser);
 }

 @action leaveRoom(){
   const id = this.currentRoom.id;

   ticTacToeSocket.leaveRoom(id);
   this.roomName = "";
   this.currentRoom = {};
   this.gameError = null;
   this.mark = '';
   this.started = false;
   this.over = false;
   this.winner = '';

 }

 @action makeMove(item){

  if(this.over){
    this.gameError = "Game is already over!";
    return;
  }
  else if(item.mark != null && item.mark != ' '){
    this.gameError = "That tile has alerady been picked!";
    return;
  }
  
   this.gameError = null;
   const id = this.currentRoom.id;

   const params = { id: id,mark: this.mark, pos:item}

   return new Promise((resolve,reject) =>{
     resolve(ticTacToeSocket.makeMove(params,this.handleUser));
   });
 }



  handleUser(data){
    switch(data.action){
      case 'joined':
      this.started = data.start;
      this.addUser(data)
  
      break;
      case 'left':
      this.removeUser(data)
      break;
      case 'mark':
      this.mark = data.data.mark;
      this.setBoard(data.data.room.positions);
      break;
      case 'room':
      break;
      case 'newMove':
      this.updateBoard(data);
      return "PASKA";
      break;
      case 'winner':
      this.announceWinner(data)
      break;
    }
  }

  addUser(data){
    if(!this.currentRoom.users){
      this.currentRoom.users = [];
    }
    this.currentRoom.users.push(data.message);
  }
  removeUser(data){
    this.currentRoom.users.remove(this.findById(this.currentRoom.users,data.message.id));
  }

  setBoard(data){
    this.table = data;
  }

  updateBoard(data){
    const index = this.table.findIndex((item)=> {
      return item.pos.y == data.message.pos.y && item.pos.x == data.message.pos.x
    });
    this.table[index] = {mark: data.message.mark, pos: {x : data.message.pos.x, y: data.message.pos.y}};
  }

  announceWinner(data){
    console.log(data);
    this.winner = data.message.mark;
    this.over = true;
    console.log(this.winner);
  
    return this.over;
    //this.winner = data.mark.
  }

 

 addRooms(rooms){
  this.rooms = rooms;
 }

 findById(array,id){
  return array.find((item) => {
    return item.id === id;
  });
 }

 addRoom(room){
   console.log(room);
   switch(room.action) {
      case 'create':
        this.rooms[this.rooms.length] = room.data.room;
        this.rooms = this.rooms;
      break;
      case 'destroyed':
        let item = this.findById(this.rooms,room.id);
        this.rooms.remove(item);
      break;
      case 'updated':
       //ToDo: UPDATE
      break;
      case 'selfCreate':
    
      this.currentRoom = {};
      this.currentRoom.id = room.room.id;
      this.isFinishedMaking = true;
      //this.joinRoom();
      break;
   }
 }

 sendMessage(){
   console.log("ToDo chat!");
 }

 sortTable(array1,array2){
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
}
const ticTacToeStore = new TicTacToeStore();
/*
const hydrate = create({
    storage: localStorage,  
                            
    jsonify: false 
                  
})
*/
/*hydrate('tictactoe', ticTacToeStore)
    // post hydration
    .then(() => console.log('tictacs hydrated'))
    */
export default ticTacToeStore;