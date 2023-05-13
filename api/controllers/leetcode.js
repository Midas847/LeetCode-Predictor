const { default: axios } = require("axios");
const router = require("express").Router();
const RankFetch = require("../routes/RankFetch.js");
const RatingFetch = require("../routes/RatingFetch.js");
const RatingPredict = require("../routes/RatingPredict.js");
const predictedUser = require("../models/predictedUser.js");
const Contest = require("../models/Contest.js");
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
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const response = await axios.get(contest_query_url);
    const final = response.data.data.allContests.slice(startIndex, endIndex);
    // console.log(final);
    return res.status(200).json(final);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getUser", async (req, res) => {
  const contestId = req.query.contestId;
  const user = req.query.userId;
  console.log(user + contestId);
  try {
    const contest = await Contest.findOne({
      contestName: contestId,
      rankings: { $elemMatch: { username: user } },
    });
    console.log(contest);
    if (contest == null) {
      return res.status(200).json("User not found");
    }
    const ranking = contest.rankings.find((r) => r.username === user);
    console.log(ranking);
    return res.status(200).json(ranking);
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
  console.log(results);
  try {
    console.log(req.query);

    const response = await Contest.find(
      { contestName: contestId },
      { rankings: { $slice: [startIndex, limit] } }
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
