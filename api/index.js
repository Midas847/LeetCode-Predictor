const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const leetcode = require("./routes/leetcode2");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log(error));

app.use("/api/routes/leetcode", leetcode);

app.listen(3500, () => console.log("Listening on port 3500..."));
