// const { default: axios } = require("axios");
// const router = require("express").Router();
// const query = require("./Queries/contestInfo.js");
const addon = require("../.././Rating_Algorithm//build/Release/Predict_Addon");
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const User = require("../models/updatedUser");
const predicteduser = require("../models/predictedUser");

const RatingPredict = async () => {
  let predictedRatings = [];
  let result = [];
  try {
    const respon = await User.find(
      {},
      {
        _id: 0,
        isFirstContest: 1,
        username: 1,
        rating: 1,
        rank: 1,
      }
    );
    predictedRatings = addon.predict(respon, 6);
    for (obj of respon) {
      obj.predictedRating = predictedRatings.shift();
      console.log(obj);
    }

    const savedUsers = await predicteduser.insertMany(respon);
    console.log(savedUsers);
    return result;
  } catch (error) {
    console.log(error);
  }
};
module.exports = RatingPredict;
