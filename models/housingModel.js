const mongoose = require('mongoose');
const Schema = mongoose.Schema

const housingSchema = new Schema({
    
    realEstate: { 
      type: mongoose.Schema.Types.ObjectID,
      ref: "realEstate"
      },

    realEstate: { 
      type: mongoose.Schema.Types.ObjectID,
      ref: "realEstate"
      },

    type: { 
      type: String,
      required: true,
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
      default: "Spain",
      },

    community: { //Api Externa
      type: String,
      required: true,
      },

    province: { // external API
      type: String,
      required: true,
      },  
    
    municipality: { // external API
      type: String,
      required: true,
      },

    population: { // external API
      type: String,
      required: true,
      },

    neighborhood: { // external API
      type: String,
      required: true,
      },

    zipCode: { // external API
      type: Number,
      },

    squareMeters: {
      type: Number,
      required: true,
      },

    currency: {
      type: String,
      required: true,
      enum: ["EUR", "DOL"]
      },

    price: {
      type: Number,
      required: true,
      },

    roadType: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "roadTypes",
      },

    roadName: {
      type: String,
      },
    
    houseNumber: {
      type: Number,
      },

    floorLevel: {
      type: String,
      enum: ["top_floor", "intermediate_floor", "ground_floor"], 
      },
    
    floorNumber: {
      type: Number,
      },

    door: {
      type: String,
      },

    stair: {
      type: String,
      },      
    
    facing: {
      type: String,
      enum: ["north", "south", "east", "west"]
      },

    propertyAge: {
      type: String,
      enum: ["new", "up_to_5 years", "6_to_10 years", "11_to_20 years", "more_than_20 years"]
      },

    description: {
      type: String,
      },

    rooms: {
      type: Number,
      required: true,
      },

    baths: {
      type: Number
    },

    garages: {
      type: Number
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
      enum: ["standard_equipment", "semi_equipped", "fully_equipped"]
    },

    closets: {
      type: Boolean,
    },

    airCondicioned: {
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

    accesible: {
      type: Boolean
    },

    status: {
      type: String,
      default: "active",
      required: true,
      enum: ["active", "selled", "rented", "inactive", "deleted"]
    },
 
    deletedAt: {
      type: Date,
    }
 
  },
   
  {
  timestamps:true}
  );
  
  module.exports = mongoose.model("Housing", housingSchema);