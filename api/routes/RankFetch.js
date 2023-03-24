const { default: axios } = require("axios");
const User = require("../models/User");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
//const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-121/";
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
// const UserDb = require("../models/User");

let limiter = new Bottleneck({
  minTime: 40,
  maxConcurrent: 1,
});

const calc1 = async (result) => {
  try {
    const response = await axios.get(URL);
    const num_of_users = response.data.user_num; //Total Number of users taking part in the contest
    const total_pages = Math.ceil(num_of_users / 25); //Total number of pages

    for (let i = 1; i <= 1; i++) {
      const response_each = await limiter.schedule(() =>
        axios.get(URL + "?pagination=" + i + "&region=all-contestants")
      );
      JSON.stringify(response_each.data.total_rank);
      for (const item of response_each.data.total_rank) {
        // Inserting into db
        const savedUser = await new User({
          username: item.username,
          rank: item.rank,
          region: item.data_region,
        }).save();
      }
    }

    console.log("All Rank Fetched");
    return result;
  } catch (err) {
    console.log("Error in Rank Fetching");
    console.log(Error);
  }
};

module.exports = calc1;
