const {Schema,model} = require("mongoose");

const UserSchema = new Schema({

  name:{
    type:String,
    required:true
  },

  user:{
    type:String,
    required:true
  },
  urlFireBase:{
    type:String,
    required:true
  },

  likes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
  ],
  dislikes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  online:{
    type: Boolean,
    default: true
  },
  idSocket:{
    type: String
  }

},
{
    timestamps:true
  });

  module.exports = model('User',UserSchema);
