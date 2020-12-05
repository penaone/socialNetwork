const { Schema, model, Types } = require('mongoose');


const userSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    username: {
      type: String,
      required:true,
      unique:true,
      trim:true
          },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/,"not a valid email"]
          
    },
    thoughts:[
      {
        type:Types.ObjectId,
        ref: "Thoughts"
      }
    ],
   friends:[
     {
       type:Types.ObjectId,
       ref: "User"
     }
   ],
  })

  userSchema.virtual("friendCount").get(function(){
    return this.friends.length
  })
const User = model("User",userSchema)
module.exports = User


  