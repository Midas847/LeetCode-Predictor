const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
//const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-121/";
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const addon = require("../.././Rating_Algorithm//build/Release/Predict_Addon");

let limiter = new Bottleneck({  
  minTime: 20
});
let limiter2 = new Bottleneck({  
    minTime: 2
  });

const fetchPreviousRating = async (result) => {
   
    for (let i = 0; i < result.length; i++){
        let username= result[i].username;
        let user_region = result[i].region;        
        //console.log(username+ " " + user_region);
        if(user_region === 'CN'){
            const query_url_CN=`https://leetcode-cn.com/graphql?query=query{    
                userProfilePublicProfile(userSlug: "${username}") {                  
                  profile{
                    contestCount,
                    ranking{
                        currentRating
                      }
                  }
                }  
            }`
            const response_rating = await limiter2.schedule(() =>
              axios.get( query_url_CN)
            );
            if(response_rating.data.data.userProfilePublicProfile==null){
                result[i].isFirstContest = false;                
            }
            else{
                result[i].isFirstContest=response_rating.data.data.userProfilePublicProfile.profile.contestCount===0?true:false,
                result[i].rating =response_rating.data.data.userProfilePublicProfile.profile.contestCount===1?1500:parseFloat(response_rating.data.data.userProfilePublicProfile.profile.ranking.currentRating)
                
            }
        }
        else{
            const query_url = `https://leetcode.com/graphql?query=query{userContestRanking(username: "${username}"){rating attendedContestsCount}}`;
            const response_rating = await limiter2.schedule(() =>
              axios.get(query_url)
            );
            if(response_rating.data.data.userContestRanking==null){
                result[i].isFirstContest = true;                 
            }
            else{
                result[i].rating = parseFloat(response_rating.data.data.userContestRanking.rating);
            }
        }

    }

}

router.get("/", async (req, res) => {
    try{
        const response = await axios.get(URL);
        const num_of_users = response.data.user_num; //Total Number of users taking part in the contest
        const total_pages = Math.ceil(num_of_users / 25); //Total number of pages        
        let result = [];
        console.time("Time Taken");
        for (let i = 1; i <= 20; i++) {
            const response_each = await limiter.schedule(() => axios.get(URL + "?pagination=" + i + "&region=global"));
            JSON.stringify(response_each.data.total_rank);           
            for (const item of response_each.data.total_rank) {                
                    const obj = {
                        isFirstContest: false,//Default
                        username: item.username,
                        rating:1500,
                        rank: item.rank,
                        region : item.data_region,
                        predictedRating: 0
                      };
                      result.push(obj);
            }          
        }
        
        
        await fetchPreviousRating(result);
        console.timeEnd("Time Taken");
         return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err});
    }
});
module.exports = router;