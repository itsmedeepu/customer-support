const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then((e) => {
    console.log("database connected ");
  })
  .catch((e) => {
    console.log(`${e} CONNECTION FAILED`);
  });
