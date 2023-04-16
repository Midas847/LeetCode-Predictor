const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
//const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-121/";
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-102/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const addon = require("../.././Rating_Algorithm//build/Release/Predict_Addon");
const RankFetch = require("./RankFetch.js");
const RatingFetch = require("./RatingFetch.js");
const RatingPredict = require("./RatingPredict.js");
const predictedUser = require("../models/predictedUser");
const Contest = require("../models/Contest");
const contest_query_url = `https://leetcode.com/graphql?query=query{
  allContests
  {
    title,
    startTime,
    duration
  }
}`;

let result = [];
router.get("/", async (req, res) => {
  try {
    // console.log("Fetching Contest Data");
    // console.time("Time Taken : ");
    // await RankFetch(result);
    // let x = await RatingFetch(result);
    // await RatingPredict(x);
    //console.log(x);
    // await res.send(result);
    // console.timeEnd("Time Taken : ");
    return res.status(200).json("Welcome to homepage!");
  } catch (err) {
    console.log(err);
  }
});
//Route to fetch contest data
router.get("/rankfetch", async (req, res) => {
  const URL = req.query.contestId;
  console.log("Fetching Contest Data");
  try {
    console.time("Time Taken for Rank Fetch: ");
    const response = await RankFetch(
      `https://leetcode.com/contest/api/ranking/${URL}/`
    );
    const result = await RatingFetch(response);
    const predictions = await RatingPredict(result, URL);
    console.timeEnd("Time Taken for Rank Fetch: ");
    return res.status(200).json(predictions);
  } catch (err) {
    console.log(err);
  }
});
//Route to fetch previous rating of each user that participated in the contest
router.get("/ratingfetch", async (req, res) => {
  try {
    console.time("Time Taken for Rating Fetch: ");
    const response = await RatingFetch();
    console.timeEnd("Time Taken for Rating Fetch: ");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});
router.get("/ratingpredict", async (req, res) => {
  try {
    console.time("Time Taken for Rating Predict: ");
    const response = await RatingPredict();
    console.timeEnd("Time Taken for Rating Predict: ");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getData", async (req, res) => {
  try {
    const response = await predictedUser.find().sort({ _id: 1 });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getContestData", async (req, res) => {
  try {
    const response = await axios.get(contest_query_url);
    return res.status(200).json(response.data.data.allContests);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getContestRankings", async (req, res) => {
  const contestId = req.query.contestId;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  // if (endIndex < (await Contest.countDocuments().exec())) {
  //   results.next = {
  //     page: page + 1,
  //     limit: limit,
  //   };
  // }

  // if (startIndex > 0) {
  //   results.previous = {
  //     page: page - 1,
  //     limit: limit,
  //   };
  // }
  console.log(results);
  try {
    console.log(req.query);
    // const response = await Contest.find({ contestName: contestId });
    results = await Contest.find({ contestName: contestId },{rankings: 1})
      .limit(limit)
      .skip(startIndex)
      .exec();
    return res.status(200).json(results);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
