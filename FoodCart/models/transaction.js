const mongoose = require('mongoose');

module.exports = mongoose.model('Transaction', new mongoose.Schema({
  timeStamp:{ 
    type: Date, 
    default: Date.now
  },
  totalPrice:{
    type: Number,
    required: true
  }
}));
