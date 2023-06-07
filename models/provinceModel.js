const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = new Schema({

    country: {
      type: String,
      required: true,
      default: "Spain",
      },
  
    province: {
      type: String,
      required: true
    },
    
  });
  
  const Province = mongoose.model('Province', provinceSchema);
  
  module.exports = Province;