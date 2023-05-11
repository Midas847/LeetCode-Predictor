const { default: axios } = require("axios");
// const router = require("express").Router();
// const query = require("./Queries/contestInfo.js");
const addon = require("../.././Rating_Algorithm//build/Release/Predict_Addon");
// const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-101/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const User = require("../models/updatedUser");
const predicteduser = require("../models/predictedUser");
const Contest = require("../models/Contest");
const contest_query_url = `https://leetcode.com/graphql?query=query{
  allContests
  {
    title,
    startTime,
    duration
  }
}`;

const RatingPredict = async (respon, URL) => {
  console.log(URL);
  let predictedRatings = [];
  let result = [];
  try {
    // const respon = await User.find(
    //   {},
    //   {
    //     _id: 0,
    //     isFirstContest: 1,
    //     username: 1,
    //     rating: 1,
    //     rank: 1,
    //   }
    // );
    predictedRatings = addon.predict(respon, 6);
    for (obj of respon) {
      obj.predictedRating = predictedRatings.shift();
    }

    const savedUsers = await predicteduser.insertMany(respon);
    // const contestInfo = await axios.get(contest_query_url);

    const contest = await new Contest({
      contestName: URL,
      startTime: 1600000000,
      rankings: savedUsers,
      ratings_predicted: true,
      duration: 3600,
    }).save();
    console.log(contest);
    return savedUsers;
  } catch (error) {
    console.log(error);
  }
};
module.exports = RatingPredict;
