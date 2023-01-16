const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceId: {
    type: Number,
    required: true,
    unique: true
  },
  serviceCategory: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceDescription: {
    type: String
  },
  price: {
    type: Number
  },
  ratings: {
    type: Number
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('service', ServiceSchema);
