const fs = require("fs");
const addon = require("./build/Release/Predict_Addon");
const filePath = "./test/data.json";
const data = JSON.parse(fs.readFileSync(filePath));

let predictedRatings = [];
// Predictions with C++ Addon
console.time("rating predictions (C++)");
predictedRatings = addon.predict(data, 4);
console.log(predictedRatings);
fs.writeFileSync("example.json", JSON.stringify(predictedRatings), "utf-8");
console.timeEnd("rating predictions (C++)");

// Predictions with JavaScript
// const predict = (data) => {
//   const getRatings = (GMean) => {
//     let l = 1,
//       r = 100000,
//       mid,
//       seed;
//     while (r - l > 0.1) {
//       mid = l + (r - l) / 2;
//       seed = 1 + getExpectedRank(mid);
//       if (seed > GMean) {
//         l = mid;
//       } else {
//         r = mid;
//       }
//     }
//     return mid;
//   };

//   const getExpectedRank = (userRating) => {
//     let seed = 0;
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].rating !== -1) {
//         seed += meanWinningPercentage(userRating, data[i].rating);
//       }
//     }
//     return seed;
//   };

//   const meanWinningPercentage = (ratingA, ratingB) => {
//     return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
//   };

//   const geometricMean = (eRank, rank) => {
//     return Math.sqrt(eRank * rank);
//   };

//   let result = new Array(data.length);
//   const calculate = (i) => {
//     if (data[i].rating === -1) return;
//     const expectedRank = 0.5 + getExpectedRank(data[i].rating);
//     const GMean = geometricMean(expectedRank, i + 1);
//     const expectedRating = getRatings(GMean);
//     let delta = expectedRating - data[i].rating;
//     if (data[i].isFirstContest) delta *= 0.5;
//     else delta = (delta * 2) / 9;
//     result[i] = data[i].rating + delta;
//     console.log(
//       i + 1,
//       "=> Expected Rank: ",
//       expectedRank,
//       " GMean: ",
//       GMean,
//       " expectedRating: ",
//       expectedRating,
//       " Delta: ",
//       delta,
//       " New rating: ",
//       result[i]
//     );
//   };

//   for (let i = 0; i < data.length; i++) {
//     calculate(i);
//   }
//   return result;
// };

// console.time("rating predictions (Js)");
// predictedRatings = predict(data);
// console.timeEnd("rating predictions (Js)");
// MSE(predictedRatings);
