const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

  id_rating_author: { 
    type: Number, required: true 
    },

  valued_agent: { 
    type: Number, required: true 
    },

  name_author: { 
    type: String, required: true 
    },

  name_agent: { 
    type: String, required: true 
    },

  rating: { 
    type: Number, required: true, min: 0, max: 5 
    },

  title: { 
    type: String, required: true, maxlength: 50 
    },

  description: { 
    type: String, maxlength: 350 
    },
    
  date: { 
    type: Date, default: Date.now, required: true 
    },

  deleteAt: {
    type: Date,
  },


});



module.exports = mongoose.model('rating', ratingSchema);