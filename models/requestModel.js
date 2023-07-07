const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({

  realState: {
    _id: { type: Number },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String,
    enum: ["apartment", "penthouse", "duplex", "house", "chalet", "other"]
  },

  transaction: {
    type: String,
    required: true,
    enum: ["sale", "rent", "vacation_rentals"]
  },

  country: {
    type: String,
    required: true,
    default: 'Spain'
  },

  community: {
    type: Object,
    required: true
  },

  province: {
    type: Object
  },

  municipality: {
    type: Object
  },

  population: {
    type: Object
  },

  neighborhood: {
    type: Object
  },

  minM2: {
    type: Number
  },

  maxM2: {
    type: Number
  },

  currency: {
    type: String,
    enum: ['EUR', 'DOL']
  },

  minPrice: {
    type: Number
  },

  maxPrice: {
    type: Number
  },

  floorLevel: {
    type: String,
    enum: ["Top_floor", "Intermediate_floor", "Ground_floor"]
  },

  facing: {
    type: String,
    enum: ["North", "South", "East", "West"]
  },

  propertyAge: {
    type: String,
    enum: ["New", "Up_to_5 years", "6_to_10 years", "11_to_20 years", "More_than_20 years"],
  },

  rooms: {
    type: Number,
    required: true,
    integer: true,
    min: 1
  },

  baths: {
    type: Number,
    integer: true,
    min: 1
  },

  garages: {
    type: Number,
    max: 99
  },

  condition: {
    type: String,
    enum: ["new", "good_condition", "to_renovate"]
  },

  furnished: {
    type: String,
    enum: ["unfurnished", "semifurnished", "furnished"]
  },

  kitchenEquipment: {
    type: String,
    enum: ["standard_equipment", "semi_equipped", "fully_equipped"],
  },

  closets: {
    type: Boolean
  },

  airConditioned: {
    type: Boolean
  },

  heating: {
    type: Boolean
  },

  elevator: {
    type: Boolean
  },

  outsideView: {
    type: Boolean
  },

  garden: {
    type: Boolean
  },

  pool: {
    type: Boolean
  },

  terrace: {
    type: Boolean
  },

  storage: {
    type: Boolean
  },

  accessible: {
    type: Boolean
  },

  status: {
    type: String,
    default: "active",
    required: true,
    enum: ["active", "fullfilled", "inactive", "deleted"]
  },

  deletedAt: {
    type: Date,
  }

},

  {
    timestamps: true
  },

)

module.exports = mongoose.model("Request", requestSchema);