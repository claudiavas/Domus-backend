const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  dateUpload: { 
    type: Date, default: Date.now, required: true 
    },

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