const Produto  = require("../models/product");

module.exports = {

   async store(req,res){
 
    const loggedDev =  await Produto.findOne({user:req.params.devId});

    console.log('loggedDev', loggedDev)

    const targetDev =  await Produto.findOne({user:req.params.devId});

    console.log('targetDev', targetDev)


    if(!targetDev){
        return res.status(404).json({error:'Dev not exists'})
    }

     if(targetDev.likes.includes(loggedDev._id)){

       const loggedSocket = req.connectedUser[req.headers.user];
       const targetSocket = req.connectedUser[req.params.devId];

       if(loggedSocket){

         req.io.to(loggedSocket).emit('match',targetDev);

       }

       if(targetSocket){
         req.io.to(targetSocket).emit('match',loggedDev);

       }
        console.log('DEU MATCH');

     }
     loggedDev.likes.push(targetDev._id)

    await loggedDev.save();

   return res.json({loggedDev})
   }
}
