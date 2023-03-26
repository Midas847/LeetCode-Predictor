const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
//const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-121/";
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const addon = require("../.././Rating_Algorithm//build/Release/Predict_Addon");
const RankFetch = require("./RankFetch.js");
const RatingFetch = require("./RatingFetch.js");
const RatingPredict = require("./RatingPredict.js");

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
  try {
    // console.log("Fetching Contest Data");
    // console.time("Time Taken for Rank Fetch: ");
    const response = await RankFetch();
    // console.timeEnd("Time Taken for Rank Fetch: ");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});
//Route to fetch previous rating of each user that participated in the contest
router.get("/ratingfetch", async (req, res) => {
  try {
    const response = await RatingFetch();
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});
router.get("/ratingpredict", async (req, res) => {
  try {
    const response = await RatingPredict();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
