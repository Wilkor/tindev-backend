const Dev  = require("../models/dev");
const Product  = require("../models/product");


module.exports = {

   async store(req,res){

    let likedProduct =   await Product.findById(req.params.devId);
    
   // const loggedUser = req.connectedUser[req.headers.user];
    const targetSocket = req.connectedUser[likedProduct.user];
    
    let infoUser =   await Dev.findById(req.headers.user);
    //let likedProduct =   await Product.findById(req.params.devId);

    // if(!targetDev){
    //     return res.status(404).json({error:'Dev not exists'})
    // }

    //  if(targetDev.likes.includes(loggedDev._id)){

    //    const loggedSocket = req.connectedUser[req.headers.user];
    //    const targetSocket = req.connectedUser[req.params.devId];

    //    if(loggedSocket){
       
    //      console.log('usuário logado', loggedSocket)
    //      req.io.to(loggedSocket).emit('match',targetDev);

    //    }

       if(likedProduct.user){
      
         req.io.to(targetSocket).emit('match',infoUser);

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
  
      return res.json({ok:'ok'})
     }
    // loggedDev.likes.push(targetDev._id)

  //  await loggedDev.save();

  // return res.json({loggedDev})
  // }

  
}
