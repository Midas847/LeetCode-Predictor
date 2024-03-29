const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const leetcode = require("./controllers/leetcode");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const port = 3000 || process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log(error));

app.use("/api/routes/leetcode", leetcode);

app.listen(port, () => console.log(`Listening on port 3000`));
