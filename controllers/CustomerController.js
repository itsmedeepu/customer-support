const CustomerModel = require("../models/CustomerModel");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  Checkuser,
  CheckIfcustomerPresent,
  GenerateToken,
  verifyPassword,
} = require("../utils/Utils");

const {
  sucessWithdata,
  successwithoutdata,
  errorresponse,
} = require("../helpers/responseStructure");

const Register = async (req, res) => {
  const Customer = req.body;

  // Check if all required fields are present
  const isUserDataValid = Checkuser(Customer);
  //check if user already exist

  if (isUserDataValid) {
    const Customerdata = await CheckIfcustomerPresent(Customer);
    if (Customerdata)
      return res
        .status(200)
        .json(errorresponse(401, "customer already registred"));

    try {
      Customer.password = await hashPassword(Customer.password);
      const newCustomer = new CustomerModel(Customer);
      const user = await newCustomer.save();

      res
        .status(201)
        .json(sucessWithdata(200, "user regsitred sucessfully", user));
    } catch (e) {
      res.status(500).json(errorresponse(500, "something went bad at server"));
    }
  } else {
    res.status(200).json(errorresponse(401, "provide all details"));
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
        return res
          .status(200)
          .json(sucessWithdata(200, "login success", { token }));
      }

      return res.status(200).json(errorresponse(401, "invalid login details"));
    }
    return res.status(200).json(errorresponse(401, "invalid login details"));
  } catch {
    return res
      .status(500)
      .json(errorresponse(500, "something went bad at server"));
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find({}, { password: 0 });

    res
      .status(200)
      .json(sucessWithdata(200, "data fecthed sucessfully", customers));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorresponse(500, "something went bad at server"));
  }
};

const findById = async (req, res) => {
  try {
    const Customer = await CustomerModel.findOne(
      { _id: req.params.id },
      { password: 0 }
    );

    if (Customer) {
      return res
        .status(200)
        .json(sucessWithdata(200, "fetched sucessfully", Customer));
    }

    return res.status(200).json(successwithoutdata(200, "no users found"));
  } catch (e) {
    res.status(500).json(errorresponse(500, "something went bad at server"));
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
        res.status(200).json(sucessWithdata(200, "login success", data));
      })
      .catch((e) => {
        res
          .status(500)
          .json(errorresponse(500, "something went bad at server"));
      });
  } catch {
    res.status(500).json(errorresponse(401, "customer not found"));
  }
};

const deletecustomer = async (req, res) => {
  try {
    const Customer = await CustomerModel.findOneAndDelete(
      { _id: req.params.id },
      { password: 0 }
    );

    if (Customer) {
      return res
        .status(200)
        .json(sucessWithdata(200, "customer deleted", Customer));
    }

    return res
      .status(200)
      .json(errorresponse(401, "user not found with this id"));
  } catch (e) {
    res.status(500).json(errorresponse(500, "something went bad at server"));
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
