const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newLocal = false;
const realEstateSchema = new Schema({
  id_realstate: {
    type: Number,
    required: true,
    unique: true
  },
  Cif: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  country: {
    type: String,
    required: true,
    default: 'spain'
  },
  province: {
    type: String,
    default: null
  },
  municipity: {
    type: String,
    default: null
  },
  zip_code: {
    type: String,
    required: true
  },
  telephone: {
    type: Number,
    min: 0,
    default: null
  },
  email: {
    type: String,
    default: null,
    match: /^\S+@\S+\.\S+$/
  },
  web: {
    type: String,
    default: null
  },
  date_register: {
    type: Date,
    default: null
  },
  rent: {
    type: Boolean,
    default: false
  },
  buy_sell: {
    type: Boolean,
    default: false
  },
  holiday_rental : {
    type: Boolean,
    default: false
  },
  logo: {
    type: String,
    default: null
  },
  publication_date: {
    type: Date,
    required: true
  },
  modifiedAt: {
    type: Date,
    required: true
  },
  deleteAt: {
    type: Date,
    default: null
  }
});

const RealEstate = mongoose.model('RealEstate', realEstateSchema);

module.exports = RealEstate;
