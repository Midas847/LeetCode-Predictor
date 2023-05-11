const mongoose = require("mongoose");

const UserUpdatedSchema = new mongoose.Schema(
  {
    isFirstContest: { type: Boolean },
    username: { type: String },
    rating: { type: Number }, //Default
    rank: { type: String },
    region: { type: String },
    predictedRating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UpdatedUser", UserUpdatedSchema);
