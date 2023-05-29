const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  identification: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  province: {
    type: String,
    default: null
  },
  zip_code: {
    type: Number,
    required: true,
    min: 0
  },
  telephone: {
    type: Number,
    min: 0,
    default: null
  },
  email: {
    type: String,
    default: null,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  date_register: {
    type: Date,
    default: null
  },
  observations: {
    type: String,
    default: ''
  },
  id_realstate: {
    type: Number,
    required: true
  },
  tipo_usuario: {
    type: String,
    enum: ['AGENTE', 'INMOBILIARIA', 'CLIENTE'],
    required: true
  },
  deleteAt: {
    type: Date
  },
},

{
  timestamps:true }
);

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    name: this.name,
    email: this.email,
    algo:'HS256' 
  }
  // * This method is from the json-web-token library who is in charge to generate the JWT
  return jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  })
};

const User = mongoose.model('User', userSchema);

module.exports = User;