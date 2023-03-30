const { default: axios } = require("axios");
const User = require("../models/User");
const updatedUser = require("../models/updatedUser");
const router = require("express").Router();
const query = require("./Queries/contestInfo.js");
const URL = "https://leetcode.com/contest/api/ranking/biweekly-contest-98/";
const fs = require("fs");
const Bottleneck = require("bottleneck");
const result = require("./RankFetch.js");
const Promises = require("bluebird");
const limiter2 = new Bottleneck({
  maxConcurrent: 5,
  minTime: 40,
});

const RatingFetch = async () => {
  let result = [];
  try {
    const respon = await User.find({}, { _id: 0 });
    for (const item of respon) {
      if (item === null) continue;
      let username = item.username;
      let user_region = item.region;
      if (user_region === "CN") {
        const query_url_CN = `https://leetcode-cn.com/graphql?query=query{
                userProfilePublicProfile(userSlug: "${username}") {
                  profile{
                    contestCount,
                    ranking{
                        currentRating
                      }
                  }
                }
            }`;
        const response_rating = await limiter2.schedule((response_rating) =>
          axios.get(query_url_CN)
        );

        if (response_rating.data.data.userProfilePublicProfile == null) {
          item.isFirstContest = false;
        } else {
          (item.isFirstContest =
            response_rating.data.data.userProfilePublicProfile.profile
              .contestCount === 0
              ? true
              : false),
            (item.rating =
              response_rating.data.data.userProfilePublicProfile.profile
                .contestCount === 1
                ? 1500
                : parseFloat(
                    response_rating.data.data.userProfilePublicProfile.profile
                      .ranking.currentRating
                  ));
        }
      } else {
        const query_url = `https://leetcode.com/graphql?query=query{userContestRanking(username: "${username}"){rating attendedContestsCount}}`;
        const response_rating = await limiter2.schedule(() =>
          axios.get(query_url)
        );
        if (response_rating.data.data.userContestRanking == null) {
          continue;
        } else if (response_rating.data.data.attendedContestsCount == 1) {
          item.isFirstContest = true;
        } else {
          item.rating = parseFloat(
            response_rating.data.data.userContestRanking.rating
          );
        }
      }
      console.log(item);
      result.push(item);
    }
    const savedUsers = await updatedUser.insertMany(result);
    console.log(savedUsers);
    console.log("All ratings fetched!");
    return result;
  } catch (error) {
    console.log("Error in Rating Fetching");
    console.log(error);
  }
};
module.exports = RatingFetch;
