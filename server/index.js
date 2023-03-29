require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./src/config/db.config");
const UserRouter = require("./src/route/user.routes");
const app = express();
const db_url = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDb(db_url);
app.use("/", UserRouter);

app.listen(PORT, () => {
  console.log("Connected to localhost", PORT);
});
