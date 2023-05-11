const mongoose = require("mongoose");

const UserPredictedSchema = new mongoose.Schema(
  {
    isFirstContest: { type: Boolean },
    username: { type: String },
    rating: { type: Number }, //Default
    rank: { type: Number },
    region: { type: String },
    predictedRating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PredictedUser", UserPredictedSchema);
