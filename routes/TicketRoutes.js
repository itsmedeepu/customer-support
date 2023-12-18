const express = require("express");
const router = express.Router();

const { AuthToken, AdminAuth } = require("../middleware/Auth");

//contoller

const {
  Ticket,
  getAllTickets,
  findTicketById,
  UpdateTicket,
} = require("../controllers/TicketController");

router.post("/ticket", AuthToken, Ticket);

router.get("/gettickets", AdminAuth, getAllTickets);

router.get("/findticket", AdminAuth, findTicketById);

router.put("/updateticket/:id", AdminAuth, UpdateTicket);

//configure the middle ware based on token

module.exports = router;
