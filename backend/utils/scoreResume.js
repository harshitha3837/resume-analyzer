const scoreResume = (resumeText, jobRole, jobDescription) => {
  let atsScore = 50;
  let toneScore = 50;
  let contentScore = 50;
  let structureScore = 50;
  let skillsScore = 50;
  let jobMatchPercentage = 0;

  let feedback = [];

  const text = resumeText.toLowerCase();
  const jdText = jobDescription.toLowerCase();

  // Important technical skills
  const importantSkills = [
    "react",
    "javascript",
    "node",
    "mongodb",
    "express",
    "html",
    "css",
    "sql",
    "python",
    "java",
    "api",
    "git",
    "github",
    "aws",
    "redux",
    "typescript",
    "docker",
    "kubernetes",
    "firebase",
    "next.js"
  ];

  let matchedSkills = 0;
  let jdMatchedSkills = 0;

  // =========================
  // Skill Matching
  // =========================

  importantSkills.forEach((skill) => {
    const inResume = text.includes(skill);
    const inJD = jdText.includes(skill);

    if (inResume) {
      matchedSkills++;
    }

    if (inJD && inResume) {
      jdMatchedSkills++;
    }

    if (inJD && !inResume) {
      feedback.push(`Add ${skill} related experience or projects.`);
    }
  });

  // Skills Score
  skillsScore += matchedSkills * 3;

  if (matchedSkills < 5) {
    feedback.push("Add more relevant technical skills.");
  }

  // =========================
  // ATS Score
  // =========================

  if (text.includes(jobRole.toLowerCase())) {
    atsScore += 15;
  } else {
    feedback.push("Mention your target job role clearly.");
  }

  if (resumeText.length < 300) {
    atsScore -= 20;
    feedback.push("Resume content is too short. Add more meaningful content.");
  }

  // =========================
  // Content Score
  // =========================

  if (text.includes("projects")) {
    contentScore += 10;
  } else {
    feedback.push("Add a Projects section.");
  }

  if (
    !text.includes("achievement") &&
    !text.includes("award")
  ) {
    feedback.push("Add achievements or awards to strengthen your profile.");
  }

  if (
    !text.includes("certification") &&
    !text.includes("certifications")
  ) {
    feedback.push("Add certifications to improve credibility.");
  }

  if (
    !text.includes("internship") &&
    !text.includes("internships")
  ) {
    feedback.push("Mention internships if available.");
  }

  // =========================
  // Structure Score
  // =========================

  if (text.includes("experience")) {
    structureScore += 10;
  } else {
    feedback.push("Add an Experience section.");
  }

  if (
    !text.includes("education")
  ) {
    feedback.push("Add an Education section.");
  }

  if (
    !text.includes("summary") &&
    !text.includes("objective")
  ) {
    feedback.push("Add a professional summary or objective section.");
  }

  if (
    !text.includes("skills")
  ) {
    feedback.push("Add a dedicated Skills section.");
  }

  // =========================
  // Tone Score
  // =========================

  if (
    text.includes("developed") ||
    text.includes("built") ||
    text.includes("created") ||
    text.includes("led") ||
    text.includes("implemented") ||
    text.includes("improved") ||
    text.includes("designed")
  ) {
    toneScore += 15;
  } else {
    feedback.push(
      "Use stronger action verbs like Built, Led, Created, Developed, Improved."
    );
  }

  // Quantified achievements
  const hasNumbers =
    /\d+%|\d+\+|\d+\s(years|months|projects|clients|users)/i.test(
      resumeText
    );

  if (!hasNumbers) {
    feedback.push(
      "Add measurable achievements like increased performance by 30%."
    );
  }

  // =========================
  // Extra Professional Checks
  // =========================

  if (!text.includes("github")) {
    feedback.push("Add GitHub profile link.");
  }

  if (
    !text.includes("linkedin")
  ) {
    feedback.push("Add LinkedIn profile link.");
  }

  if (
    !text.includes("team") &&
    !text.includes("leadership")
  ) {
    feedback.push("Highlight teamwork or leadership experience.");
  }

  if (
    !text.includes("communication")
  ) {
    feedback.push("Mention communication or collaboration skills.");
  }

  if (
    !text.includes("problem solving")
  ) {
    feedback.push("Include problem-solving skills or examples.");
  }

  // =========================
  // Job Match Percentage
  // =========================

  let totalJDRelevantSkills = 0;

  importantSkills.forEach((skill) => {
    if (jdText.includes(skill)) {
      totalJDRelevantSkills++;
    }
  });

  if (totalJDRelevantSkills > 0) {
    jobMatchPercentage = Math.round(
      (jdMatchedSkills / totalJDRelevantSkills) * 100
    );
  } else {
    jobMatchPercentage = 70;
  }

  // Remove duplicates
  feedback = [...new Set(feedback)];

  // Limit max scores
  atsScore = Math.min(atsScore, 100);
  toneScore = Math.min(toneScore, 100);
  contentScore = Math.min(contentScore, 100);
  structureScore = Math.min(structureScore, 100);
  skillsScore = Math.min(skillsScore, 100);

  return {
    atsScore,
    toneScore,
    contentScore,
    structureScore,
    skillsScore,
    jobMatchPercentage,
    feedback,
  };
};

module.exports = scoreResume;