const { default: axios } = require("axios");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
const URL = "https://leetcode.com/contest/api/ranking/weekly-contest-121/";
const fs = require('fs');
const Bottleneck = require("bottleneck");

let limiter = new Bottleneck({
  maxConcurrent:5,
  minTime: 50,
});

let ans=''
router.get("/", async (req, res) => {
  try {
    
    const response = await axios.get(URL);
    const num_of_users = response.data.user_num; //Total Number of users taking part in the contest
    const total_pages = Math.ceil(num_of_users / 25); //Total number of pages
    //console.log(total_pages);
    let result = [];
    for (let i = 1; i <= 3; i++) {
      const response_each = await axios.get(URL + "?pagination="+i+"&region=global");
      // console.log(response_each.data.total_rank);
      JSON.stringify(response_each.data.total_rank);
      var username_list = [];
      var rating_fetch;     
    for(const item of response_each.data.total_rank){
        //let user_name=item.username;
        //console.log(user_name);
        const query_url = `https://leetcode.com/graphql?query=query{userContestRanking(username: "${item.username}"){rating attendedContestsCount}}`;
        const response_rating = await limiter.schedule(() => axios.get(query_url));

        // If response_rating.data.data.userContestRanking===null, then the user has not participated in any contest before. [Default rating is 1500]
        const obj={
            isFirstContest:response_rating.data.data.userContestRanking===null?true:false,
            username:item.username,
            rating:response_rating.data.data.userContestRanking===null?1500:response_rating.data.data.userContestRanking.rating,
            rank:item.rank
        };        
        ans+=JSON.stringify(obj)+',\n';
        username_list.push(obj);
    }
      result.push(username_list);
    }
  //   result.forEach((username_list) => {
  //     username_list.forEach((obj) => {
  //         fs.appendFileSync('contestData.json', JSON.stringify(obj) + '\n', 'utf-8');
  //     });
  // });
    fs.appendFileSync('data.json', ans, 'utf-8');
  

    
    
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
