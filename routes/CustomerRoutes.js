const express = require("express");
const router = express.Router();

const { AuthToken, AdminAuth } = require("../middleware/Auth");

//contoller

const {
  Register,
  Login,
  getAllCustomers,
  findById,
  updateCustomer,
  deletecustomer,
} = require("../controllers/CustomerController");

router.post("/register", Register);

router.post("/login", Login);

router.get("/getallcust", AdminAuth, getAllCustomers);
router.get("/findbyid/:id", AdminAuth, findById);
router.post("/update", AuthToken, updateCustomer);
router.delete("/delete/:id", AdminAuth, deletecustomer);

//configure the middle ware based on token

module.exports = router;
