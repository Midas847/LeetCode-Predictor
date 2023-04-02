const mongoose = require("mongoose");
const predictedRatings = require("./predictedUser");

const ContestSchema = new mongoose.Schema(
  {
    contestId: { type: Number },
    contestName: { type: String },
    startTime: { type: Number },
    rankings: [predictedRatings.schema],
    ratings_predicted: {
      type: Boolean,
      default: false,
    },
    duration: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", ContestSchema);
