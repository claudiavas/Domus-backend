const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;

const userSchema = new Schema({

  identification: {
    type: String,
//    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },

  zip_code: {
    type: Number,
   // required: true,
    min: 0
  },
  telephone: {
    type: Number,
    min: 0,
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
  subscription: {
    type: Boolean,
    default: "false"
  },
  observations: {
    type: String,
    default: ''
  },
  id_realstate: {
    type: Number
  },
  tipo_usuario: {
    type: String,
    enum: ['AGENTE', 'INMOBILIARIA', 'CLIENTE'],
  },
  
  foto_perfil: {
    type: String,
    default: ''
  },
  deleteAt: {
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