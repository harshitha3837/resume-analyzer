import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReviewDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching resume ID:", id);
        console.log("Token:", token);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resume/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = await res.json();
        console.log("Full API response:", JSON.stringify(data, null, 2));
        setRawData(data);

        if (data.success) {
          setResume(data.data);
        } else {
          setError(data.message || "Failed to load resume");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Server error: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  const getScoreColor = (score) => {
    if (score >= 70) return "#16a34a";
    if (score >= 40) return "#d97706";
    return "#b91c1c";
  };

  const getScoreBadge = (score) => {
    if (score >= 70) return { label: "Strong", bg: "rgba(22,163,74,0.1)", color: "#16a34a" };
    if (score >= 40) return { label: "Good Start", bg: "rgba(217,119,6,0.1)", color: "#d97706" };
    return { label: "Needs Work", bg: "rgba(185,28,28,0.1)", color: "#b91c1c" };
  };

  const ScoreRing = ({ score }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    return (
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(185,28,28,0.1)" strokeWidth="10" />
        <circle cx="65" cy="65" r={radius} fill="none"
          stroke="url(#scoreGrad)" strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 65 65)"
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="700" fill="#1c0a0a">{score}</text>
        <text x="65" y="78" textAnchor="middle" fontSize="12" fill="#9f6060">/100</text>
      </svg>
    );
  };

  if (loading) {
    return (
      <div style={styles.centered}>
        <p style={{ color: "#9f6060", fontSize: "18px" }}>⏳ Loading your review...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centered}>
        <p style={{ color: "#b91c1c", fontSize: "16px" }}>❌ {error}</p>
        {rawData && (
          <pre style={styles.debugBox}>
            {JSON.stringify(rawData, null, 2)}
          </pre>
        )}
        <button style={styles.primaryBtn} onClick={() => navigate("/upload")}>
          Go Back
        </button>
      </div>
    );
  }

  if (!resume) {
    return (
      <div style={styles.centered}>
        <p style={{ color: "#9f6060" }}>No resume data found.</p>
        <pre style={styles.debugBox}>{JSON.stringify(rawData, null, 2)}</pre>
      </div>
    );
  }

  const overallScore = Math.round(
    ((resume.atsScore || 0) +
      (resume.toneScore || 0) +
      (resume.contentScore || 0) +
      (resume.structureScore || 0) +
      (resume.skillsScore || 0)) / 5
  );

  const categories = [
    { key: "ats", title: "ATS Score", score: resume.atsScore || 0 },
    { key: "content", title: "Content", score: resume.contentScore || 0 },
    { key: "tone", title: "Tone & Style", score: resume.toneScore || 0 },
    { key: "structure", title: "Structure", score: resume.structureScore || 0 },
    { key: "skills", title: "Skills", score: resume.skillsScore || 0 },
  ];

  const feedbackEntries = resume.feedback
    ? Object.entries(resume.feedback).map(([key, value]) => ({
        key,
        label: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
        passed: typeof value === "object" ? value?.passed : true,
        message: typeof value === "object" ? value?.message : String(value),
      }))
    : [];

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>CareerLens</div>
        <div style={styles.navRight}>
          <button style={styles.newBtn} onClick={() => navigate("/upload")}>+ New Resume</button>
          <button style={styles.logoutBtn} onClick={() => { localStorage.clear(); navigate("/login"); }}>Log Out</button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbLink} onClick={() => navigate("/")}>Home</span>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={styles.breadcrumbLink} onClick={() => navigate("/upload")}>{resume.jobRole}</span>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={styles.breadcrumbCurrent}>Resume Review</span>
      </div>

      <div style={styles.content}>
        <h1 style={styles.pageTitle}>Resume Review</h1>
        <p style={styles.pageSub}>{resume.candidateName} — {resume.jobRole}</p>

        {/* Overall Score Card */}
        <div style={styles.overallCard}>
          <div style={styles.scoreSection}>
            <ScoreRing score={overallScore} />
            <div style={styles.scoreInfo}>
              <h2 style={styles.scoreTitle}>Your Resume Score</h2>
              <p style={styles.scoreDesc}>
                Calculated based on ATS compatibility, content, structure, tone and skills.
              </p>
              {resume.jobMatchPercentage !== undefined && (
                <div style={styles.badge}>🎯 Job Match: {resume.jobMatchPercentage}%</div>
              )}
              {resume.predictedCategory && (
                <div style={{ ...styles.badge, marginTop: "8px" }}>
                  📂 Category: {resume.predictedCategory}
                </div>
              )}
            </div>
          </div>

          {/* Score Rows */}
          <div style={styles.scoreRows}>
            {categories.map((cat) => {
              const badge = getScoreBadge(cat.score);
              return (
                <div key={cat.key} style={styles.scoreRow}>
                  <span style={styles.scoreRowLabel}>{cat.title}</span>
                  <span style={{ ...styles.scoreBadge, background: badge.bg, color: badge.color }}>
                    {badge.label}
                  </span>
                  <div style={styles.scoreBarWrap}>
                    <div style={{
                      ...styles.scoreBar,
                      width: `${cat.score}%`,
                      background: "linear-gradient(90deg, #b91c1c, #fb7185)",
                    }} />
                  </div>
                  <span style={{ ...styles.scoreNum, color: getScoreColor(cat.score) }}>
                    {cat.score}/100
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {feedbackEntries.length > 0 && (
          <>
            <h2 style={styles.sectionTitle}>Detailed Feedback</h2>
            <div style={styles.feedbackCard}>
              <div style={styles.checksGrid}>
                {feedbackEntries.map((item, i) => (
                  <div key={i} style={styles.checkItem}>
                    <span>{item.passed ? "✅" : "⚠️"}</span>
                    <span style={styles.checkLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
              {feedbackEntries.map((item, i) => (
                <div key={i} style={{
                  ...styles.detailCard,
                  borderLeft: `3px solid ${item.passed ? "#16a34a" : "#d97706"}`,
                  background: item.passed ? "rgba(22,163,74,0.04)" : "rgba(217,119,6,0.04)",
                }}>
                  <p style={styles.detailTitle}>{item.passed ? "✅" : "⚠️"} {item.label}</p>
                  {item.message && <p style={styles.detailMsg}>{item.message}</p>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Resume Text Preview */}
        {resume.extractedText && (
          <>
            <h2 style={styles.sectionTitle}>Resume Text Preview</h2>
            <div style={styles.textPreview}>
              {resume.extractedText.substring(0, 500)}
              {resume.extractedText.length > 500 ? "..." : ""}
            </div>
          </>
        )}

        {/* Actions */}
        <div style={styles.actions}>
          <button style={styles.primaryBtn} onClick={() => navigate("/upload")}>
            Analyze Another Resume →
          </button>
          <button style={styles.secondaryBtn} onClick={() => window.print()}>
            Download Report
          </button>
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
  },
  blob1: {
    position: "fixed", width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(185,28,28,0.12) 0%, transparent 70%)",
    top: "-100px", left: "-100px", pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed", width: "350px", height: "350px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(251,113,133,0.1) 0%, transparent 70%)",
    bottom: "-80px", right: "-80px", pointerEvents: "none", zIndex: 0,
  },
  centered: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: "1rem", padding: "2rem",
  },
  debugBox: {
    background: "#fff", border: "1px solid #eee", borderRadius: "12px",
    padding: "1rem", fontSize: "12px", maxWidth: "600px",
    overflow: "auto", maxHeight: "400px", textAlign: "left",
  },
  navbar: {
    position: "relative", zIndex: 10,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.2rem 4rem",
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(185,28,28,0.1)",
  },
  logo: {
    fontWeight: 700, fontSize: "18px", letterSpacing: "2px",
    color: "#b91c1c", textTransform: "uppercase", cursor: "pointer",
  },
  navRight: { display: "flex", gap: "10px", alignItems: "center" },
  newBtn: {
    padding: "8px 18px", border: "none", borderRadius: "10px",
    background: "linear-gradient(135deg, #b91c1c, #e11d48)",
    color: "white", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  },
  logoutBtn: {
    padding: "8px 18px", border: "1.5px solid rgba(185,28,28,0.3)",
    borderRadius: "10px", background: "transparent",
    color: "#b91c1c", fontSize: "14px", fontWeight: 500,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  },
  breadcrumb: {
    position: "relative", zIndex: 1, padding: "1rem 4rem",
    display: "flex", alignItems: "center", gap: "8px", fontSize: "13px",
  },
  breadcrumbLink: { color: "#b91c1c", cursor: "pointer", fontWeight: 500 },
  breadcrumbSep: { color: "#d4a0a0" },
  breadcrumbCurrent: { color: "#9f6060" },
  content: {
    position: "relative", zIndex: 1,
    maxWidth: "800px", margin: "0 auto", padding: "1rem 2rem 4rem",
  },
  pageTitle: { fontSize: "32px", fontWeight: 700, color: "#1c0a0a", margin: "0 0 0.3rem" },
  pageSub: { fontSize: "15px", color: "#9f6060", margin: "0 0 2rem" },
  overallCard: {
    background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.9)", borderRadius: "24px",
    padding: "2rem", boxShadow: "0 8px 40px rgba(185,28,28,0.08)", marginBottom: "2rem",
  },
  scoreSection: {
    display: "flex", alignItems: "center",
    gap: "2rem", marginBottom: "2rem", flexWrap: "wrap",
  },
  scoreInfo: { flex: 1 },
  scoreTitle: { fontSize: "22px", fontWeight: 700, color: "#1c0a0a", margin: "0 0 0.5rem" },
  scoreDesc: { fontSize: "14px", color: "#9f6060", margin: "0 0 1rem", lineHeight: 1.6 },
  badge: {
    display: "inline-block", padding: "6px 14px",
    background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.2)",
    borderRadius: "999px", fontSize: "13px", color: "#b91c1c", fontWeight: 500,
  },
  scoreRows: { display: "flex", flexDirection: "column", gap: "12px" },
  scoreRow: { display: "flex", alignItems: "center", gap: "12px" },
  scoreRowLabel: { width: "110px", fontSize: "14px", fontWeight: 500, color: "#1c0a0a", flexShrink: 0 },
  scoreBadge: { padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, flexShrink: 0 },
  scoreBarWrap: { flex: 1, height: "8px", background: "rgba(185,28,28,0.1)", borderRadius: "999px", overflow: "hidden" },
  scoreBar: { height: "100%", borderRadius: "999px" },
  scoreNum: { fontSize: "14px", fontWeight: 600, flexShrink: 0 },
  sectionTitle: { fontSize: "22px", fontWeight: 700, color: "#1c0a0a", margin: "0 0 1rem" },
  feedbackCard: {
    background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.9)", borderRadius: "20px",
    padding: "1.5rem", boxShadow: "0 4px 20px rgba(185,28,28,0.06)", marginBottom: "2rem",
  },
  checksGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "8px", marginBottom: "1.2rem",
  },
  checkItem: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#7a3030" },
  checkLabel: { fontWeight: 500 },
  detailCard: { borderRadius: "12px", padding: "1rem 1.2rem", marginBottom: "0.6rem" },
  detailTitle: { fontSize: "14px", fontWeight: 600, color: "#1c0a0a", margin: "0 0 0.4rem" },
  detailMsg: { fontSize: "13px", color: "#9f6060", margin: 0, lineHeight: 1.6 },
  textPreview: {
    background: "rgba(255,255,255,0.75)", border: "1px solid rgba(185,28,28,0.1)",
    borderRadius: "16px", padding: "1.5rem", fontSize: "13px", color: "#7a3030",
    lineHeight: 1.7, marginBottom: "2rem", whiteSpace: "pre-wrap",
  },
  actions: { display: "flex", gap: "12px", marginTop: "2rem", flexWrap: "wrap" },
  primaryBtn: {
    padding: "14px 28px", border: "none", borderRadius: "14px",
    background: "linear-gradient(135deg, #b91c1c 0%, #e11d48 50%, #fb7185 100%)",
    color: "white", fontSize: "15px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 20px rgba(185,28,28,0.35)",
  },
  secondaryBtn: {
    padding: "14px 28px", border: "1.5px solid rgba(185,28,28,0.25)",
    borderRadius: "14px", background: "rgba(255,255,255,0.8)",
    color: "#b91c1c", fontSize: "15px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  },
};

export default ReviewDashboard;