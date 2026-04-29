const classifyResume = (resumeText) => {
  const text = resumeText.toLowerCase();

  const categories = {
    "Frontend Developer": [
      "react",
      "javascript",
      "html",
      "css",
      "redux",
      "typescript",
      "next.js",
      "ui",
      "frontend"
    ],

    "Backend Developer": [
      "node",
      "express",
      "mongodb",
      "sql",
      "api",
      "backend",
      "server",
      "database",
      "authentication"
    ],

    "Data Science": [
      "python",
      "machine learning",
      "data analysis",
      "pandas",
      "numpy",
      "tensorflow",
      "power bi",
      "statistics",
      "sql"
    ],

    "DevOps Engineer": [
      "docker",
      "kubernetes",
      "aws",
      "jenkins",
      "ci/cd",
      "linux",
      "cloud",
      "terraform",
      "devops"
    ],

    "HR": [
      "recruitment",
      "hiring",
      "employee",
      "hr",
      "onboarding",
      "payroll",
      "talent acquisition",
      "training"
    ],

    "Sales": [
      "sales",
      "marketing",
      "client",
      "business development",
      "lead generation",
      "customer relationship",
      "targets",
      "revenue"
    ]
  };

  let bestCategory = "General Profile";
  let highestScore = 0;

  for (const category in categories) {
    let score = 0;

    categories[category].forEach((keyword) => {
      if (text.includes(keyword)) {
        score++;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  }

  return {
    predictedCategory: bestCategory,
    classificationScore: highestScore
  };
};

module.exports = classifyResume;