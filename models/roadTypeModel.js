const mongoose = require('mongoose');
const Schema = mongoose.Schema

const roadTypeSchema = new Schema({
    
    roadType: { 
      type: String,
      required: true
      },
    },
  );
  
  module.exports = mongoose.model("RoadType", roadTypeSchema);