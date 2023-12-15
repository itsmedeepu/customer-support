const mongoose = require("mongoose");
const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  stbid: {
    type: String,
    required: true,
  },
  cardnumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
