const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
//const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-121/";
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const result = require("./RankFetch.js");
const limiter2 = new Bottleneck({
    maxConcurrent: 5,
    minTime: 80,
    
});
const calc = async (result) => {
    for (let i = 0; i < result.length; i++){
        let username= result[i].username;
        if(username[0]=='@') continue;
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
                console.log(i+" "+username+" "+response_rating.data.data.userProfilePublicProfile.profile.ranking.currentRating)
                
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
                console.log(i+" "+username+" "+response_rating.data.data.userContestRanking.rating);
            }
        }

    }
}
module.exports = calc;