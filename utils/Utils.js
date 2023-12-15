const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/CustomerModel");
const hashPassword = async (hashingstring) => {
  if (hashingstring === null || hashingstring === "") return null;

  const hashPassword = await bcrypt.hash(hashingstring, 10);

  return hashPassword;
};
const verifyPassword = async (unhashedString, encryptedstring) => {
  const verify = await bcrypt.compare(unhashedString, encryptedstring);
  if (verify) return true;
  return false;
};

const Checkuser = (data) => {
  if (
    data.name === null ||
    data.name === "" ||
    data.email === null ||
    data.email === "" ||
    data.password === null ||
    data.password === "" ||
    data.phone === null ||
    data.phone === "" ||
    data.cardnumber === null ||
    data.cardnumber === "" ||
    data.password === null ||
    data.password === "" ||
    data.address === null ||
    data.address === "" ||
    data.stbid === null ||
    data.stbid === ""
  ) {
    return false;
  }
  return true;
};

const CheckIfcustomerPresent = async (data) => {
  try {
    const CustomerFound = await CustomerModel.findOne({
      email: data.email,
      phone: data.phone,
    });
    if (CustomerFound) return true;
    return false;
  } catch (e) {
    return e;
  }
};

const GenerateToken = (data) => {
  const { name, email, phone, cardnumber, stbid, address } = data;
  const customer = {
    id: data._id,
    name,
    email,
    phone,
    cardnumber,
    stbid,
    address,
  };

  const token = jwt.sign(customer, process.env.SECRET_KEY);

  return token;
};

module.exports = {
  hashPassword,
  Checkuser,
  CheckIfcustomerPresent,
  GenerateToken,
  verifyPassword,
};
