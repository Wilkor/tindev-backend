const axios = require("axios");
const Dev  = require("../models/dev");
module.exports = {

    async index(req,res){

        const loggedUser = await Dev.find();

        const filterOnline = loggedUser.filter(user => user.online == true)

        return res.json(filterOnline)

    },

  async store(req,res){

     const {user} = req.body
     
     const {displayName, uid, photoURL}  = user;
     

     const userExists = await Dev.findOne({user:uid})

     if(userExists){

      userExists.online = true;

     // console.log('user socket', req.connectedUser)
     // userExists.idSocket = req.connectedUser

      userExists.save();
      
      return res.json(userExists);

     }

     const  dev = await Dev.create({
         name:displayName,
         user:uid,
         urlFireBase:photoURL
     }).catch(err=>{

        console.log(err)
     })
     return res.json(dev)

  }


}