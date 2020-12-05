const moment = require('moment');
const { Schema, model, Types } = require('mongoose');
const reactionSchema = require("./Reaction")

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
const Thought = model("Thought",thoughtSchema)
module.exports = Thought