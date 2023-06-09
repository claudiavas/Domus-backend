const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = new Schema({

    code: {
      type: String,
      required: true,
    },


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
  
module.exports = mongoose.model("Province", provinceSchema);