const TicketModel = require("../models/TicketModel");
const jwt = require("jsonwebtoken");
// const {
//   hashPassword,
//   Checkuser,
//   CheckIfcustomerPresent,
//   GenerateToken,
//   verifyPassword,
// } = require("../utils/Utils");

const Ticket = async (req, res) => {
  const ticket = req.body;

  try {
    const newticket = new TicketModel(ticket);
    await newticket
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((e) => {
        res.status(500).json({ error: "something went bad at server" });
      });
  } catch {
    res.staus(500).json({ error: "something went bad at server" });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find({});

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong on the server" });
  }
};

const findTicketById = async (req, res) => {
  try {
    const Ticket = await TicketModel.findOne({ _id: req.params.id });

    if (Ticket) {
      return res.status(200).json({ Ticket });
    }

    return res.status(200).json({ error: "ticket not found with this id" });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong on the server" });
  }
};

module.exports = { findTicketById, getAllTickets, Ticket };
