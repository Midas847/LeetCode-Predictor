const { default: axios } = require("axios");
const User = require("../models/User");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
const fs = require("fs");
const Bottleneck = require("bottleneck");
const NodeCache = require("node-cache");
const cache = new NodeCache();

let limiter = new Bottleneck({
  minTime: 40,
  maxConcurrent: 10,
});

const calc1 = async (URL) => {
  // console.log(URL);
  try {
    const cacheKey = "contestRanking";
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("Using cached data");
      return cachedData;
    }
    const response = await axios.get(URL);
    const num_of_users = response.data.user_num; //Total Number of users taking part in the contest
    const total_pages = Math.ceil(num_of_users / 25); //Total number of pages
    console.log(total_pages);
    let users = [];
    for (let i = 1; i <= total_pages; i++) {
      const response_each = await limiter.schedule(() =>
        axios.get(URL + "?pagination=" + i + "&region=all-contestants")
      );
      JSON.stringify(response_each.data.total_rank);
      for (const item of response_each.data.total_rank) {
        // const obj = {
        //   username: item.username,
        //   rank: item.rank,
        //   region: item.data_region,
        // };

        const obj = {
          isFirstContest: false,
          username: item.username,
          rating: 1500,
          rank: item.rank,
          region: item.data_region,
          predictedRating: 0,
        };
        users.push(obj);
      }
    }
    cache.set(cacheKey, users);
    const savedUsers = await User.insertMany(users);
    // console.log(savedUsers);
    console.log("All Rank Fetched");
    return users;
  } catch (err) {
    console.log("Error in Rank Fetching");
    console.log(err);
  }
};

module.exports = calc1;
