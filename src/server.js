require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');

const app = express();
const server = require('http').Server(app)
const io = require("socket.io")(server)

const connectedUser = {}

io.on('connection',socket =>{
    const {user} = socket.handshake.query;
    console.log(user,socket.id)
     connectedUser[user] = socket.id
    
    console.log("socket_id",socket.id)
    
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


server.listen(process.env.PORT || 3000);
