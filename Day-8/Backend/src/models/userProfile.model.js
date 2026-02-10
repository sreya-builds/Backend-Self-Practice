const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      min: 0
    },

    profession: {
      type: String,
      trim: true
    },

    image: {
      type: String, // image URL
      default: ""
    },

    education: {
      type: String,
      trim: true
    },

    salary: {
      type: Number,
      min: 0
    },

    city: {
      type: String,
      trim: true
    }
  },

);


const profileModel = mongoose.model(
  "userprofiles",
  userProfileSchema
);

module.exports = profileModel;

