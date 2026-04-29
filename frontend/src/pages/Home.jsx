import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>CareerLens</div>
        <div style={styles.navLinks}>
          <button style={styles.loginBtn} onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.badge}>✨ AI-Powered Resume Analyzer</div>
        <h1 style={styles.heroHeading}>
          <span style={styles.heroLight}>Smart feedback</span>
          <br />
          <span style={styles.heroDark}>for your dream job</span>
        </h1>
        <p style={styles.heroSub}>
          Drop your resume for an ATS score and improvement tips.
          <br />
          Get hired faster with AI-powered insights.
        </p>
        <div style={styles.heroBtns}>
          <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
            Analyze My Resume →
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate("/login")}>
            View Sample Report
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Everything you need to get hired</h2>
        <p style={styles.sectionSub}>Our AI analyzes your resume across multiple dimensions</p>
        <div style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ ...styles.section, maxWidth: "900px" }}>
        <h2 style={styles.sectionHeading}>How it works</h2>
        <p style={styles.sectionSub}>Get your resume analyzed in 3 simple steps</p>
        <div style={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} style={styles.stepItem}>
              <div style={styles.stepNumber}>{step.number}</div>
              <h3 style={styles.featureTitle}>{step.title}</h3>
              <p style={styles.featureDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaHeading}>Ready to land your dream job?</h2>
          <p style={styles.ctaSub}>
            Join thousands of job seekers who improved their resume with CareerLens
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.logo}>CareerLens</div>
        <p style={styles.footerText}>2024 CareerLens. All rights reserved.</p>
      </footer>
    </div>
  );
};

const features = [
  { icon: "🎯", title: "ATS Score", desc: "See exactly how your resume performs against Applicant Tracking Systems used by top companies." },
  { icon: "📝", title: "Content Analysis", desc: "Get actionable feedback on your bullet points, action verbs, and overall content quality." },
  { icon: "🔑", title: "Keyword Match", desc: "Discover missing keywords from the job description and add them to boost your chances." },
  { icon: "📊", title: "Detailed Scores", desc: "Receive scores for Tone, Structure, Skills, and Content with specific improvement tips." },
  { icon: "⚡", title: "Instant Results", desc: "Get your full resume analysis in seconds, not hours. No waiting, no guessing." },
  { icon: "💡", title: "Smart Suggestions", desc: "AI-powered suggestions to rewrite weak sections and make your resume stand out." },
];

const steps = [
  { number: "01", title: "Upload Your Resume", desc: "Upload your resume in PDF or Word format. We support all common resume formats." },
  { number: "02", title: "Select Your Job Role", desc: "Tell us the job you're applying for so we can tailor the analysis to your target role." },
  { number: "03", title: "Get Your Report", desc: "Receive a detailed ATS score and actionable feedback to improve your resume instantly." },
];

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
    width: "500px", height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(185,28,28,0.15) 0%, transparent 70%)",
    top: "-150px", left: "-150px",
    pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed",
    width: "400px", height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
    bottom: "-100px", right: "-100px",
    pointerEvents: "none", zIndex: 0,
  },
  blob3: {
    position: "fixed",
    width: "300px", height: "300px",
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
    textTransform: "uppercase",
  },
  navLinks: { display: "flex", alignItems: "center", gap: "12px" },
  loginBtn: {
    padding: "10px 20px",
    border: "1.5px solid rgba(185,28,28,0.3)",
    borderRadius: "12px", background: "transparent",
    color: "#b91c1c", fontSize: "14px", fontWeight: 500,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  },
  uploadBtn: {
    padding: "10px 20px", border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #b91c1c 0%, #e11d48 100%)",
    color: "white", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 15px rgba(185,28,28,0.3)",
  },

  // Hero
  hero: {
    position: "relative", zIndex: 1,
    display: "flex", flexDirection: "column",
    alignItems: "center", textAlign: "center",
    padding: "5rem 2rem 4rem",
  },
  badge: {
    display: "inline-block",
    padding: "6px 16px",
    background: "rgba(185,28,28,0.08)",
    border: "1px solid rgba(185,28,28,0.2)",
    borderRadius: "999px", fontSize: "13px",
    color: "#b91c1c", fontWeight: 500, marginBottom: "1.5rem",
  },
  heroHeading: {
    fontSize: "clamp(36px, 6vw, 72px)",
    fontWeight: 700, margin: "0 0 1.2rem",
    lineHeight: 1.15, fontFamily: "'DM Sans', sans-serif",
  },
  heroLight: { color: "#fca5a5", fontStyle: "italic" },
  heroDark: { color: "#1c0a0a" },
  heroSub: {
    fontSize: "16px", color: "#9f6060",
    lineHeight: 1.7, margin: "0 0 2.5rem", maxWidth: "500px",
  },
  heroBtns: {
    display: "flex", gap: "12px",
    flexWrap: "wrap", justifyContent: "center",
    marginBottom: "3rem",
  },
  primaryBtn: {
    padding: "14px 28px", border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #b91c1c 0%, #e11d48 50%, #fb7185 100%)",
    color: "white", fontSize: "15px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 20px rgba(185,28,28,0.35)",
  },
  secondaryBtn: {
    padding: "14px 28px",
    border: "1.5px solid rgba(185,28,28,0.25)",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.8)",
    color: "#b91c1c", fontSize: "15px", fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  },

  // Sections
  section: {
    position: "relative", zIndex: 1,
    padding: "4rem 2rem", textAlign: "center",
    maxWidth: "1100px", margin: "0 auto",
  },
  sectionHeading: {
    fontSize: "32px", fontWeight: 700,
    color: "#1c0a0a", margin: "0 0 0.6rem",
  },
  sectionSub: {
    fontSize: "15px", color: "#9f6060", margin: "0 0 3rem",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  featureCard: {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(185,28,28,0.1)",
    borderRadius: "20px", padding: "2rem", textAlign: "left",
    boxShadow: "0 4px 20px rgba(185,28,28,0.06)",
  },
  featureIcon: { fontSize: "32px", marginBottom: "1rem" },
  featureTitle: {
    fontSize: "16px", fontWeight: 600,
    color: "#1c0a0a", margin: "0 0 0.5rem",
  },
  featureDesc: {
    fontSize: "14px", color: "#9f6060",
    lineHeight: 1.6, margin: 0,
  },

  // Steps
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "2rem", marginTop: "2rem",
  },
  stepItem: {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(185,28,28,0.1)",
    borderRadius: "20px", padding: "2rem", textAlign: "center",
    boxShadow: "0 4px 20px rgba(185,28,28,0.06)",
  },
  stepNumber: {
    fontSize: "36px", fontWeight: 700,
    color: "rgba(185,28,28,0.2)", marginBottom: "0.8rem",
  },

  // CTA
  cta: {
    position: "relative", zIndex: 1,
    padding: "2rem 2rem 4rem",
    display: "flex", justifyContent: "center",
  },
  ctaCard: {
    background: "linear-gradient(135deg, rgba(185,28,28,0.08) 0%, rgba(225,29,72,0.08) 100%)",
    border: "1px solid rgba(185,28,28,0.2)",
    borderRadius: "24px", padding: "3rem",
    textAlign: "center", maxWidth: "600px", width: "100%",
    backdropFilter: "blur(12px)",
  },
  ctaHeading: {
    fontSize: "28px", fontWeight: 700,
    color: "#1c0a0a", margin: "0 0 0.8rem",
  },
  ctaSub: {
    fontSize: "15px", color: "#9f6060",
    margin: "0 0 2rem", lineHeight: 1.6,
  },

  // Footer
  footer: {
    position: "relative", zIndex: 1,
    textAlign: "center", padding: "2rem",
    borderTop: "1px solid rgba(185,28,28,0.1)",
  },
  footerText: {
    fontSize: "13px", color: "#d4a0a0", marginTop: "0.5rem",
  },
};

export default Home;