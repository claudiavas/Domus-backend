const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  dateupload: { 
    type: Date, default: Date.now, required: true 
    },

  _id: { 
    type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  housing_id: { 
    type: Number, required: true 
    },

  image: { 
    type: String, required: true 
    },
    
  title: { 
    type: String, maxlength: 50 
    }
});



module.exports = mongoose.model('image', imageSchema);