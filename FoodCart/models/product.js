const mongoose = require('mongoose');

module.exports = mongoose.model('Product', new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    category: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true
    },
  }));
