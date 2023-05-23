const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
 
  realstate: {
    _id: { type: Number },
    },
  
  agent: {
    _id: { type: Number, required: true },
    },
  
  type: { 
    type: String, 
    enum: ['Piso', 'Ático', 'Duplex', 'Casa', 'Chalet', 'Otros'] 
    },
  
  transaction: { 
    type: String, 
    required: true, 
    enum: ['Compra', 'Alquiler', 'Alquiler Vacacional'] 
    },
  
  country: { 
    type: String, 
    required: true, 
    default: 'Spain' 
    },
  
  community: { 
    type: String, 
    required: true 
    },
  
  province: { 
    type: String },

  municipality: { 
    type: String 
    },
  
  population: { 
    type: String 
    },
  
  neighborhood: { 
    type: String 
    },
  
  minM2: { 
    type: Number 
    },
  
  maxM2: { 
    type: Number 
    },
  
  currency: { 
    type: String, 
    enum: ['EUR', 'DOL', 'BITCOINS'] 
    },
  
  minPrice: { 
    type: Number 
    },
  
  maxPrice: { 
    type: Number 
    },

  floorLevel: { 
    type: String, 
    enum: ['Última Planta', 'Plantas Intermedias', 'Bajo'] 
    },
  
  facing: { 
    type: String, 
    enum: ['Norte', 'Sur', 'Este', 'Oeste'] 
    },
  
  propertyAge: {
    type: String,
    enum: ['Estreno', 'Hasta 5 años', '6 a 10 años', '11-20 años', 'Más de 20 años'],
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
    enum: ['Obra Nueva', 'Buen Estado', 'A reformar'] 
    },
  
  furnished: { 
    type: String, 
    enum: ['Sin amoblar', 'Semi amoblado', 'Amoblado'] 
    },
  
  kitchenEquipment: {
    type: String,
    enum: ['Básico', 'Semi equipado', 'Completo'],
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
  
  deletedAt: { 
    type: Date 
    }
},

    {
    timestamps:true
    },

    )
    
    module.exports = mongoose.model("requests", requestsSchema);