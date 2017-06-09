import { observable, action,toJS,computed } from 'mobx';
import axios from 'axios';
import {userService} from '../services';
import { autobind } from 'core-decorators';
import { create, persist } from 'mobx-persist';

import {ticTacToeSocket,ticTacToeService} from '../services';

@autobind
class TicTacToeStore {

 @observable players = 0;
 @observable rooms = [{}];
 @observable roomName = "";
 @observable currentRoom = {};
 @observable gameError = null;
 @observable mark = '';
 @observable started = false;


 @computed get count(){
   return this.rooms.length;
 }

 constructor(){
   this.connect();
 }

 @action connect(){
    ticTacToeSocket.connect();
    this.listenRooms();
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
 
   this.roomName = e.target.value;
 }

 @action createRoom(){
   ticTacToeSocket.createRoom(this.roomName,this.handleUser);
  // ticTacToeSocket.joinRoom(this.rooms[this.rooms.length-1].id,this.handleUser);
 }

 @action joinRoom(){
   const id = this.currentRoom.id;
   ticTacToeSocket.joinRoom(id,this.handleUser);
 }

 @action leaveRoom(){
   const id = this.currentRoom.id;

   ticTacToeSocket.leaveRoom(id);
 }

 @action makeMove(item){
  if(item.mark != ' '){
    this.gameError = "That tile has alerady been picked!";
    return;
  }
   this.gameError = null;
   const id = this.currentRoom.id;


   ticTacToeSocket.makeMove(id,item);
 }



  handleUser(data){
    switch(data.action){
      case 'joined':
      console.log(data);
      this.started = data.start;
      this.addUser(data)
      break;
      case 'left':
      console.log(data);
      this.removeUser(data)
      break;
      case 'mark':
      this.mark = data.data.mark
      break;
      case 'room':
      console.log("new room ");
    }
  }

  addUser(data){
    this.currentRoom.users.push(data.message);
  }
  removeUser(data){
    this.currentRoom.users.remove(this.findById(this.currentRoom.users,data.message.id));
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
   switch(room.action) {
      case 'create':
      console.log(room.data);
        this.rooms[this.rooms.length] = room.data.room;
      break;
      case 'destroyed':
        let item = this.findById(this.rooms,room.id);
        this.rooms.remove(item);
      break;
      case 'updated':
       //ToDo: UPDATE
      break;
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