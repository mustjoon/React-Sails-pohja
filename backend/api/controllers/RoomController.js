module.exports = {



  create: function(req,res,next){
    var socket = req.socket;
    var io = sails.io;

    // Get the ID of the room to join
    var name = req.body.name;
    var userId = req.token.id;
  
    return Room.create({name: name}).exec(function(err,room){
      io.sockets.emit('room',{action: 'create',data: {room}});
   //   return res.json(room);
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
        start = true;
      }
      else {
        mark = 'O';
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
     console.log(req.params);
     var roomId = req.params.roomId;
     var pos = req.body.item.pos;
     console.log(roomId);


     
     Room.findOne({id: roomId}).exec(function(err,room){
       console.log(room);

       if(!room.positions){
         room.positions = [];
         room.save();
         return res.json('FIRST MOVE');

       }
       else {

        room.positions.find((pos) => {

          //Tiilessä on jo X tai O
          if(pos.pos.x === pos.x && pos.pos.y === pos.y){
             io.sockets.emit('room'+roomId,{action: 'moveError',message: {id: userId, error: 'Someone tried to cheat :)'}});
             return res.pos(401,{err: 'Theres already a mark in the tile'});
          }


        })


        room.positions.push(
         {
           mark: "X", pos:pos
         }
       )
       room.save();
       }
    
    
     });
     

   //  return res.json('MAKE MOVE');
  }

};
