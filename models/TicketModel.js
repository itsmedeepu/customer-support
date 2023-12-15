const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  customerid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "open",
  },
});

const TicketModel = mongoose.model("Ticket", TicketSchema);
module.exports = TicketModel; // Corrected the export statement
