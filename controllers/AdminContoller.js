const AdminModel = require("../models/AdminModel");

const jwt = require("jsonwebtoken");

const { verifyPassword, hashPassword } = require("../utils/Utils");

const RegisterAdmin = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const Admin = new AdminModel(req.body);
    await Admin.save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((e) => {
        res.status(200).json({ error: "provide all details" });
      });
  } catch {
    return res.status(500).json({ error: "something went bad at server" });
  }
};

const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      return res
        .status(200)
        .json({ error: "Invalid login details", status: 401 });
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
      return res.status(200).json({ token, status: 200 });
    }

    return res
      .status(200)
      .json({ error: "Invalid login details", status: 401 });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong on the server", status: 401 });
  }
};

module.exports = { RegisterAdmin, AdminLogin };
