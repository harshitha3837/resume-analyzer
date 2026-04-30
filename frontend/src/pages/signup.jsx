import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      <div style={styles.card}>
        <div style={styles.logo}>CareerLens</div>

        <h1 style={styles.heading}>
          <span style={styles.headingLight}>Create </span>
          <span style={styles.headingDark}>Account</span>
        </h1>
        <p style={styles.sub}>Start your journey to your dream job</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSignup}>
          <label style={styles.label} htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label} htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label} htmlFor="password">Password</label>
          <div style={styles.pwWrap}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              style={{ ...styles.input, paddingRight: "44px", marginBottom: 0 }}
            />
            <span style={styles.eye} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <label style={{ ...styles.label, marginTop: "1.2rem" }} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div style={styles.pwWrap}>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ ...styles.input, paddingRight: "44px", marginBottom: 0 }}
            />
            <span style={styles.eye} onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit" style={{ ...styles.btn, marginTop: "1.8rem" }} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <a onClick={() => navigate("/login")} style={styles.loginLink}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff5f5 0%, #fff0ee 50%, #fdf6f0 100%)",
    fontFamily: "'DM Sans', sans-serif",
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed",
    width: "400px", height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(185,28,28,0.15) 0%, transparent 70%)",
    top: "-100px", left: "-100px",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed",
    width: "350px", height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
    bottom: "-80px", right: "-80px",
    pointerEvents: "none",
  },
  blob3: {
    position: "fixed",
    width: "250px", height: "250px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(254,205,211,0.4) 0%, transparent 70%)",
    top: "40%", right: "10%",
    pointerEvents: "none",
  },
  card: {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.9)",
    borderRadius: "28px",
    padding: "3rem 2.8rem 2.5rem",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 8px 40px rgba(185,28,28,0.1), 0 2px 8px rgba(0,0,0,0.04)",
    position: "relative",
    zIndex: 1,
  },
  logo: {
    fontWeight: 700, fontSize: "15px",
    letterSpacing: "3px", color: "#b91c1c",
    textAlign: "center", marginBottom: "1.5rem",
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "32px", fontWeight: 700,
    textAlign: "center", margin: "0 0 0.4rem",
    lineHeight: 1.15,
  },
  headingLight: { color: "#fca5a5", fontStyle: "italic" },
  headingDark: { color: "#1c0a0a" },
  sub: {
    textAlign: "center", color: "#9f6060",
    fontSize: "14px", margin: "0 0 1.8rem", fontWeight: 400,
  },
  errorBox: {
    background: "rgba(185,28,28,0.08)",
    border: "1px solid rgba(185,28,28,0.2)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#b91c1c",
    marginBottom: "1rem",
    textAlign: "center",
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
    color: "#1c0a0a",
    background: "rgba(255,255,255,0.8)",
    outline: "none", marginBottom: "1.2rem",
  },
  pwWrap: { position: "relative", marginBottom: "0rem" },
  eye: {
    position: "absolute", right: "14px",
    top: "50%", transform: "translateY(-50%)",
    cursor: "pointer", fontSize: "16px",
    userSelect: "none", lineHeight: 1,
  },
  btn: {
    width: "100%", padding: "15px", border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #b91c1c 0%, #e11d48 50%, #fb7185 100%)",
    color: "white", fontSize: "16px", fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
    letterSpacing: "0.4px",
    boxShadow: "0 4px 20px rgba(185,28,28,0.35)",
  },
  loginText: {
    textAlign: "center", marginTop: "1.6rem",
    fontSize: "13.5px", color: "#9f6060",
  },
  loginLink: {
    color: "#b91c1c", textDecoration: "none",
    fontWeight: 600, cursor: "pointer",
  },
};

export default Signup;