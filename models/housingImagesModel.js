const mongoose = require('mongoose');

const housingImagesSchema = new mongoose.Schema({

  housing: { 
    type: mongoose.Schema.Types.ObjectID,
    ref: "housing",
    required: true
    },

  image: { 
    type: String, 
    required: true 
    },
    
  title: { 
    type: String, 
    maxlength: 50 
    }
});



module.exports = mongoose.model('HousingImages', housingImagesSchema);