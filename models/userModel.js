const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;

const userSchema = new Schema({

  documentType: {
    type: String,
    enum: ['DNI', 'NIE'],
  },

  documentNumber: {
    type: String,
  },

  agentRegistrationNumber: {
    type: String,
  },

  agentRegistrationCommunity: { // API EXTERNA
    type: String,
    },

  name: {
    type: String,
    required: true
  },

  surname: {
    type: String,
    required: true
  },
  
  mainOfficeCountry: {
    type: String,
    required: true,
    default: "Spain",
    },

  mainOfficeProvince: {
    type: Object,
    },

  telephone1: {
    type: Number,
  },

  telephone2: {
    type: Number,
  },

  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
    trim: true
  },
  
  password: {
    type: String,
    required: true
  },

  pwdRecoveryToken: {
    type: String,
  },

  subscription: {
    type: Boolean,
    default: "false"
  },

  profileSummary: {
    type: String,
  },

  realEstateLogo: {
    type: String,
    },
  
  userType: {
    type: String,
    enum: ['Agent', 'RealState', 'Client'],
  },

  images: [{
    type: String,
    }],
  
  profilePicture: {
    type: String,
  },

  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive", "Banned", "Deleted"]
  },

  bannedReason: {
    type: String,
  },

  deletedAt: {
    type: Date,
  },
},

{
  timestamps:true }
);

// Esta función se ejecuta "antes" de guardar cualquier usuario en Mongo (Trigger)

userSchema.pre('save', function (next) {
  const user = this;

  //Si no se ha cambiado la contraseña, seguimos
  if (!user.isModified('password')) return next();

  // bcrypt es una libreria que genera "hashes", encriptamos la contraseña
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      //si no ha habido error en el encryptado, guardamos
      user.password = hash;
      next();
    });
  });

});

// Metodo que compara la password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};



// Method to generate the JWT (You choose the name)
userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    _id: this._id,
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