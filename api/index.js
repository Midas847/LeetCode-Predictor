const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const leetcode=require('./routes/leetcode');
app.use('/api/routes/leetcode',leetcode);


app.listen(3500, () => console.log('Listening on port 3500...'));