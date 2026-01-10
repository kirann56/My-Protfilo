import "./Login.css";
import { useState } from "react";
import api from "./Api";
import { setToken, setUserId, setUsername } from "./auth";

function Login() {
  const [username, setUsernameState] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const res = await api.post("/auth", {
        username,
        email,
      });

      // console.log("=== LOGIN RESPONSE ===");
      // console.log("Full response:", res.data);
      // console.log("user_id:", res.data.user_id);
      // console.log("user_id type:", typeof res.data.user_id);
      // console.log("username:", res.data.username);
      // console.log("token:", res.data.access_token);

      const userId = String(res.data.user_id);
      const token = res.data.access_token;
      const userName = res.data.username || username;

      // console.log("Saving to localStorage...");
      // console.log("Saving user_id:", userId);
      // console.log("Saving username:", userName);

      setToken(token);
      setUserId(userId);
      setUsername(userName);

      // console.log("=== VERIFICATION ===");
      const savedUserId = localStorage.getItem("user_id");
      const savedUsername = localStorage.getItem("username");
      const savedToken = localStorage.getItem("token");

      // console.log(" Saved user_id:", savedUserId);
      // console.log("Saved username:", savedUsername);
      // console.log(" Saved token:", savedToken ? "exists" : "MISSING!");

      if (!savedUserId) {
        console.error("USER_ID NOT SAVED! Check setUserId() function!");
        alert("Error: Failed to save user data. Please try again.");
        return;
      }

      // Clear inputs
      setUsernameState("");
      setEmail("");

      console.log(" Login successful! Redirecting...");

      // Small delay to ensure localStorage is saved
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error) {
      console.error(" Login failed:", error);
      console.error("Error details:", error.response?.data);
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2>Please! Fill This Info to Continue</h2>

        <div className="note-banner">
          <p>
            <strong>Note!</strong> This information will not be shared with anyone.
            This is only for identity purposes.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsernameState(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="continue-btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;