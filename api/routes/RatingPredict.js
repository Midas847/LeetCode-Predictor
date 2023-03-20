const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
const addon = require("../.././Rating_Algorithm//build/Release/Predict_Addon");
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");

const calc3 =  async (result) => {
    let predictedRatings = [];
    predictedRatings = addon.predict(result, 6);
    console.log("New Ratings Predicted");
    await result.forEach(async (obj) => {
        obj.predictedRating = predictedRatings.shift();
    });
    
}
module.exports = calc3;