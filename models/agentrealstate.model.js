const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id_realstate: {
    type: Number,
    required: true
  },
  id_agent: {
    type: Number,
    required: true
  }
});