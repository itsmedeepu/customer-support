const CustomerModel = require("../models/CustomerModel");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  Checkuser,
  CheckIfcustomerPresent,
  GenerateToken,
  verifyPassword,
} = require("../utils/Utils");

const Register = async (req, res) => {
  const Customer = req.body;

  // Check if all required fields are present
  const isUserDataValid = Checkuser(Customer);
  //check if user already exist

  if (isUserDataValid) {
    const Customerdata = await CheckIfcustomerPresent(Customer);
    if (Customerdata)
      return res.status(200).json("customer already present with this details");

    try {
      Customer.password = await hashPassword(Customer.password);
      const newCustomer = new CustomerModel(Customer);
      const user = await newCustomer.save();

      res.status(201).json({ user });
    } catch (e) {
      res.status(500).json("Something went bad at the server");
    }
  } else {
    res.status(500).json("Some fields are missing");
  }
};

const Login = async (req, res) => {
  try {
    const Customer = await CustomerModel.findOne({ email: req.body.email });

    if (Customer) {
      const checkPassword = await verifyPassword(
        req.body.password,
        Customer.password
      );
      if (checkPassword) {
        const token = GenerateToken(Customer);
        return res.status(200).json({ token: token });
      }

      return res.status(200).json({ error: "invalid login details" });
    }
    return res.status(200).json({ error: "invalid login details" });
  } catch {
    return res.status(500).json({ error: "something went bad at server" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find({}, { password: 0 });

    res.status(200).json({ customers });
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong on the server");
  }
};

const findById = async (req, res) => {
  try {
    const Customer = await CustomerModel.findOne(
      { _id: req.params.id },
      { password: 0 }
    );

    if (Customer) {
      return res.status(200).json({ Customer });
    }

    return res.status(200).json("user not found with this id");
  } catch (e) {
    res.status(500).json("Something went wrong on the server");
  }
};

const updateCustomer = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    await CustomerModel.findByIdAndUpdate({ _id: req.body.id }, req.body, {
      new: true,
      password: 0,
    })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((e) => {
        res.status(500).json("user not found");
      });
  } catch {
    res.status(500).json("user not found");
  }
};

const deletecustomer = async (req, res) => {
  try {
    const Customer = await CustomerModel.findOneAndDelete(
      { _id: req.params.id },
      { password: 0 }
    );

    if (Customer) {
      return res.status(200).json({ Customer });
    }

    return res.status(200).json("user not found with this id");
  } catch (e) {
    res.status(500).json("Something went wrong on the server");
  }
};

module.exports = {
  Register,
  Login,
  getAllCustomers,
  findById,
  updateCustomer,
  deletecustomer,
};
