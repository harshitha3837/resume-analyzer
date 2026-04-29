const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },

  jobRole: {
    type: String,
    required: true,
  },

  jobDescription: {
    type: String,
    required: true,
  },

  experience: {
    type: Number,
    required: true,
  },

  resumeFile: {
    type: String,
    default: "",
  },

  extractedText: {
    type: String,
    default: "",
  },

  atsScore: {
    type: Number,
    default: 0,
  },

  toneScore: {
    type: Number,
    default: 0,
  },

  contentScore: {
    type: Number,
    default: 0,
  },

  structureScore: {
    type: Number,
    default: 0,
  },

  skillsScore: {
    type: Number,
    default: 0,
  },

  jobMatchPercentage: {
    type: Number,
    default: 0,
  },

  // 🧠 Resume Classification Fields
  predictedCategory: {
    type: String,
    default: "General Profile",
  },

  classificationScore: {
    type: Number,
    default: 0,
  },

  feedback: {
    type: [String],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);