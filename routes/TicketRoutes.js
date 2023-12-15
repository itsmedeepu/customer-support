const express = require("express");
const router = express.Router();

const { AuthToken, AdminAuth } = require("../middleware/Auth");

//contoller

const {
  Ticket,
  getAllTickets,
  findTicketById,
} = require("../controllers/TicketController");

router.post("/ticket", AuthToken, Ticket);

router.post("/gettickets", AdminAuth, getAllTickets);

router.get("/findticket", AdminAuth, findTicketById);

//configure the middle ware based on token

module.exports = router;
