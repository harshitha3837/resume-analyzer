const Resume = require("../models/resume");
const scoreResume = require("../utils/scoreResume");
const classifyResume = require("../utils/resumeClassifier");

const extractResumeText = async (buffer) => {
  try {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const data = new Uint8Array(buffer);
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let extractedText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      extractedText += pageText + "\n";
    }
    return extractedText.trim();
  } catch (error) {
    console.error("PDF extraction error:", error);
    return "";
  }
};

// @route  POST /api/resume/upload
const createResume = async (req, res) => {
  try {
    const { candidateName, jobRole, jobDescription, experience } = req.body;

    if (!candidateName || !jobRole) {
      return res.status(400).json({
        success: false,
        message: "Candidate name and job role are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const resumeFile = req.file.originalname;
    let extractedText = "";

    if (req.file.buffer) {
      extractedText = await extractResumeText(req.file.buffer);
      console.log("Extracted Text Length:", extractedText.length);
    }

    // Generate ATS Scores + Feedback
    const {
      atsScore,
      toneScore,
      contentScore,
      structureScore,
      skillsScore,
      jobMatchPercentage,
      feedback,
    } = scoreResume(extractedText, jobRole, jobDescription);

    // Resume Classification
    const { predictedCategory, classificationScore } = classifyResume(extractedText);

    // Save to MongoDB
    const newResume = await Resume.create({
      candidateName,
      jobRole,
      jobDescription,
      experience,
      resumeFile,
      extractedText,
      atsScore,
      toneScore,
      contentScore,
      structureScore,
      skillsScore,
      jobMatchPercentage,
      feedback,
      predictedCategory,
      classificationScore,
    });

    return res.status(201).json({
      success: true,
      message: "Resume analyzed successfully",
      data: newResume,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route  GET /api/resume/:id
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/resume/all
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createResume, getResume, getAllResumes };