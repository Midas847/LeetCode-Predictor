// const { default: axios } = require("axios");
// const router = require("express").Router();
// const query = require("./Queries/contestInfo.js");
const addon = require("../.././Rating_Algorithm//build/Release/Predict_Addon");
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const User = require("../models/updatedUser");
const predicteduser = require("../models/predictedUser");
const Contest = require("../models/Contest");

const RatingPredict = async (respon) => {
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
    // const contest = await new Contest({
    //   contestId: 1,
    //   contestName: "biweekly-contest-98",
    //   startTime: 1600000000,
    //   rankings: savedUsers,
    //   ratings_predicted: true,
    //   duration: 3600,
    // }).save();
    // console.log(contest);
    return savedUsers;
  } catch (error) {
    console.log(error);
  }
};
module.exports = RatingPredict;
