const express = require("express");
const multer = require("multer");
const { createResume, getResume, getAllResumes } = require("../controllers/resumeController");

const router = express.Router();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, PNG, JPG, DOC, DOCX files are allowed"), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Routes
router.post("/upload", upload.single("resume"), createResume);
router.get("/all", getAllResumes);
router.get("/:id", getResume);

// Multer error handler
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({
      success: false,
      message: `${err.message}. Make sure file field name is exactly 'resume'`,
    });
  }
  next();
});

module.exports = router;