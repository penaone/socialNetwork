const moment = require('moment');
const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username:{
    type: String,
    required: true
  },
  createdAt:{
   createdAt: {
    type: Date,
    default: Date.now,
    get:(time)=>moment(time).format("MM DD, YY [at] hh:mm a") 
  },
}

  })

const thoughtSchema = new Schema({
  thoughtText:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
   },
   createdAt: {
    type: Date,
    default: Date.now,
    get:(time)=>moment(time).format("MM DD, YY [at] hh:mm a")
   },
   username:{
     type: String,
     required: true
   },
   reactions:[reactionSchema]
   
   

})
const Thought = model("Thoughts",thoughtSchema)
module.exports = Thought