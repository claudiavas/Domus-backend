const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const realEstateSchema = new Schema({
  
  NIF: {
    type: String,
    required: true,
    length: 9
  },
  
  businessName: {
    type: String,
    required: true
  },

  profileSummary: {
    type: String,
  },

  mainOfficeAddress: {
    type: String,
    },
    
  mainOfficeCountry: {
    type: String,
    default: "Spain",
    },

  mainOfficeProvince: { // Api Externa
    type: Object,
    required: true,
    },  
    
  telephone1: {
    type: Number,
    min: 0,
    default: null
  },

  telephone2: {
    type: Number,
    min: 0,
    default: null
  },
  
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/
  },

  web: {
    type: String,
  },

  rent: {
    type: Boolean,
  },

  buy_sell: {
    type: Boolean,
  },

  holiday_rental : {
    type: Boolean,
  },

  logo: {
    type: String,
  },

  status: {
    type: String,
    default: "Active",
    required: true,
    enum: ["Active", "Inactive", "Banned", "Deleted"]
  },

  bannedReason: {
    type: String,
  },

  deletedAt: {
    type: Date,
    default: null
  }
});

const RealEstate = mongoose.model('RealEstate', realEstateSchema);

module.exports = RealEstate;
