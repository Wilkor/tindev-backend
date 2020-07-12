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


    console.log(req.body)
     const {username} = req.body

     const userExists = await Dev.findOne({user:username})
     if(userExists){
         return res.json(userExists)
     }
     const response = await axios.get(`https://api.github.com/users/${username}`);

    console.log(response.data)
     const {name,bio,avatar_url:avatar} = response.data;
     const  dev = await Dev.create({
         name:name ||"Sem Nome",
         user:username,
         bio,
         avatar:avatar
     }).catch(err=>{

        console.log(err)
     })
     return res.json(dev)

  }


}