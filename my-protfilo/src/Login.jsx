import "./Login.css";
import { useState } from "react";
import api from "./Api";
import { setToken, setUserId } from "./auth";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth", {
        username,
        email,
      });

      setToken(res.data.access_token);
      setUserId(res.data.user_id);

      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2>Please! Fill This Info to Continue</h2>

        <div className="note-banner">
          <p>
            <strong>Note!</strong> This information will not be shared to Anyone This is Only for Indentity Purpose.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
