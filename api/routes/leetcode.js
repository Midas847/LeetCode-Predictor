const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-291/";
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(URL);
    const num_of_users = response.data.user_num; //Total Number of users taking part in the contest
    const total_pages = Math.ceil(num_of_users / 25); //Total number of pages
    console.log(total_pages);
    let result = [];
    // for (let i = 1; i <= total_pages; i++) {
    //   const response_each = await axios.get(URL + "?pagination=" + i);
    //   result.push(response_each.data);
    // }
    const response_each = await axios.get(URL + "?pagination=1");
    // console.log(response_each.data.total_rank);
    JSON.stringify(response_each.data.total_rank);
    var username_list = [];
    response_each.data.total_rank.map((item) => {
      username_list.push(item.username);
    });

    return res.status(200).json(username_list);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
