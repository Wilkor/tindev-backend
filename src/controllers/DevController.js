const axios = require("axios");
const Dev  = require("../models/dev");
module.exports = {

    async index(req,res){

      const {user:LoggedUser} = req.headers
        const loggedDev = await Dev.findById(LoggedUser);

        const user = await Dev.find({
            $and:[
                {_id:{$ne:LoggedUser}},
                {_id:{$nin:loggedDev.likes}},
                {_id:{$nin:loggedDev.dislikes}}
        ],
        })

        return res.json(user)

    },

  async store(req,res){

     const {user} = req.body
     
     const {displayName, uid, photoURL}  = user;
     

     const userExists = await Dev.findOne({user:uid})
     if(userExists){
       
         return res.json(userExists)
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