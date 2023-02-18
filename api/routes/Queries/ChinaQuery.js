const URL=`https://leetcode-cn.com/graphql?query=query
{    
  userProfilePublicProfile(userSlug: "xi-jing-1024") {
    username,
    siteRanking,
    profile{
      ranking{
	  currentRating
	}
    }
  }  
}`
module.exports = URL;