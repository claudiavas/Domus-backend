const mongoose = require('mongoose');
const Schema = mongoose.Schema

const roadTypesSchema = new Schema({
    roadType: { 
      type: String,
      required: true
      },
    },
  );
  
  module.exports = mongoose.model("roadTypes", roadTypesSchema);