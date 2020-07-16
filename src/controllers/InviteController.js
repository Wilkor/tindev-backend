
module.exports = {

   async store(req,res){
    const {idUser, room, name} =  req.body
    const targetSocket = req.connectedUser[idUser];

    console.log('targetSocket', targetSocket)
    req.io.to(targetSocket).emit('invitation',  {room: room, message:`${name}, esta te convidando para um chat. clique aqui e fale com ele agora!`});
    return res.json({ok:'ok'})
   }
}