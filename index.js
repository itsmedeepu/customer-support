require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const cors = require("cors");

//database connection
app.use(
  cors({
    origin: "*",
  })
);
require("./database/conn.js");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

const customer_route = require("./routes/CustomerRoutes");
const ticket_route = require("./routes/TicketRoutes");
const admin_route = require("./routes/AdminRoutes");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/customer/api/v1", customer_route);

app.use("/ticket/api/v1", ticket_route);

app.use("/admin/api/v1", admin_route);

app.listen(port, () => {
  console.log(`app running at port http://localhost:${port}`);
});
