import { observable, action,toJS,computed } from 'mobx';
import axios from 'axios';
import {userService} from '../services';
import { autobind } from 'core-decorators';
import { create, persist } from 'mobx-persist';

import {ticTacToeService} from '../services';

@autobind
class TicTacToeStore {

 @observable players = 0;
 @observable rooms = [];

 @computed get count(){
   return this.rooms.length;
 }


 @action connect(){
	ticTacToeService.connect();
    this.getRooms();
    this.listenRooms();
 }

 @action getRooms(){
    ticTacToeService.list(
    this.addRooms
    )
  }
 @action listenRooms(){
   ticTacToeService.listen(
    this.addRoom
    )
 }
 

 addRooms(rooms){
  this.rooms = rooms;
 }

 findById(array,id){
   console.log(array);
  return array.find((item) => {
    return item.id === id;
  });
 }

 addRoom(room){
   switch(room.verb) {
      case 'created':
        this.rooms.push(room);
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