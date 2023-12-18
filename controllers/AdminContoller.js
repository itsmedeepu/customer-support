const AdminModel = require("../models/AdminModel");

const jwt = require("jsonwebtoken");

const { verifyPassword, hashPassword, Decode } = require("../utils/Utils");

const {
  sucessWithdata,
  successwithoutdata,
  errorresponse,
} = require("../helpers/responseStructure");

const RegisterAdmin = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const Admin = new AdminModel(req.body);
    await Admin.save()
      .then((data) => {
        res.status(200).json(sucessWithdata(200, "registration scucessfull"));
      })
      .catch((e) => {
        res.status(200).json(errorresponse(401, "provide all details"));
      });
  } catch {
    return res
      .status(500)
      .json(errorresponse(500, "something went bad at server"));
  }
};

const FetchData = async (req, res) => {
  return res.status(200).json(req.data);
};

const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      return res.status(200).json(errorresponse(401, "invalid login details"));
    }

    const isPasswordValid = await verifyPassword(password, admin.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
        },
        process.env.ADMIN_SECRET_KEY
      );
      return res
        .status(200)
        .json(sucessWithdata(200, "login sucessfully", { token }));
    }

    return res.status(200).json(errorresponse(401, "invalid credentials"));
  } catch (error) {
    return res
      .status(500)
      .json(errorresponse(500, "something went bad at server"));
  }
};

module.exports = { RegisterAdmin, AdminLogin, FetchData };
