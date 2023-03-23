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


router.get("/",  async (req, res) => {
      try{
        let result=[];
        console.log("Fetching Contest Data");
        console.time("Time Taken : ");
        await RankFetch(result);
        let x=await RatingFetch(result);
        await RatingPredict(x);
        //console.log(x);
       // await res.send(result);
        console.timeEnd("Time Taken : ");
       
      }
      catch(err){
          console.log(err);
      }
}
    
);
module.exports = router;