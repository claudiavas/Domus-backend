const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realEstateOfficesSchema = new Schema({

    realEstate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RealEstate',
      required: true
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
  
  const RealEstateOffices = mongoose.model('RealEstateOffices', realEstateOfficesSchema);
  
  module.exports = RealEstateOffices;