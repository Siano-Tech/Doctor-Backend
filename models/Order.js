const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true
  },
  orderItems: [
    {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
  ],
  category: {
    type: String,
  },
  total: {
    type: Number
  },
  taxes: {
    type: Number
  },
  customerName: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('order', OrderSchema);
