const express = require("express");
const router = express.Router();

const { AdminAuth } = require("../middleware/Auth");

//contoller

const { AdminLogin, RegisterAdmin } = require("../controllers/AdminContoller");

router.post("/register", RegisterAdmin);

router.post("/login", AdminLogin);

// router.get("/getallcust", Auth, getAllCustomers);
// router.get("/findbyid/:id", Auth, findById);
// router.post("/update", Auth, updateCustomer);
// router.delete("/delete/:id", Auth, deletecustomer);

//configure the middle ware based on token

module.exports = router;
