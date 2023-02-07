const url = `https://leetcode.com/graphql?query=query
{    
  userContestRanking(username: "ayushman_sinha") {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
  }
  userContestRankingHistory(username: "ayushman_sinha") {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
} `;
module.exports = url;
