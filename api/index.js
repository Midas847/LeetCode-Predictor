const express = require("express");
const app = express();
const cors = require("cors");
const leetcode = require("./routes/leetcode");
app.use(cors());
app.use(express.json());

app.use("/api/routes/leetcode", leetcode);

app.listen(3500, () => console.log("Listening on port 3500..."));
