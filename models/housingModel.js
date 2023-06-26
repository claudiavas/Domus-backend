const mongoose = require('mongoose');
const Schema = mongoose.Schema

const housingSchema = new Schema({
    
    shhowRealEstateLogo: { 
     type: Boolean,
      },

    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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

    province: { // external API
      type: Object,
      required: true,
      },
    
    municipality: { // external API
      type: Object,
      required: true,
      },

    population: { // external API
      type: Object,
      required: true,
      },
        
    neighborhood: { // external API
      type: Object,
      required: true,
      },

    zipCode: { // external API
      type: Object,
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

    roadName: { // external API
      type: Object,
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
      enum: ["active", "selled", "rented", "inactive", "deleted"]
    },
   
    deletedAt: {
      type: Date,
      default: null,
    }
 
  },
   
  {
  timestamps:true}
  );
  
  module.exports = mongoose.model("Housing", housingSchema);