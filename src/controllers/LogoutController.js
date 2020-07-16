const Dev  = require("../models/dev");
const {removeUser, getUsersInRoom } = require('../user');
module.exports = {

   async store(req,res){
    const {user} = req.body;
    const loggedDev =  await Dev.findOne({user:user});

         loggedDev.online = false;
        await loggedDev.save();

       const users  = removeUser(req.connectedUser[user]);
   
        if(users) {
         req.io.to(users.room).emit('message', { user: users.name, text: `${user.name} está offline .` });
         req.io.to(users.room).emit('roomData', { room: users.room, users: getUsersInRoom(users.room)});
        }
   
  
      return res.json({loggedDev})
   }
}