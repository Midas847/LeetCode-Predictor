const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
//const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-121/";
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");


let limiter = new Bottleneck({  
  minTime: 50,
  maxConcurrent: 1,

});


const calc1 = async(result) => {
    try{
        const response = await axios.get(URL);
        const num_of_users = response.data.user_num; //Total Number of users taking part in the contest
        const total_pages = Math.ceil(num_of_users / 25); //Total number of pages        
        
       
        for (let i = 1; i <= 100; i++) {
            const response_each = await  limiter.schedule(() => axios.get(URL + "?pagination=" + i + "&region=all-contestants"));
            JSON.stringify(response_each.data.total_rank);           
            for (const item of response_each.data.total_rank) {                
                    const obj = {
                        isFirstContest: false,//Default
                        username: item.username,
                        rating:1500,//Default
                        rank: item.rank,
                        region : item.data_region,
                        predictedRating: 0
                      };
                      result.push(obj);
            }          
        }
        console.log("All Rank Fetched");
    }
    catch(err){
        console.log("Error in Rank Fetching");    
    }
}

module.exports = calc1;