const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  productName: String,
  amount: Number,
  address: String,
  userName: String,
  status: String,
}, { timestamps: true })

const OrdersModel = mongoose.model('Orders', schema);

module.exports = OrdersModel;