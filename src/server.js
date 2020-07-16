require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');

const app = express();
const server = require('http').Server(app)
const io = require("socket.io")(server)

const connectedUser = {}
const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');


io.on('connection',socket => {


    const {user} = socket.handshake.query;
     connectedUser[user] = socket.id


     console.log('user socket', connectedUser)
     socket.on('join', ({ name, room }, callback) => {


      const { error, user } = addUser({ id: socket.id, name, room });

       console.log('user',user)
  
      if(error) return callback(error);
      
     // socket.emit('message', {room: room, message:`${name}, esta te convidando para um chat`} );
      socket.join(user.room);
      socket.emit('message', { user: user.name, text: `${user.name}, entrou no chat.`});
      socket.broadcast.to(user.room).emit('message', { user: user.name , text: `${user.name} esta conectada!` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      callback();


    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {

      const user = removeUser(socket.id);

      console.log('estou saindo', socket.handshake.query.user)
  
      if(user) {
        io.to(user.room).emit('message', { user: user.name, text: `${user.name} saiu do chat.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })

})


app.use((req,res,next)=>{

    req.io = io;
    req.connectedUser = connectedUser;

    return next();

})
app.use(cors())
mongoose.connect('mongodb+srv://wilkor:wilkor@cluster0-kizd7.mongodb.net/omnistak8?retryWrites=true&w=majority',{useNewUrlParser:true})
app.use(express.json())
app.use(routes);


server.listen(process.env.PORT || 3333);
