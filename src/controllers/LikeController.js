const Dev  = require("../models/dev");



module.exports = {

   async store(req,res){
 
    let loggedDev =  await Dev.findById(req.headers.user);
    let targetDev = await Dev.findById(req.params.devId);

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
       
      //  const filter = { user: req.headers.user };
      //  const filter2 = { user: req.params.devId};
      //  const update = { hasLike: true };
       
      //   await Product.findOneAndUpdate(filter, update, {
      //    new: true
      //  });
      //  await Product.findOneAndUpdate(filter2, update, {
      //   new: true
      // });
  

     }
     loggedDev.likes.push(targetDev._id)

    await loggedDev.save();

   return res.json({loggedDev})
   }
}
