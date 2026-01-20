import React, { useState } from "react";

const isStrongPassword = (password) => {
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasCapital && hasNumber && hasSpecial;
};

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {

    
    if (isSignup && !isStrongPassword(password)) {
      alert(
        "Password must contain at least one capital letter, one number, and one special character"
      );
      return; // stop here, do not call backend
    }

    const url = isSignup
      ? "http://127.0.0.1:8000/api/signup/"
      : "http://127.0.0.1:8000/api/login/";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (!isSignup) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        window.location.href = "/dashboard";
      } else {
        alert("Signup successful! Please login.");
        setIsSignup(false);
      }
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have an account? Login" : "New user? Signup"}
      </p>
    </div>
  );
}

export default Login;