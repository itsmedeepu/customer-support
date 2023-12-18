const {
  sucessWithdata,
  errorresponse,
} = require("../helpers/responseStructure");
const TicketModel = require("../models/TicketModel");
const jwt = require("jsonwebtoken");
const Ticket = async (req, res) => {
  const ticket = req.body;

  try {
    const newticket = new TicketModel(ticket);
    await newticket
      .save()
      .then((data) => {
        res.status(200).json(sucessWithdata(200, "ticket raised sucessfully"));
      })
      .catch((e) => {
        res
          .status(500)
          .json(errorresponse(500, "something went bad at server"));
      });
  } catch {
    res.staus(500).json(errorresponse(500, "something went bad at server"));
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find({});

    res
      .status(200)
      .json(sucessWithdata(200, "tickets fetched sucessfully", tickets));
  } catch (error) {
    res.status(500).json(errorresponse(500, "something went bad server"));
  }
};

const findTicketById = async (req, res) => {
  try {
    const Ticket = await TicketModel.findOne({ _id: req.params.id });

    if (Ticket) {
      return res
        .status(200)
        .json(sucessWithdata(200, "tickets fetched sucessfully", Ticket));
    }

    return res.status(200).json(errorresponse(500, "ticket not found"));
  } catch (e) {
    res
      .status(500)
      .json(errorresponse(500, "something went bad at server side"));
  }
};

const UpdateTicket = async (req, res) => {
  const data = req.body;

  try {
    const update = await TicketModel.findByIdAndUpdate(
      { _id: req.params.id },
      data,
      {
        new: true,
        password: 0,
      }
    );
    if (update) {
      return res
        .status(200)
        .json(sucessWithdata(200, "ticket updated sucessfully", update));
    } else {
      return res.status(500).json(errorresponse(500, "something went bad "));
    }
  } catch (e) {
    return res
      .status(500)
      .json(errorresponse(500, "something went bad at server side"));
  }
};

module.exports = { findTicketById, getAllTickets, Ticket, UpdateTicket };
