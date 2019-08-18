const Dev  = require("../models/dev");

module.exports = {

   async store(req,res){
 
      


    const loggedDev =  await Dev.findById(req.headers.user);
    const targetDev = await Dev.findById(req.params.devId);
      
      console.log("loggedDev",loggedDev)
      console.log("targetDev",targetDev)

    if(!targetDev){
        return res.status(404).json({error:'Dev not exists'})
    }

     if(targetDev.likes.includes(loggedDev._id)){

       const loggedSocket = req.connectedUser[req.headers.user];
       const targetSocket = req.connectedUser[req.params.devId]
       
             console.log("loggedSocket",loggedSocket)
             console.log("targetSocket",targetSocket)
      

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
