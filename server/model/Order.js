const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'successful'], // Only 'pending' or 'successful' statuses
    default: 'pending', // Default to 'pending'
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now, // Set default value to the current date and time
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
