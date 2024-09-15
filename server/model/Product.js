const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, 
  description: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
