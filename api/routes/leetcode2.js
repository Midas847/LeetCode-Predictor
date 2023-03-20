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


router.get("/",  async (req, res) => {
      try{
        let result=[];
        await RankFetch(result);
        await RatingFetch(result);
      }
      catch(err){
          console.log(err);
      }
}
    
);
module.exports = router;