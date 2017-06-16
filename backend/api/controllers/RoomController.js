module.exports = {



  create: function(req,res,next){
    var socket = req.socket;
    var io = sails.io;

    // Get the ID of the room to join
    var name = req.body.name;
    var userId = req.token.id;
  
    return Room.create({name: name}).exec(function(err,room){
      io.sockets.emit('room',{action: 'create',data: {room}});
      return res.json({ action: 'selfCreate',room});
    })
  },

  joinRoom: function(req,res,next){

    var socket = req.socket;
    var io = sails.io;
  
      
    //Register only socket connections
    if(!req.isSocket){
      return res.json(401,{err: 'Only socket connection is allowed'});
    }
 
    var roomId = req.param('roomId');
    var userId = req.token.id;
    var email = req.token.email;
    var mark = '';

    //Sub to event and save new member to room
    Room.subscribe(req, roomId, ['message']);

  

    return Room.findOne({id: roomId}).exec(function(err,room){
      if(!room){
        return res.json(err);
      }


      
      if(room.userCount === undefined){
        room.userCount = 0;
      }
         
      //Only 2 players per game
      if(room.userCount >1){
        return res.json(401,{err: 'Room is already full'});
      }
      var start = false;
      room.userCount++;
      room.users.add(userId);
      room.save();
      //Second member
      if(room.userCount == 1){
        mark = 'X';
      
      }
      else {
        mark = 'O';
        start = true;


        io.sockets.emit('room'+roomId,{action: 'board', message: {board: room.positions}})


      }
      
      sails.log.info("COUNT:" + room.userCount);
      io.sockets.emit('room'+roomId,{ start: start, action: 'joined',message: {id: userId, email: email,mark: mark}});

      io.sockets.adapter.clients(["room'+roomId"], function(err, clients){
     console.log("total clients in room1: %d", clients.length);
    });
      return res.json({action: 'mark', data:{room,mark}});
    })

  },

  
  // Leave a chat room -- this is bound to 'delete /room/:roomId/users'
  'leaveRoom': function(req, res, next) {

    var socket = req.socket;
    var io = sails.io;

    // Get the ID of the room to join
    var roomId = req.param('roomId');
    var userId = req.token.id;
    // Unsubscribe the requesting socket from the "message" context
    Room.unsubscribe(req, roomId, ['message']);
   
    return Room.findOne({id: roomId}).exec(function(err,room){
      room.users.remove(userId);
      room.userCount--;

      sails.sockets.subscribers('room'+roomId, function(data){
        console.log(data);
      });

      if(room.userCount == 0){
        Room.destroy({id: room.id}).exec(function(data){
            io.sockets.emit('room'+roomId,{action: 'left',message: {id: 'removed'}});
        });
       // room.save();
      
      }
      else {
        room.save();
        io.sockets.emit('room'+roomId,{action: 'left',message: {id: userId}});
      }

    
    
      return res.json(room);
     
    })
  },


    //PLAYER 0 = O PLAYER 1 = X
  'makeMove' : function (req,res,next){
     var socket = req.socket;
     var io = sails.io;

     var roomId = req.body.id;
   
    
     var mark = req.body.mark;
     var newPos = req.body.pos;
    
    
     
     Room.findOne({id: roomId}).exec(function(err,room){
      

      //Check turn

      if(mark != room.turn){
        return res.json({'error': 'error'});
      }

       room.positions = room.positions.map((roomPos,index) =>{
      
        if(roomPos.pos.y === newPos.pos.y && roomPos.pos.x === newPos.pos.x){
          roomPos.mark = mark;
        }
        return roomPos;
     
       })
      
       room.turn = room.turn == 'X' ? 'O' : 'X';

       room.save();
       const message = {action: 'newMove', message: {mark: mark,pos: {x: newPos.pos.x, y: newPos.pos.y}}};

       io.sockets.emit('room'+roomId, message);

   
        

       function areEqual(){
        var len = arguments.length;
        for (var i = 1; i< len; i++){
            if (arguments[i] === ' ' || arguments[i] === null || arguments[i] !== arguments[i-1])
              return false;
        }
        return true;
      }

       const winnerMessage = {action: 'winner', message: {mark: mark}};

     

       //Check for winner
       const rows = 3; //X
       const length = 3; // Y
       var pos = room.positions;
       //ROWS
       if(areEqual(pos[0].mark, pos[1].mark,pos[2].mark)){
          io.sockets.emit('room'+roomId, winnerMessage);
       }
       else if(areEqual(pos[3].mark,pos[4].mark,pos[5].mark)) {
         io.sockets.emit('room'+roomId, winnerMessage);
       }
       else if(areEqual(pos[6].mark,pos[7].mark,pos[8].mark)) {
           io.sockets.emit('room'+roomId, winnerMessage);
       }

       //COLS
       else if(areEqual(pos[0].mark,pos[3].mark,pos[6].mark)) {
           io.sockets.emit('room'+roomId, winnerMessage);
       }
       else if(areEqual(pos[1].mark,pos[4].mark,pos[7].mark)) {
          io.sockets.emit('room'+roomId, winnerMessage);
       }
       else if(areEqual(pos[2].mark,pos[5].mark,pos[8].mark)) {
           io.sockets.emit('room'+roomId, winnerMessage);
       }

       // SIDEWAYS

       else if(areEqual(pos[0].mark,pos[4].mark,pos[8].mark)) {
         io.sockets.emit('room'+roomId, winnerMessage);
       }
       else if(areEqual(pos[6].mark,pos[4].mark,pos[2].mark)) {
         io.sockets.emit('room'+roomId, winnerMessage);
       }

       // NO WINNER 
       else {
         
       }

          
      return res.json({"success" : "success"});
     });
 
  }

};
