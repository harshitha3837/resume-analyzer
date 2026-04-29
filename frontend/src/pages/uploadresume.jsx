import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    candidateName: "",
    jobRole: "",
    jobDescription: "",
    experience: "",
  });
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { candidateName, jobRole } = formData;

    if (!candidateName || !jobRole) {
      return setError("Candidate name and job role are required");
    }
    if (!file) {
      return setError("Please upload your resume");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("candidateName", formData.candidateName);
      data.append("jobRole", formData.jobRole);
      data.append("jobDescription", formData.jobDescription);
      data.append("experience", formData.experience);
      data.append("resume", file);

      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const result = await res.json();
      if (result.success) {
  navigate(`/review/${result.data._id}`);
      } else {
        setError(result.message || "Upload failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const jobRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "Product Manager",
    "Software Engineer",
    "Mobile Developer",
    "Machine Learning Engineer",
  ];

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>CareerLens</div>
        <button style={styles.logoutBtn} onClick={() => {
          localStorage.clear();
          navigate("/");
        }}>
          Log Out
        </button>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.heading}>
            <span style={styles.headingLight}>Smart feedback </span>
            <span style={styles.headingDark}>for your dream job</span>
          </h1>
          <p style={styles.sub}>Drop your resume for an ATS score and improvement tips.</p>
        </div>

        <div style={styles.card}>
          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Candidate Name */}
            <label style={styles.label} htmlFor="candidateName">Candidate Name</label>
            <input
              id="candidateName"
              type="text"
              placeholder="Your full name"
              value={formData.candidateName}
              onChange={handleChange}
              style={styles.input}
            />

            {/* Job Role */}
            <label style={styles.label} htmlFor="jobRole">Select Job Role</label>
            <select
              id="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select a job role...</option>
              {jobRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            {/* Job Description */}
            <label style={styles.label} htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              placeholder="Write a clear & concise job description with responsibilities & expectations..."
              value={formData.jobDescription}
              onChange={handleChange}
              style={styles.textarea}
              rows={4}
            />

            {/* Experience */}
            <label style={styles.label} htmlFor="experience">Years of Experience</label>
            <input
              id="experience"
              type="number"
              placeholder="Enter number of years"
              value={formData.experience}
              onChange={handleChange}
              style={styles.input}
              min="0"
              max="50"
            />

            {/* File Upload */}
            <label style={styles.label}>Upload Resume</label>
            <div
              style={{
                ...styles.dropZone,
                ...(dragOver ? styles.dropZoneActive : {}),
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {file ? (
                <div style={styles.fileSelected}>
                  <span style={styles.fileIcon}>📄</span>
                  <span style={styles.fileName}>{file.name}</span>
                  <span style={styles.fileSize}>
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              ) : (
                <div style={styles.dropContent}>
                  <div style={styles.uploadIcon}>📁</div>
                  <p style={styles.dropText}>
                    <strong>Click to upload</strong> or drag and drop
                  </p>
                  <p style={styles.dropHint}>PDF, DOC, DOCX, PNG or JPG (max. 10MB)</p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? (
                <span>⏳ Analyzing Resume...</span>
              ) : (
                <span>Save & Analyze Resume →</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff5f5 0%, #fff0ee 50%, #fdf6f0 100%)",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed",
    width: "400px", height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(185,28,28,0.15) 0%, transparent 70%)",
    top: "-100px", left: "-100px",
    pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed",
    width: "350px", height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
    bottom: "-80px", right: "-80px",
    pointerEvents: "none", zIndex: 0,
  },
  blob3: {
    position: "fixed",
    width: "250px", height: "250px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(254,205,211,0.4) 0%, transparent 70%)",
    top: "40%", right: "5%",
    pointerEvents: "none", zIndex: 0,
  },

  // Navbar
  navbar: {
    position: "relative", zIndex: 10,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.2rem 4rem",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(185,28,28,0.1)",
  },
  logo: {
    fontWeight: 700, fontSize: "18px",
    letterSpacing: "2px", color: "#b91c1c",
    textTransform: "uppercase", cursor: "pointer",
  },
  logoutBtn: {
    padding: "8px 18px",
    border: "1.5px solid rgba(185,28,28,0.3)",
    borderRadius: "10px", background: "transparent",
    color: "#b91c1c", fontSize: "14px", fontWeight: 500,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  },

  // Content
  content: {
    position: "relative", zIndex: 1,
    maxWidth: "640px", margin: "0 auto",
    padding: "3rem 2rem",
  },
  header: {
    textAlign: "center", marginBottom: "2rem",
  },
  heading: {
    fontSize: "clamp(24px, 4vw, 40px)",
    fontWeight: 700, margin: "0 0 0.6rem",
    lineHeight: 1.2,
  },
  headingLight: { color: "#fca5a5", fontStyle: "italic" },
  headingDark: { color: "#1c0a0a" },
  sub: {
    fontSize: "15px", color: "#9f6060", margin: 0,
  },

  // Card
  card: {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.9)",
    borderRadius: "24px",
    padding: "2.5rem",
    boxShadow: "0 8px 40px rgba(185,28,28,0.08)",
  },
  errorBox: {
    background: "rgba(185,28,28,0.08)",
    border: "1px solid rgba(185,28,28,0.2)",
    borderRadius: "10px", padding: "10px 14px",
    fontSize: "13px", color: "#b91c1c",
    marginBottom: "1.2rem", textAlign: "center",
  },
  label: {
    display: "block", fontSize: "13px",
    fontWeight: 500, color: "#7a3030",
    marginBottom: "6px", letterSpacing: "0.3px",
  },
  input: {
    width: "100%", boxSizing: "border-box",
    padding: "13px 16px",
    border: "1.5px solid rgba(185,28,28,0.2)",
    borderRadius: "14px", fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1c0a0a", background: "rgba(255,255,255,0.8)",
    outline: "none", marginBottom: "1.2rem",
  },
  select: {
    width: "100%", boxSizing: "border-box",
    padding: "13px 16px",
    border: "1.5px solid rgba(185,28,28,0.2)",
    borderRadius: "14px", fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1c0a0a", background: "rgba(255,255,255,0.8)",
    outline: "none", marginBottom: "1.2rem",
    cursor: "pointer",
  },
  textarea: {
    width: "100%", boxSizing: "border-box",
    padding: "13px 16px",
    border: "1.5px solid rgba(185,28,28,0.2)",
    borderRadius: "14px", fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1c0a0a", background: "rgba(255,255,255,0.8)",
    outline: "none", marginBottom: "1.2rem",
    resize: "vertical",
  },

  // Drop zone
  dropZone: {
    border: "2px dashed rgba(185,28,28,0.3)",
    borderRadius: "16px",
    padding: "2rem",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "1.5rem",
    background: "rgba(255,255,255,0.5)",
    transition: "all 0.2s",
  },
  dropZoneActive: {
    border: "2px dashed #b91c1c",
    background: "rgba(185,28,28,0.04)",
  },
  dropContent: {},
  uploadIcon: { fontSize: "36px", marginBottom: "0.8rem" },
  dropText: {
    fontSize: "15px", color: "#7a3030",
    margin: "0 0 0.3rem",
  },
  dropHint: {
    fontSize: "12px", color: "#b08060", margin: 0,
  },
  fileSelected: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "10px",
  },
  fileIcon: { fontSize: "24px" },
  fileName: {
    fontSize: "14px", fontWeight: 600, color: "#b91c1c",
  },
  fileSize: {
    fontSize: "12px", color: "#9f6060",
  },

  // Button
  btn: {
    width: "100%", padding: "15px", border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #b91c1c 0%, #e11d48 50%, #fb7185 100%)",
    color: "white", fontSize: "16px", fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
    boxShadow: "0 4px 20px rgba(185,28,28,0.35)",
  },
};

export default UploadResume;