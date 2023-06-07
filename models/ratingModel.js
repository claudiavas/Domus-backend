const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

  evaluatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  evaluatingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  rating: { 
    type: Number,
    required: true, 
    min: 0, 
    max: 5 
    },

  commentBrief: { 
    type: String, 
    required: true, 
    maxlength: 50
    },

  comment: { 
    type: String, 
    maxlength: 350 
    },

  deletedAt: {
    type: Date,
  },

});

module.exports = mongoose.model('Rating', ratingSchema);