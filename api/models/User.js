const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    isFirstContest: { type: Boolean, default: false },
    username: { type: String },
    rating: { type: Number, default: 1500 }, //Default
    rank: { type: String },
    region: { type: String },
    predictedRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", UserSchema);
